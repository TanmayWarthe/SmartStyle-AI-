import { useEffect } from 'react';

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-black'
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] animate-slideDown">
      <div className={`${bgColors[type]} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 min-w-[250px] justify-center`}>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
