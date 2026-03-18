import { useState, useRef, useEffect } from 'react'

type TooltipProps = {
  content: string
  children: React.ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

export function Tooltip({ content, children, side = 'top', className = '' }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <span
      ref={ref}
      className={`inline-flex items-center ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-normal text-surface-950 bg-zinc-200 border border-border rounded shadow-lg max-w-[220px] ${side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'}`}
          style={{ left: ref.current ? ref.current.offsetLeft : 0 }}
        >
          {content}
        </span>
      )}
    </span>
  )
}

export function InfoIcon({ content, className = '' }: { content: string; className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label="More info"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="w-4 h-4 rounded-full border border-zinc-500 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300 flex items-center justify-center text-[10px] font-mono"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-full mt-1.5 z-50 px-2.5 py-1.5 text-xs font-normal text-surface-950 bg-zinc-200 border border-border rounded shadow-lg max-w-[240px] whitespace-normal"
        >
          {content}
        </span>
      )}
    </span>
  )
}
