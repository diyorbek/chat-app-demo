import { Box } from '@mui/material';
import { ReactNode } from 'react';

export function ChatContainer({ children }: { children?: ReactNode }) {
  return (
    <Box height="100%" position="relative">
      <Box
        display="flex"
        flexDirection="column-reverse"
        position="absolute"
        width="100%"
        height="100%"
        overflow="auto"
        padding={2}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
