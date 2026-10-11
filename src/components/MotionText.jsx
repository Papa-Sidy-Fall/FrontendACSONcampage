// Preserve the complete original text, including whitespace, while animating words.
export default function MotionText({ text }) {
  return text.split(/(\s+)/).map((part, index) => /^\s+$/.test(part)
    ? part
    : <span key={index} className="motion-word" style={{ '--word-delay': `${Math.min(index / 2, 16) * 45}ms` }}>{part}</span>);
}
