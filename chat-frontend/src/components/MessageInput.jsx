// src/components/MessageInput.jsx
import { useState } from "react";
import { Send, Plus } from "lucide-react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all">
          <Plus size={22} />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none focus:outline-none text-[15px] text-gray-700 placeholder-gray-400"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`p-3 rounded-xl flex items-center justify-center transition-all ${
            text.trim() 
              ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={18} className={text.trim() ? "ml-0.5" : ""} />
        </button>
      </div>
    </div>
  );
}