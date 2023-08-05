import { Chat, archivedChatsSchema } from '../schemas';
import { safeParseJSON } from '../utils/misc';

export type ChatControllerSubscriber = () => void;
type Status = 'initial' | 'ready';

class ChatController {
  #instance: ChatController | null = null;
  #subscribers = new Set<ChatControllerSubscriber>();

  #actStorageKey = 'active-chat-data-key';
  #activeChats: readonly Chat[] = [];
  #currentActiveChat: Chat | undefined = undefined;

  #arcStorageKey = 'archived-chat-data-key';
  #archivedChats: readonly Chat[] = [];
  #currentArchivedChat: Chat | undefined = undefined;

  #activeChatsStatus: Status = 'initial';
  #archivedChatsStatus: Status = 'initial';

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

  loadActiveChats(data: string) {
    const active = safeParseJSON(data) as Chat[]; // implement schema
    this.#setActiveChats(active);
  }

  restoreChats() {
    const activeChatData = localStorage.getItem(this.#actStorageKey) || '';
    const archivedChatData = localStorage.getItem(this.#arcStorageKey) || '';
    this.loadActiveChats(activeChatData);
    this.loadArchivedChats(archivedChatData);
  }

  flushArchives() {
    this.#setArchivedChats([]);
    this.#currentArchivedChat = undefined;
  }

  getActiveChats() {
    return this.#activeChats;
  }

  getCurrentActiveChat() {
    return this.#currentActiveChat;
  }

  getActiveChatsStatus() {
    return this.#activeChatsStatus;
  }

  getArchivedChats() {
    return this.#archivedChats;
  }

  getCurrentArchivedChat() {
    return this.#currentArchivedChat;
  }

  getArchivedChatsStatus() {
    return this.#archivedChatsStatus;
  }

  setArchivedCurrentChat(chat: Chat | undefined) {
    if (chat === undefined || this.#archivedChats.includes(chat)) {
      this.#currentArchivedChat = chat;
      this.#emitChange();
    }
  }

  #setActiveChats(chats: Chat[]) {
    this.#activeChats = Object.freeze(chats);
    this.#activeChatsStatus = 'ready';
    localStorage.setItem(this.#actStorageKey, JSON.stringify(chats));
    this.#emitChange();
  }

  #setArchivedChats(chats: Chat[]) {
    this.#archivedChats = Object.freeze(chats);
    this.#archivedChatsStatus = 'ready';
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
