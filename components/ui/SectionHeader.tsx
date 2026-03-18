interface Props { num: string; title: string }

export default function SectionHeader({ num, title }: Props) {
  return (
    <div className="flex items-center gap-6 mb-16 flex-wrap">
      <span className="text-[0.7rem] tracking-[0.1em] text-accent font-mono">{num} —</span>
      <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-accent to-transparent min-w-[40px]" />
    </div>
  )
}
