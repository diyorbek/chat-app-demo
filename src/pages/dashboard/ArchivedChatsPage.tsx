import { Box } from '@mui/material';
import { ChatContainer } from '../../components/ChatContainer';
import { ChatMessage } from '../../components/ChatMessage';

import { useEffect } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { ArchiveActions } from '../../components/ArchiveActions';
import { ChatList } from '../../components/ChatList';
import { ChatListItem } from '../../components/ChatListItem';
import { useChatControllerContext } from '../../contexts/ChatControllerContext';
import { chatController } from '../../controllers/ChatController';

const userId = 12345; // this should be retrieved from backend

export function ArchivedChatsPage() {
  const { currentArchivedChat: currentChat } = useChatControllerContext();
  const { archivedChats, setCurrentArchivedChat } = useChatControllerContext();
  const navigate = useNavigate();
  const routeMatch = useMatch('/archived/:id');

  useEffect(() => {
    if (
      routeMatch == null ||
      chatController.getArchivedChatsStatus() === 'initial' // TODO: add status changes to chat controller context
    )
      return;

    const { id } = routeMatch.params;
    const resultChat = chatController
      .getArchivedChats()
      .find((chat) => chat.user.id === Number(id));

    if (!resultChat) {
      navigate('/404', { replace: true });
    } else {
      setCurrentArchivedChat(resultChat);
    }
  }, [archivedChats, navigate, routeMatch, setCurrentArchivedChat]);

  return (
    <Box display="flex" overflow="auto" height="100%">
      <Box width="360px" overflow="auto">
        <Box position="sticky" top={0} bgcolor="white" zIndex={1}>
          <ArchiveActions />
        </Box>

        <ChatList>
          {archivedChats.map((chat) => (
            <ChatListItem
              key={chat.user.id}
              label={chat.user.name}
              isActive={Number(routeMatch?.params.id) === chat.user.id}
              onClick={() => {
                navigate(`/archived/${chat.user.id}`);
              }}
            />
          ))}
        </ChatList>
      </Box>

      <Box flex={1} bgcolor="grey">
        {currentChat && (
          <ChatContainer key={currentChat.user.id}>
            {currentChat?.messages.map(({ content, timestamp, user_id }, i) => (
              <ChatMessage
                key={i}
                content={content}
                timestamp={timestamp}
                variant={user_id === userId ? 'sent' : 'received'}
              />
            ))}
          </ChatContainer>
        )}
      </Box>
    </Box>
  );
}
