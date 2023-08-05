import { Box, Tab, Tabs } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { ActiveChatsPage } from './ActiveChatsPage';
import { ArchivedChatsPage } from './ArchivedChatsPage';

interface Props {
  chatType: 'active' | 'archived';
}

export function DashboardPage({ chatType }: Props) {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Tabs
        value={chatType}
        onChange={(_, tabValue: string) =>
          navigate({ pathname: `/${tabValue}` })
        }
      >
        <Tab label="Active chats" value="active" />
        <Tab label="Archived chats" value="archived" />
      </Tabs>

      {chatType === 'active' && <ActiveChatsPage />}
      {chatType === 'archived' && <ArchivedChatsPage />}
    </Box>
  );
}
