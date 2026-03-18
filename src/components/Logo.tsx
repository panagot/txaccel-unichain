export function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Block base */}
      <path
        d="M8 14h10v12H8V14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Tx arrow / accelerator */}
      <path
        d="M22 16l6 4-6 4M26 18h4"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Bounty dot */}
      <circle cx="28" cy="12" r="2.5" fill="#f59e0b" />
    </svg>
  )
}
