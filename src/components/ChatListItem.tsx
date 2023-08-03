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
  onClick?: () => void;
}

export function ChatListItem({
  label,
  avatarUrl,
  isActive,
  isHighlighted,
  isLast,
  onClick,
}: Props) {
  return (
    <>
      <ListItem
        aria-label={`item ${label}`}
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
        <ListItemButton selected={isActive} onClick={onClick}>
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
