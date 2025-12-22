export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg border border-gray-800 bg-gray-900 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="p-4 border-b border-gray-800">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
