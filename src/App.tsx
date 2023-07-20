import { Box, Container } from '@mui/material';
import { ChatMessage } from './components/ChatMessage';
import { ChatContainer } from './components/ChatContainer';
import { ChatList } from './components/ChatList';
import { ChatListItem } from './components/ChatListItem';

import { useChatControllerContext } from './contexts/ChatControllerContext';
import { Header } from './components/Header';

const userId = 12345; // this should be retrieved from backend

function App() {
  const { archivedChats, currentChat, setCurrentChat } =
    useChatControllerContext();

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />

        <Box display="flex" overflow="auto" height="100%">
          <Box width="360px" overflow="auto">
            <ChatList>
              {archivedChats.map((chat) => (
                <ChatListItem
                  key={chat.user.id}
                  label={chat.user.name}
                  onClick={() => setCurrentChat(chat)}
                />
              ))}
            </ChatList>
          </Box>

          <Box flex={1} bgcolor="grey">
            <ChatContainer key={currentChat?.user.id}>
              {currentChat?.messages.map(
                ({ content, timestamp, user_id }, i) => (
                  <ChatMessage
                    key={i}
                    content={content}
                    timestamp={timestamp}
                    variant={user_id === userId ? 'sent' : 'received'}
                  />
                )
              )}
            </ChatContainer>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
