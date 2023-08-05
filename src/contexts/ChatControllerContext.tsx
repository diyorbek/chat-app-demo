import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { chatController } from '../controllers/ChatController';
import { Chat } from '../schemas';

interface ChatControllerContext {
  activeChats: readonly Chat[];
  currentActiveChat: Chat | undefined;
  setCurrentActiveChat: (chat: Chat) => void;

  archivedChats: readonly Chat[];
  currentArchivedChat: Chat | undefined;
  setCurrentArchivedChat: (chat: Chat) => void;
}

const ChatControllerContext = createContext<ChatControllerContext>({
  activeChats: [],
  currentActiveChat: undefined,
  setCurrentActiveChat: () => void 0,

  archivedChats: [],
  currentArchivedChat: undefined,
  setCurrentArchivedChat: () => void 0,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useChatControllerContext() {
  return useContext(ChatControllerContext);
}

export function ChatControllerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeChats, setActiveChats] = useState<readonly Chat[]>([]);
  const [currentActiveChat, setCurrentActiveChat] = useState<Chat>();
  const [currentArchivedChat, setCurrentArchivedChat] = useState<Chat>();
  const [archivedChats, setArchivedChats] = useState<readonly Chat[]>([]);

  useEffect(() => {
    chatController.subscribe(() => {
      setActiveChats(chatController.getActiveChats());
      setCurrentActiveChat(chatController.getCurrentActiveChat());

      setArchivedChats(chatController.getArchivedChats());
      setCurrentArchivedChat(chatController.getCurrentArchivedChat());
    });

    try {
      chatController.restoreChats();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <ChatControllerContext.Provider
      value={{
        activeChats,
        currentActiveChat,
        setCurrentActiveChat,

        archivedChats,
        currentArchivedChat,
        setCurrentArchivedChat,
      }}
    >
      {children}
    </ChatControllerContext.Provider>
  );
}
