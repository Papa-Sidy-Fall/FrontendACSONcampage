import { useEffect, useRef, useState } from 'react';
import faq from '../content/faq.json';
import { isGreeting, searchFaq } from '../lib/faqSearch';
import useDialog from '../hooks/useDialog';

const categories = [...new Set(faq.map((item) => item.categorie))];
const welcome = () => ({ role: 'bot', text: 'Bonjour ! Je vous aide à découvrir le candidat et le programme ACSON 2026–2030. Posez votre question ou choisissez un thème.', categories: true });
const programme = '/documents/programme-acson-2026-2030.pdf';
const responseDelay = 800;

function ChatIcon() {
  return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M26 14.5c0 6-4.5 10-10.5 10H10L5 28v-8a10 10 0 0 1-2-6C3 8 7.8 4 14.5 4S26 8.5 26 14.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="10" cy="14" r="1.5" fill="currentColor" /><circle cx="15" cy="14" r="1.5" fill="currentColor" /><circle cx="20" cy="14" r="1.5" fill="currentColor" /></svg>;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([welcome()]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const replyTimerRef = useRef(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const dialogRef = useDialog(open, () => setOpen(false), launcherRef);

  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [open, messages, typing]);

  useEffect(() => () => window.clearTimeout(replyTimerRef.current), []);

  function append(...next) { setMessages((current) => [...current, ...next].slice(-60)); }
  function replyAfterPause(question, reply) {
    // Guard the timer as well as the controls against rapid duplicate interactions.
    if (replyTimerRef.current !== null) return;
    append({ role: 'user', text: question });
    setTyping(true);
    replyTimerRef.current = window.setTimeout(() => {
      replyTimerRef.current = null;
      append({ role: 'bot', ...reply });
      setTyping(false);
    }, responseDelay);
  }
  function cancelReply() {
    window.clearTimeout(replyTimerRef.current);
    replyTimerRef.current = null;
    setTyping(false);
  }
  function chooseQuestion(item) {
    replyAfterPause(item.question, {
      text: item.reponse, download: item.id === 67,
      questions: faq.filter((other) => other.categorie === item.categorie && other.id !== item.id).slice(0, 3),
    });
  }
  function chooseCategory(category) {
    replyAfterPause(category, {
      text: 'Choisissez la question qui vous intéresse :',
      questions: faq.filter((item) => item.categorie === category),
    });
  }
  function send(event) {
    event.preventDefault();
    const question = input.trim();
    if (!question || replyTimerRef.current !== null) return;
    setInput('');
    if (isGreeting(question)) {
      replyAfterPause(question, welcome());
    } else {
      const result = searchFaq(question, faq);
      const reply = result.type === 'answer'
        ? { text: result.items[0].reponse, download: result.items[0].id === 67 }
        : result.type === 'choices'
          ? { text: 'Voici les questions qui se rapprochent de votre demande. Laquelle souhaitez-vous consulter ?', questions: result.items }
          : { text: 'Je n’ai pas de réponse précise à cette question. Je peux vous renseigner sur le candidat et ses engagements. Pouvez-vous reformuler ou choisir un thème ci-dessous ?', categories: true };
      replyAfterPause(question, reply);
    }
    inputRef.current?.focus();
  }

  return (
    <>
      <button ref={launcherRef} type="button" hidden={open} className="chat-launcher" onClick={() => setOpen(true)} aria-label="Poser vos questions — ouvrir le chatbot ACSON" aria-haspopup="dialog">
        <span className="chat-invite"><span className="wave-hand" aria-hidden="true">👋</span><span>Posez vos questions</span></span>
        <span className="chat-orb"><ChatIcon /><span className="chat-dot" /></span>
      </button>
      {open && <div className="chat-backdrop" onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section ref={dialogRef} className="chat-panel dialog-enter" role="dialog" aria-modal="true" aria-labelledby="chat-title">
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true"><ChatIcon /></span>
            <div className="chat-heading"><h2 id="chat-title">Votre guide ACSON</h2><p>Découvrons le programme ensemble</p></div>
            <button type="button" className="chat-close" aria-label="Fermer le chatbot" onClick={() => setOpen(false)}>✕</button>
          </header>
          <nav className="chat-tools" aria-label="Actions du chatbot">
            <button type="button" onClick={() => { cancelReply(); append(welcome()); }}>Tous les thèmes</button>
            <a href={programme} download>Programme complet (PDF) ↓</a>
            <button type="button" aria-label="Effacer la conversation et recommencer" onClick={() => { cancelReply(); setMessages([welcome()]); setInput(''); }}>Recommencer</button>
          </nav>
          <div ref={scrollRef} className="chat-messages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" tabIndex={0}>
            {messages.map((message, index) => <div key={index} className={`chat-message ${message.role === 'user' ? 'chat-message-user' : 'chat-message-bot'}`}>
              <span className="sr-only">{message.role === 'user' ? 'Vous : ' : 'Guide ACSON : '}</span>
              <p>{message.text}</p>
              {message.download && <a href={programme} download className="chat-download">Télécharger le programme complet (PDF) ↓</a>}
              {message.categories && <div className="chat-categories">{categories.map((category) => <button type="button" key={category} disabled={typing} onClick={() => chooseCategory(category)}>{category}<span aria-hidden="true">↗</span></button>)}</div>}
              {Boolean(message.questions?.length) && <div className="chat-questions">{message.questions.map((item) => <button type="button" key={item.id} disabled={typing} onClick={() => chooseQuestion(item)}>{item.question}<span aria-hidden="true">→</span></button>)}</div>}
            </div>)}
            {typing && <div className="chat-message chat-message-bot chat-typing" role="status">
              <span className="sr-only">Le guide prépare sa réponse…</span>
              <span className="chat-typing-dots" aria-hidden="true"><span /><span /><span /></span>
            </div>}
          </div>
          <form className="chat-composer" onSubmit={send}>
            <label htmlFor="chat-question" className="sr-only">Votre question</label>
            <input ref={inputRef} id="chat-question" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Écrivez votre question…" autoComplete="off" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Envoyer la question"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none"><path d="m5 12 7-7 7 7M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          </form>
          <p className="chat-footnote">Candidature de Mame Youssou Diagne · ACSON 2026–2030</p>
        </section>
      </div>}
    </>
  );
}
