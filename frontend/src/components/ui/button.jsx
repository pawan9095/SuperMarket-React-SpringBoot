export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
