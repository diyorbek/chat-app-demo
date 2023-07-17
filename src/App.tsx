import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

function App() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100vh">
        <AppBar position="relative" color="transparent">
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
            <List>
              <ListItem alignItems="flex-start" disablePadding>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText primary="Brunch this weekend?" />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
            </List>
          </Box>

          <Box flex={1} bgcolor="grey">
            Chat
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
