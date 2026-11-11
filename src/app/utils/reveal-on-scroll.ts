export function revealOnScroll(root: ParentNode): void {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
  if (nodes.length === 0) {
    return;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    for (const node of nodes) {
      node.classList.add('is-visible');
    }
    return;
  }

  const pending = new Set(nodes);

  const reveal = (node: HTMLElement) => {
    if (!pending.has(node)) {
      return;
    }

    pending.delete(node);
    requestAnimationFrame(() => {
      node.classList.add('is-visible');
    });
  };

  const revealInView = () => {
    const viewBottom = window.innerHeight;
    for (const node of pending) {
      const rect = node.getBoundingClientRect();
      if (rect.top < viewBottom && rect.bottom > 0) {
        reveal(node);
      }
    }

    if (pending.size === 0) {
      window.removeEventListener('scroll', revealInView);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }

        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }

      if (pending.size === 0) {
        observer.disconnect();
        window.removeEventListener('scroll', revealInView);
      }
    },
    { threshold: 0 },
  );

  for (const node of nodes) {
    observer.observe(node);
  }

  revealInView();
  window.addEventListener('scroll', revealInView, { passive: true });
}
