import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { ChatMessage } from './components/ChatMessage';
import { ChatContainer } from './components/ChatContainer';
import { ChatList } from './components/ChatList';
import { ChatListItem } from './components/ChatListItem';

function App() {
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
              <Button variant="outlined" color="info">
                Import
              </Button>
              <Button variant="outlined" color="info">
                Export
              </Button>
              <Button variant="outlined" color="info">
                Clear
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box display="flex" height="100%">
          <Box width="360px">
            <ChatList>
              <ChatListItem label="John Doe" />
              <ChatListItem label="John Doe" isHighlighted />
              <ChatListItem label="John Doe" isActive />
              <ChatListItem label="John Doe" isLast />
            </ChatList>
          </Box>

          <Box flex={1} bgcolor="grey">
            <ChatContainer>
              <ChatMessage content="Hello! sdfds" timestamp="" variant="sent" />
              <ChatMessage
                content="Hello! sdfds"
                timestamp="2023-07-18T06:56:43.220Z"
                variant="received"
              />
            </ChatContainer>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
