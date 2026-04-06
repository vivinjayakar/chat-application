import { Pin, Trash2, Ban } from "lucide-react";

export default function MessageItem({ msg, isMe, onDeleteMe, onDeleteAll, onPin }) {
  if (msg.deleted) {
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className="bg-gray-100 text-gray-500 italic text-sm py-2 px-4 rounded-2xl flex items-center gap-2 border border-gray-200">
          <Ban size={14} /> This message was deleted
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col mb-4 group relative ${isMe ? 'items-end' : 'items-start'}`}>
      <div className={`flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
        <button onClick={() => onPin(msg.id)} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-white text-gray-600 hover:text-emerald-600 rounded-lg shadow-sm border border-gray-200 font-medium">
          <Pin size={12} /> {msg.pinned ? 'Unpin Message' : 'Pin Message'}
        </button>
        <button onClick={() => onDeleteMe(msg.id)} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-white text-gray-600 hover:text-amber-500 rounded-lg shadow-sm border border-gray-200 font-medium">
          <Trash2 size={12} /> Delete for Me
        </button>
        {isMe && (
          <button onClick={() => onDeleteAll(msg.id)} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 bg-white text-gray-600 hover:text-red-500 rounded-lg shadow-sm border border-gray-200 font-medium">
            <Ban size={12} /> Delete for Everyone
          </button>
        )}
      </div>
      <div className={`max-w-[75%] px-4 py-3 shadow-md ${
        isMe 
          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl rounded-tr-sm' 
          : 'bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm'
      }`}>
        <p className="text-[15px] leading-relaxed break-words">{msg.content}</p>
        <span className={`text-[11px] block mt-1 font-medium ${isMe ? 'text-emerald-50 text-right' : 'text-gray-400 text-left'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}