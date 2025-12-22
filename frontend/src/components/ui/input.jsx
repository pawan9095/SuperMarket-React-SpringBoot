export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-white ${className}`}
      {...props}
    />
  );
}
