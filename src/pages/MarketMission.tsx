import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Challenge, Friend, completed, freshState, friends, items, loadState, saveState, situations, toggleItem, total, validBasket, validMatches } from '@/features/market/model';
import village from '@/assets/village-map.jpg';
import './MarketMission.css';
const stalls = [
 { id: 'basket' as const, icon: '🎒', title: 'A mochila das escolhas', description: 'Prepare uma oficina de desenho para quatro amigos.' },
 { id: 'repair' as const, icon: '🛠️', title: 'Oficina da nova chance', description: 'Descubra como cuidar de três objetos.' },
 { id: 'trade' as const, icon: '🤝', title: 'A roda das trocas', description: 'Combine ofertas com os pedidos dos amigos.' },
];
const lessons = {
 basket: 'Uma necessidade depende da situação. Antes de escolher, vale perguntar: o que já temos e o que falta?',
 repair: 'Antes de substituir: observar, cuidar e pedir ajuda. Às vezes consertamos; às vezes precisamos de outro objeto.',
 trade: 'Compartilhar e trocar podem aproveitar melhor o que já existe, sempre com cuidado e consentimento.',
};
export const MarketMission = () => {
 const navigate = useNavigate();
 const [state, setState] = useState(loadState);
 const [active, setActive] = useState<Challenge | 'reward' | null>(null);
 const [feedback, setFeedback] = useState('');
 const [saved, setSaved] = useState(true);
 const [offer, setOffer] = useState<Friend | null>(null);
 const heading = useRef<HTMLHeadingElement>(null);
 const count = completed(state);
 const done = { basket: state.basketDone, repair: state.solved.length === 3, trade: state.tradeDone };
 const [questionIndex, setQuestionIndex] = useState<number | undefined>(() => [0, 1, 2].find(id => !state.solved.includes(id)));
 const question = questionIndex === undefined ? null : situations[questionIndex];
 useEffect(() => { setSaved(saveState(state)); }, [state]);
 useEffect(() => { heading.current?.focus(); }, [active]);
 const open = (id: Challenge | 'reward' | null) => {
  setFeedback(''); setOffer(null); setActive(id); if (id === 'repair') setQuestionIndex([0, 1, 2].find(i => !state.solved.includes(i)));
  if (id && id !== 'reward') setState(s => ({ ...s, started: [...new Set([...s.started, id])] }));
 };
 return <main className="market min-h-screen bg-gradient-sky" style={{ backgroundImage: `linear-gradient(hsl(48 100% 97% / .9), hsl(48 100% 97% / .96)), url(${village})`, backgroundSize: 'cover' }}>
 <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
 <nav className="flex flex-wrap gap-3" aria-label="Navegação da Feira"><Button variant="outline" onClick={() => navigate('/map')}>← Voltar ao mapa</Button>{active && <Button variant="outline" onClick={() => open(null)}>🎪 Voltar à Feira</Button>}</nav>
 <header className="market-banner text-center p-6 rounded-3xl"><p className="font-heading text-lg">Little Giants</p><h1 ref={heading} tabIndex={-1} className="text-3xl md:text-5xl font-heading font-bold">{active === 'reward' ? 'Boas escolhas, grandes mudanças!' : active ? stalls.find(s => s.id === active)?.title : 'Feira das Boas Escolhas'}</h1><p className="mt-3 text-lg">Cada escolha pode cuidar da nossa vila.</p></header>
 <div className="market-panel" role="status">🌟 {count} de 3 desafios concluídos<progress className="w-full mt-2" aria-label="Desafios concluídos" value={count} max={3} /></div>
 {!saved && <p role="alert" className="market-panel">Não foi possível guardar o progresso neste navegador. Você pode continuar brincando nesta página.</p>}
 {!active && <>
 <details className="market-panel" open><summary>Vamos preparar a feira? Leia a história</summary><p><strong>Lia:</strong> “A feira de Esperançópolis está chegando! Vamos preparar um cantinho para brincar, criar e compartilhar?”</p><p><strong>Bia:</strong> “Temos algumas moedas da vila e muitas ideias. Vamos escolher juntos!”</p><p><strong>Caio:</strong> “E antes de comprar, podemos descobrir o que já temos e o que pode ganhar uma nova chance!”</p></details>
 <p className="text-center font-bold">Escolha qualquer barraca para começar ou continuar!</p>
 <div className="grid md:grid-cols-3 gap-5">{stalls.map(s => <button key={s.id} className="market-stall text-left" onClick={() => open(s.id)}><span className="text-5xl block mb-4" aria-hidden="true">{s.icon}</span><h2 className="text-2xl font-heading font-bold">{s.title}</h2><p className="my-3">{s.description}</p><strong>{done[s.id] ? '✓ Concluído — rever' : state.started.includes(s.id) ? '◷ Em andamento — continuar' : '☆ Disponível — começar'}</strong></button>)}</div>
 {count === 3 && <Button variant="play" className="w-full" onClick={() => open('reward')}>🏅 Ver meu selo</Button>}</>}
 {active && active !== 'reward' && <section className="market-panel space-y-5">
 <details open><summary>Como brincar — reler instruções</summary><p>{active === 'basket' ? 'Toque nos itens para colocar ou tirar da mochila. Confira o que falta e confirme sua cesta.' : active === 'repair' ? 'Observe o objeto e escolha o que fazer. Você pode tentar novamente.' : 'Toque em uma oferta e depois no amigo que procura esse objeto. Confira as combinações antes de confirmar.'}</p></details>
 {active === 'basket' && <>
 <p>Vamos preparar uma oficina para quatro amigos. A vila já tem papel reutilizável limpo e uma caixa de lápis de cor. Temos 10 moedas para completar os materiais.</p>
 <div className="market-note"><p><strong>Já temos:</strong> 📄 papel e ✏️ lápis de cor.</p><p><strong>Falta:</strong> uma borracha para compartilhar e uma caixa para guardar os materiais.</p><p>Saldo inicial: <strong>10 moedas fictícias</strong>.</p><p role="status" aria-live="polite">Total: {total(state.basket)} moedas · Restam: {10 - total(state.basket)} moedas</p></div>
 <div className="grid sm:grid-cols-2 gap-3">{items.map(item => <button key={item.id} disabled={done.basket} aria-pressed={state.basket.includes(item.id)} className="market-choice text-left" onClick={() => { const basket = toggleItem(state.basket, item.id); setFeedback(basket === state.basket ? 'Esse item passa das 10 moedas. Você pode tirar outro item e escolher de novo. Sua mochila continua aqui!' : ''); setState(s => ({ ...s, basket })); }}><span aria-hidden="true">{item.icon} </span>{item.name} · {item.price} moedas<strong>{state.basket.includes(item.id) ? '✓ Na mochila' : '+ Adicionar'}</strong></button>)}</div>
 {!done.basket && <Button onClick={() => { if (!validBasket(state.basket)) return setFeedback('Vamos conferir a mochila? Ainda precisamos de uma borracha e uma caixa para a oficina. Os lápis já estão disponíveis; não precisamos de outra caixa nesta oficina.'); setState(s => ({ ...s, basketDone: true })); }}>Confirmar minha cesta</Button>}
 {done.basket && <p className="market-note">{state.basket.includes('stickers') ? 'Os materiais necessários estão garantidos, e os adesivos couberam no plano. Podemos querer coisas divertidas e escolher com cuidado!' : 'Oficina preparada! Você escolheu o que faltava e ainda guardou moedas para outra ocasião.'}</p>}
 </>}
 {active === 'repair' && <><p>Situações resolvidas: {state.solved.length} de 3</p>{question && <section className="space-y-4"><h2 className="text-2xl font-heading">{question.icon} {question.title}</h2><p>{question.context}</p>{question.options.map((option, index) => <button key={option} disabled={state.solved.includes(questionIndex!)} className="market-choice w-full text-left" onClick={() => { if (index !== question.correct) return setFeedback(question.retry + ' Tente novamente.'); setFeedback(question.feedback); setState(s => ({ ...s, solved: [...new Set([...s.solved, questionIndex!])] })); }}>{option}</button>)}</section>}{question && state.solved.includes(questionIndex!) && !done.repair && <Button onClick={() => { setQuestionIndex([0, 1, 2].find(i => !state.solved.includes(i))); setFeedback(''); }}>Próximo objeto →</Button>}{done.repair && situations.map(s => <p className="market-note" key={s.title}>✓ {s.icon} {s.feedback}</p>)}</>}
 {active === 'trade' && <>
 <p>Lia, Bia e Caio separaram voluntariamente estes objetos para trocar. Os três já concordaram com as combinações que atendem aos seus pedidos. Tudo bem preferir guardar um objeto de que gostamos!</p>
 <h2 className="text-xl font-heading">1. Escolha uma oferta</h2><div className="grid sm:grid-cols-3 gap-3">{friends.map(f => <button className="market-choice text-left" key={f.name} aria-pressed={offer === f.name} disabled={done.trade} onClick={() => { setOffer(f.name); setFeedback('Agora escolha quem procura esse objeto.'); }}>{f.icon} {f.name} oferece {f.offer}{offer === f.name && ' ✓ Selecionado'}</button>)}</div>
 <h2 className="text-xl font-heading">2. Quem procura esse objeto?</h2><div className="grid sm:grid-cols-3 gap-3">{friends.map(f => <button key={f.name} className="market-choice text-left" disabled={done.trade} onClick={() => { if (!offer) return setFeedback('Primeiro, escolha uma oferta.'); if (offer !== f.from) return setFeedback('Vamos olhar o pedido desse amigo? Ele está procurando outro objeto.'); setState(s => ({ ...s, matches: { ...s.matches, [f.name]: offer } })); setOffer(null); setFeedback('Combinação pronta!'); }}>{f.name} procura {friends.find(p => p.name === f.from)?.icon} {f.wants}<strong>{state.matches[f.name] ? `✓ Recebe de ${state.matches[f.name]}` : 'Aguardando combinação'}</strong></button>)}</div>
 {validMatches(state.matches) && <div className="market-note space-y-3"><h2 className="text-xl font-heading">Vamos conferir as trocas?</h2>{friends.map(f => <p key={f.name}>{f.wants} de {f.from} → {f.name}</p>)}<p>Os três amigos concordaram com estas trocas.</p>{!done.trade && <Button className="whitespace-normal h-auto" onClick={() => setState(s => ({ ...s, tradeDone: true }))}>Todos concordam. Vamos realizar as trocas!</Button>}</div>}
 {done.trade && <p>Cada objeto encontrou uma nova aventura. Os amigos conseguiram o que procuravam sem precisar comprar algo novo!</p>}</>}
 <p role="status" aria-live="polite" aria-atomic="true" className={feedback ? 'market-note' : ''}>{feedback}</p>
 {done[active] && <div className="space-y-4"><p className="market-note"><strong>✓ Desafio concluído!</strong> {lessons[active]}</p><Button onClick={() => open(null)}>Escolher outra barraca</Button>{count === 3 && <Button variant="play" onClick={() => open('reward')}>🏅 Ver meu selo</Button>}</div>}
 </section>}
 {active === 'reward' && count === 3 && <section className="market-panel text-center space-y-6"><div className="text-7xl" aria-hidden="true">🏅</div><h2 className="text-3xl font-heading font-bold">Selo Amigo das Boas Escolhas</h2><p>Você ajudou Esperançópolis a preparar uma feira cheia de cuidado e cooperação!</p><ul className="space-y-3"><li>🎒 Planejar antes de escolher.</li><li>🛠️ Cuidar dos objetos.</li><li>🤝 Trocar quando todos concordam.</li></ul><Button variant="play" onClick={() => open(null)}>Explorar novamente a Feira</Button></section>}
 <footer className="market-panel text-center"><AlertDialog><AlertDialogTrigger asChild><Button variant="outline">Recomeçar esta fase</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Recomeçar a Feira?</AlertDialogTitle><AlertDialogDescription>Os três desafios da Feira voltarão ao começo. Seu personagem e as outras fases continuam como estão.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Continuar minha aventura</AlertDialogCancel><AlertDialogAction onClick={() => { setState(freshState()); open(null); }}>Sim, recomeçar a Feira</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></footer>
 </div></main>;
};

