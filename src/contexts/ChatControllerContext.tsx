import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Chat } from '../schemas';
import { chatController } from '../ChatController';

interface ChatControllerContext {
  archivedChats: readonly Chat[];
  currentChat: Chat | undefined;
  setCurrentChat: (chat: Chat) => void;
}

const ChatControllerContext = createContext<ChatControllerContext>({
  archivedChats: [],
  currentChat: undefined,
  setCurrentChat: () => void 0,
});

export function useChatControllerContext() {
  return useContext(ChatControllerContext);
}

export function ChatControllerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentChat, setCurrentChat] = useState<Chat>();
  const [archivedChats, setArchivedChats] = useState<readonly Chat[]>([]);

  useEffect(() => {
    chatController.subscribe(() => {
      setArchivedChats(chatController.getArchivedChats());
      setCurrentChat(chatController.getCurrentChat());
    });

    try {
      chatController.restoreArchivedChats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ChatControllerContext.Provider
      value={{ archivedChats, currentChat, setCurrentChat }}
    >
      {children}
    </ChatControllerContext.Provider>
  );
}
