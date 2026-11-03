import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const source = readFileSync(new URL('../src/features/market/model.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const m = await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));
test('all 32 baskets respect budget and require both essentials', () => {
 for (let mask = 0; mask < 32; mask++) {
  const basket = m.items.filter((_, i) => mask & (1 << i)).map(i => i.id);
  assert.equal(m.validBasket(basket), basket.includes('eraser') && basket.includes('box') && m.total(basket) <= 10);
  let selected = [];
  for (const id of basket) { selected = m.toggleItem(selected, id); assert.ok(m.total(selected) <= 10); }
 }
 assert.equal(m.validBasket(['eraser', 'box']), true);
 assert.equal(m.validBasket(['eraser', 'box', 'stickers']), true);
 const selected = ['box', 'case'];
 assert.equal(m.toggleItem(selected, 'eraser'), selected);
 assert.deepEqual(m.toggleItem(['eraser'], 'eraser'), []);
});
test('progress round-trips, counts each challenge once, and requires confirmed trade', () => {
 const s = { ...m.freshState(), basket: ['eraser', 'box'], basketDone: true, solved: [0, 1, 2, 2], matches: { Lia: 'Bia', Bia: 'Caio', Caio: 'Lia' } };
 const loaded = m.parseState(JSON.stringify(s));
 assert.equal(m.completed(loaded), 2);
 assert.equal(m.validMatches(loaded.matches), true);
 loaded.tradeDone = true;
 assert.equal(m.completed(m.parseState(JSON.stringify(loaded))), 3);
 assert.equal(m.validMatches({ Lia: 'Caio' }), false);
});
test('invalid, missing, old and inconsistent storage is safe', () => {
 for (const raw of [null, '{', 'null', '{}', '{"version":0}']) assert.deepEqual(m.parseState(raw), m.freshState());
 const corrupt = { ...m.freshState(), basket: ['case', 'box', 'eraser', 'eraser'], basketDone: true, solved: [0, 0, 9], tradeDone: true };
 const loaded = m.parseState(JSON.stringify(corrupt));
 assert.equal(loaded.basketDone, false); assert.equal(loaded.tradeDone, false); assert.deepEqual(loaded.solved, [0]);
});
test('saving and restart preserve other phase and character data; unavailable storage is tolerated', () => {
 const store = new Map([['selectedCharacter', 'caio'], ['garden', 'untouched']]);
 globalThis.localStorage = { getItem: key => store.get(key) ?? null, setItem: (key, value) => store.set(key, value) };
 const s = { ...m.freshState(), started: ['basket'], basket: ['eraser'] };
 assert.equal(m.saveState(s), true); assert.deepEqual(m.loadState(), s);
 m.saveState(m.freshState()); assert.equal(store.get('garden'), 'untouched'); assert.equal(store.get('selectedCharacter'), 'caio');
 globalThis.localStorage = { getItem() { throw Error(); }, setItem() { throw Error(); } };
 assert.deepEqual(m.loadState(), m.freshState()); assert.equal(m.saveState(s), false);
});

