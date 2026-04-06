import { useRef, useEffect } from "react";
import MessageItem from "./MessageItem";
import { Pin } from "lucide-react";

export default function ChatWindow({ messages, deletedForMe, myMessages, onDeleteMe, onDeleteAll, onPin }) {
  // 1. Create a reference to the bottom of the chat
  const messagesEndRef = useRef(null);

  const visibleMessages = messages.filter(m => !deletedForMe.includes(m.id));
  const pinnedMessages = visibleMessages.filter(m => m.pinned);
  const regularMessages = visibleMessages.filter(m => !m.pinned);

  // 2. Function to scroll to the bottom smoothly
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 3. Trigger the scroll whenever the 'messages' array updates
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 scroll-smooth">
      {pinnedMessages.length > 0 && (
        <div className="mb-6 sticky top-0 z-20">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-emerald-100 p-4">
            <div className="text-sm font-bold text-emerald-600 flex items-center gap-2 mb-4 uppercase tracking-wider">
              <Pin size={16} /> Pinned Messages
            </div>
            {pinnedMessages.map(msg => (
              <MessageItem 
                key={msg.id} 
                msg={msg} 
                isMe={myMessages.includes(msg.id)} 
                onDeleteMe={onDeleteMe} 
                onDeleteAll={onDeleteAll} 
                onPin={onPin} 
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex justify-center mb-6">
          <span className="bg-white border border-gray-200 text-gray-500 text-xs py-1.5 px-4 rounded-full shadow-sm flex items-center gap-2 font-medium">
            🔒 End-to-end encrypted
          </span>
        </div>
        
        {regularMessages.map(msg => (
          <MessageItem 
            key={msg.id} 
            msg={msg} 
            isMe={myMessages.includes(msg.id)} 
            onDeleteMe={onDeleteMe} 
            onDeleteAll={onDeleteAll} 
            onPin={onPin} 
          />
        ))}
        
        {/* 4. This invisible div sits at the absolute bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}