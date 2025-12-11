export default function ChatBubble({ message, type }) {
  const isUser = type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 fade-in`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-black text-white rounded-br-sm'
            : 'bg-white text-black rounded-bl-sm border border-gray-200'
        }`}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
