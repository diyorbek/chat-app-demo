import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { ChatMessage } from './components/ChatMessage';
import { ChatContainer } from './components/ChatContainer';
import { ChatList } from './components/ChatList';
import { ChatListItem } from './components/ChatListItem';
import { fileController } from './FileController';
import { useChatControllerContext } from './contexts/ChatControllerContext';
import { chatController } from './ChatController';

const userId = 12345;

function App() {
  const { archivedChats, currentChat, setCurrentChat } =
    useChatControllerContext();

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh">
        <AppBar
          position="relative"
          color="transparent"
          variant="outlined"
          elevation={0}
        >
          <Toolbar>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                color="info"
                onClick={() => {
                  void fileController.loadArchiveFromFile().then((content) => {
                    if (content) chatController.loadArchivedChats(content);
                  });
                }}
              >
                Import
              </Button>
              <Button
                variant="outlined"
                color="info"
                disabled={!archivedChats.length}
                onClick={() => {
                  void fileController.saveArchiveToFile(archivedChats);
                }}
              >
                Export
              </Button>
              <Button
                variant="outlined"
                color="info"
                disabled={!archivedChats.length}
                onClick={() => chatController.flushArchives()}
              >
                Clear
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

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
            <ChatContainer key={currentChat?.user.id || '1'}>
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
