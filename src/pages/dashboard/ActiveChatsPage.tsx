import { Box } from '@mui/material';
import { ChatContainer } from '../../components/ChatContainer';
import { ChatMessage } from '../../components/ChatMessage';

import { useNavigate } from 'react-router-dom';
import { ChatList } from '../../components/ChatList';
import { ChatListItem } from '../../components/ChatListItem';
import { useChatControllerContext } from '../../contexts/ChatControllerContext';

const userId = 12345; // this should be retrieved from backend

export function ActiveChatsPage() {
  const { currentActiveChat, activeChats } = useChatControllerContext();
  const navigate = useNavigate();

  return (
    <Box display="flex" overflow="auto" height="100%">
      <Box width="360px" overflow="auto">
        <ChatList>
          {activeChats?.map((chat) => (
            <ChatListItem
              key={chat.user.id}
              label={chat.user.name}
              onClick={() => {
                navigate(`/active/${chat.user.id}`);
              }}
            />
          ))}
        </ChatList>
      </Box>

      <Box flex={1} bgcolor="grey">
        {currentActiveChat && (
          <ChatContainer key={currentActiveChat.user.id}>
            {currentActiveChat.messages.map(
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
        )}
      </Box>
    </Box>
  );
}
