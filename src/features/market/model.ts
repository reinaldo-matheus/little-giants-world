export const STORAGE_KEY = 'little-giants:market:v1';
export const items = [
  { id: 'eraser', icon: '🧽', name: 'Borracha', price: 2 },
  { id: 'box', icon: '📦', name: 'Caixa resistente para os materiais', price: 4 },
  { id: 'stickers', icon: '✨', name: 'Adesivos decorativos', price: 3 },
  { id: 'case', icon: '👝', name: 'Estojo brilhante individual', price: 6 },
  { id: 'pencils', icon: '✏️', name: 'Nova caixa de lápis de cor', price: 5 },
] as const;
export type ItemId = typeof items[number]['id'];
export const situations = [
  { icon: '📖', title: 'Livro com capa solta', context: 'As páginas estão boas, mas a capa do livro se soltou.', options: ['Pedir ajuda a um adulto para reparar a capa', 'Jogar o livro fora imediatamente', 'Comprar outro sem verificar se este pode ser reparado'], correct: 0, feedback: 'Com a ajuda de um adulto, a capa pode ser reparada e a história continua!', retry: 'As páginas ainda estão boas. Vamos verificar com um adulto se a capa pode ser reparada?' },
  { icon: '🧸', title: 'Brinquedo em bom estado', context: 'Bia tem um brinquedo que não usa mais e gostaria de trocá-lo. Caio também tem um brinquedo disponível.', options: ['Pegar o brinquedo de Caio sem perguntar', 'Dizer que Bia é obrigada a doar o brinquedo', 'Conversar e trocar somente se os dois concordarem'], correct: 2, feedback: 'Trocar pode ser divertido quando todos concordam. E tudo bem se alguém preferir ficar com seu brinquedo!', retry: 'Cada amigo escolhe o que fazer com seu brinquedo. Ninguém precisa doar ou trocar, e precisamos perguntar antes de pegar.' },
  { icon: '🍶', title: 'Objeto com risco', context: 'Uma garrafa está rachada e tem uma borda que pode machucar.', options: ['Continuar usando com cuidado', 'Parar de usar e pedir ajuda a um adulto para avaliar o destino e uma substituição segura', 'Entregar a garrafa danificada a outra criança'], correct: 1, feedback: 'Segurança vem primeiro! Reutilizar é bom quando o objeto está em condições seguras.', retry: 'Uma borda rachada pode machucar você ou outro amigo. Vamos parar de usar e pedir ajuda a um adulto?' },
] as const;
export const friends = [
  { name: 'Lia', icon: '📖', offer: 'livro de histórias', wants: 'quebra-cabeça', from: 'Bia' },
  { name: 'Bia', icon: '🧩', offer: 'quebra-cabeça', wants: 'bola', from: 'Caio' },
  { name: 'Caio', icon: '⚽', offer: 'bola', wants: 'livro de histórias', from: 'Lia' },
] as const;
export type Friend = typeof friends[number]['name'];
export type Challenge = 'basket' | 'repair' | 'trade';
export interface MarketState {
  version: 1; basket: ItemId[]; basketDone: boolean; solved: number[];
  matches: Partial<Record<Friend, Friend>>; tradeDone: boolean; started: Challenge[];
}
export const freshState = (): MarketState => ({ version: 1, basket: [], basketDone: false, solved: [], matches: {}, tradeDone: false, started: [] });
export const total = (basket: readonly ItemId[]) => items.reduce((sum, item) => sum + (basket.includes(item.id) ? item.price : 0), 0);
export const validBasket = (basket: readonly ItemId[]) => basket.includes('eraser') && basket.includes('box') && total(basket) <= 10;
export function toggleItem(basket: ItemId[], id: ItemId): ItemId[] {
  if (basket.includes(id)) return basket.filter(value => value !== id);
  return total([...basket, id]) <= 10 ? [...basket, id] : basket;
}
export const validMatches = (matches: MarketState['matches']) => friends.every(friend => matches[friend.name] === friend.from);
export const completed = (state: MarketState) => [state.basketDone, state.solved.length === 3, state.tradeDone].filter(Boolean).length;
export function parseState(raw: string | null): MarketState {
  try {
    const value = JSON.parse(raw || 'null');
    if (!value || value.version !== 1 || !Array.isArray(value.basket) || !Array.isArray(value.solved) || !Array.isArray(value.started)) return freshState();
    const state = freshState();
    state.basket = items.filter(item => value.basket.includes(item.id)).map(item => item.id);
    if (total(state.basket) > 10) state.basket = [];
    state.basketDone = value.basketDone === true && validBasket(state.basket);
    state.solved = [0, 1, 2].filter(id => value.solved.includes(id));
    state.started = (['basket', 'repair', 'trade'] as Challenge[]).filter(id => value.started.includes(id));
    for (const friend of friends) if (value.matches?.[friend.name] === friend.from) state.matches[friend.name] = friend.from;
    state.tradeDone = value.tradeDone === true && validMatches(state.matches);
    return state;
  } catch { return freshState(); }
}
export function loadState(): MarketState {
  try { return parseState(localStorage.getItem(STORAGE_KEY)); } catch { return freshState(); }
}
export function saveState(state: MarketState): boolean {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; } catch { return false; }
}
