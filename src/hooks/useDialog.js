import { useEffect, useRef } from 'react';

// Keyboard navigation and focus restoration shared by the two dialogs.
export default function useDialog(open, onClose, returnFocusRef) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousFocus = returnFocusRef?.current || document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const siblings = [];
    // Hide background controls from both keyboard and assistive technology.
    for (let node = ref.current; node && node !== document.body; node = node.parentElement) {
      for (const sibling of node.parentElement?.children || []) {
        if (sibling !== node && sibling instanceof HTMLElement) {
          siblings.push([sibling, sibling.inert]);
          sibling.inert = true;
        }
      }
    }
    const focusable = () => [...(ref.current?.querySelectorAll(
      'button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]',
    ) || [])].filter((el) => el.getClientRects().length);
    focusable()[0]?.focus();
    function onKeyDown(event) {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const elements = focusable();
      const first = elements[0];
      const last = elements.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && (document.activeElement === first || !ref.current?.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !ref.current?.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      siblings.forEach(([node, wasInert]) => { node.inert = wasInert; });
      document.removeEventListener('keydown', onKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [open, returnFocusRef]);
  return ref;
}
