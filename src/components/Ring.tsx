// The track ring from Sam's loop station. Lit = on / playing / upcoming. Dim = off / past.
// Decorative unless given a label.
export function Ring({ lit = false, size = 'md', label, className = '' }: { lit?: boolean; size?: 'sm' | 'md' | 'lg'; label?: string; className?: string }) {
  const s = { sm: 'size-4', md: 'size-6', lg: 'size-12' }[size];
  return (
    <span
      className={`ring-knob ${s} ${className}`}
      data-lit={lit}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
