import { Box, colors, Typography } from '@mui/material';
import { extractTime } from '../utils/misc';

interface Props {
  content: string;
  timestamp: string;
  variant: 'received' | 'sent';
}

export function ChatMessage({ content, timestamp, variant }: Props) {
  const isSent = variant === 'sent';
  const bgColor = isSent ? colors.lightGreen[500] : colors.lightBlue[500];

  return (
    <Box
      bgcolor={bgColor}
      alignSelf={isSent ? 'flex-end' : 'flex-start'}
      marginLeft={isSent ? 2 : 0}
      marginRight={isSent ? 0 : 2}
      display="inline-flex"
      flexDirection="column"
      borderRadius={4}
      padding={1}
      maxWidth={500}
    >
      <Typography color="white">{content}</Typography>
      <Typography
        color="white"
        variant="caption"
        style={{ alignSelf: 'flex-end' }}
      >
        {extractTime(timestamp)}
      </Typography>
    </Box>
  );
}
