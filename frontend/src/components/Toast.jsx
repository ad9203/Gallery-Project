import { Info } from 'lucide-react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-gray-900/95 border border-gray-700/80 text-white rounded-2xl shadow-2xl backdrop-blur-md animate-fade-in text-xs font-medium">
      <Info size={16} className="text-amber-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-white text-sm"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
