import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import { fetchMessages, sendMsg, deleteMsg, pinMsg } from "./services/api";
import { Circle } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function App() {
  const [messages, setMessages] = useState([]);
  
  const [deletedForMe, setDeletedForMe] = useState(() => {
    const saved = localStorage.getItem('hiddenMsgs');
    return saved ? JSON.parse(saved) : [];
  });

  const [myMessages, setMyMessages] = useState(() => {
    const saved = localStorage.getItem('myMsgs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hiddenMsgs', JSON.stringify(deletedForMe));
  }, [deletedForMe]);

  useEffect(() => {
    localStorage.setItem('myMsgs', JSON.stringify(myMessages));
  }, [myMessages]);

  const loadMessages = async () => {
    try {
      const res = await fetchMessages();
      setMessages(res.data);
    } catch (err) {}
  };

  useEffect(() => {
    loadMessages();

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8081/ws"),
      onConnect: () => {
        stompClient.subscribe("/topic/chat", () => {
          loadMessages();
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleSend = async (text) => {
    const res = await sendMsg(text);
    setMyMessages(prev => [...prev, res.data.id]);
  };

  const handleDeleteAll = async (id) => {
    await deleteMsg(id);
  };

  const handlePin = async (id) => {
    await pinMsg(id);
  };

  const handleDeleteMe = (id) => {
    setDeletedForMe(prev => [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-[1000px] h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-white/60">
        <header className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between z-10 relative">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                AD
              </div>
              <Circle size={14} className="absolute -bottom-1 -right-1 text-green-500 fill-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-800 text-lg tracking-tight">Adverayze Platform</h1>
              <p className="text-sm text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> 
                Online now
              </p>
            </div>
          </div>
        </header>

        <ChatWindow
          messages={messages}
          deletedForMe={deletedForMe}
          myMessages={myMessages}
          onDeleteMe={handleDeleteMe}
          onDeleteAll={handleDeleteAll}
          onPin={handlePin}
        />

        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}