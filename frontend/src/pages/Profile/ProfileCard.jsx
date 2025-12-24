export default function ProfileCard({ 
  children, 
  className = "", 
  title, 
  action,
  onClickAction,
  padding = "p-6"
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {action && (
            <button
              onClick={onClickAction}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {action}
            </button>
          )}
        </div>
      )}
      <div className={padding}>
        {children}
      </div>
    </div>
  );
}