import { memo } from 'react';

// Memoized for performance optimization
function ChatBubble({ message, type }) {
  const isUser = type === 'user';
  
  // Support markdown-style bold text
  const formatMessage = (text) => {
    return text.split('**').map((part, index) => 
      index % 2 === 1 ? <strong key={index}>{part}</strong> : part
    );
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 fade-in`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-black text-white rounded-br-sm'
            : 'bg-white text-black rounded-bl-sm border border-gray-200'
        }`}
      >
        <p className="text-sm whitespace-pre-line">{formatMessage(message)}</p>
      </div>
    </div>
  );
}

export default memo(ChatBubble);
