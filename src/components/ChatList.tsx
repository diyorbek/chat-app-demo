import { List } from '@mui/material';
import { ReactNode } from 'react';

export function ChatList({ children }: { children?: ReactNode }) {
  return <List>{children}</List>;
}
