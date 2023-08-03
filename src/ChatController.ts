import { Chat, archivedChatsSchema } from './schemas';
import { safeParseJSON } from './utils/misc';

export type ChatControllerSubscriber = () => void;

class ChatController {
  #instance: ChatController | null = null;
  #subscribers = new Set<ChatControllerSubscriber>();
  #arcStorageKey = 'archived-chat-data-key';
  #archivedChats: readonly Chat[] = [];
  #currentChat: Chat | undefined = undefined;

  constructor() {
    if (this.#instance) {
      throw new Error('ChatController can be instanciated only once!');
    }

    this.#instance = this;
  }

  loadArchivedChats(data: string) {
    const archived = archivedChatsSchema.parse(safeParseJSON(data));
    this.#setArchivedChats(archived);
  }

  restoreArchivedChats() {
    const data = localStorage.getItem(this.#arcStorageKey) || '';
    this.loadArchivedChats(data);
  }

  flushArchives() {
    this.#setArchivedChats([]);
    this.setCurrentChat(undefined);
  }

  getArchivedChats() {
    return this.#archivedChats;
  }

  getCurrentChat() {
    return this.#currentChat;
  }

  setCurrentChat(chat: Chat | undefined) {
    if (chat === undefined || this.#archivedChats.includes(chat)) {
      this.#currentChat = chat;
      this.#emitChange();
    }
  }

  #setArchivedChats(chats: Chat[]) {
    this.#archivedChats = Object.freeze(chats);
    localStorage.setItem(this.#arcStorageKey, JSON.stringify(chats));
    this.#emitChange();
  }

  subscribe(subscriber: ChatControllerSubscriber) {
    this.#subscribers.add(subscriber);

    return () => {
      this.#subscribers.delete(subscriber);
    };
  }

  #emitChange() {
    for (const subscriber of this.#subscribers) {
      try {
        subscriber();
      } catch (error) {
        console.error('Storage subcriber is broker');
      }
    }
  }
}

export const chatController = new ChatController();
