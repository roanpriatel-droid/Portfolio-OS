export default function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`gradient-text${className ? ' ' + className : ''}`}>{children}</span>;
}
