import { Chat } from '../../schemas';
import { chatController } from '../ChatController';

const mockData: Chat[] = [
  {
    user: { id: 1, name: 'John', avatar_url: '' },
    messages: [
      {
        user_id: 1,
        timestamp: new Date().toISOString(),
        content: 'Hi',
      },
    ],
  },
];
const mockDataString = JSON.stringify(mockData);

describe('`ChatController` behavior', () => {
  beforeEach(() => {
    // Clean up `chatController` data
    chatController.flushArchives();
  });

  test('archive data load', () => {
    chatController.loadArchivedChats(mockDataString);

    // Check if `chatController` now holds the same data as the input.
    expect(chatController.getArchivedChats()).toEqual(mockData);
    // Check if `chatController` saved the date to `localStorage` too.
    expect(localStorage.getItem('archived-chat-data-key')).toBe(mockDataString);
  });

  test('emit changes to subscribers', () => {
    chatController.loadArchivedChats(mockDataString);

    // Dummy subscribers (spy functions)
    const subscriber1 = jest.fn(() => void 0);
    const subscriber2 = jest.fn(() => void 0);

    // `subscribe` method returns unsubscribe callbacks: we save them to use later
    const unsubscribe1 = chatController.subscribe(subscriber1);
    const unsubscribe2 = chatController.subscribe(subscriber2);

    // Update data in `chatController` to trigger subscribers
    const selectedChat = chatController.getArchivedChats()[0];
    chatController.setArchivedCurrentChat(selectedChat);

    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(1);

    // Remove `subscriber1` from `chatController` subscribers
    unsubscribe1();
    // Remove data from `chatController` to trigger subscribers
    chatController.flushArchives();

    // `subscriber1` is not called this time
    expect(subscriber1).toBeCalledTimes(1);
    // but `subscriber2` is called 2 times
    expect(subscriber2).toBeCalledTimes(2);

    unsubscribe2();
  });
});
