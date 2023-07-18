import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';

interface Props {
  label: string;
  avatarUrl?: string;
  isActive?: boolean;
  isHighlighted?: boolean;
  isLast?: boolean;
}

export function ChatListItem({
  label,
  avatarUrl,
  isActive,
  isHighlighted,
  isLast,
}: Props) {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        disablePadding
        secondaryAction={
          isHighlighted && (
            <Typography
              fontSize={36}
              color="orange"
              style={{ userSelect: 'none' }}
            >
              &bull;
            </Typography>
          )
        }
      >
        <ListItemButton selected={isActive}>
          <ListItemAvatar>
            <Avatar alt={label} src={avatarUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={label}
            primaryTypographyProps={{
              fontWeight: isHighlighted ? 'bold' : undefined,
            }}
          />
        </ListItemButton>
      </ListItem>

      {!isLast && <Divider component="li" variant="inset" />}
    </>
  );
}