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
  colors,
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

          <Box flex={1} bgcolor="grey" position="relative">
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
                {[...new Array(10)].map((_, i) => (
                  <Box
                    key={i}
                    display="inline-flex"
                    flexDirection="column"
                    borderRadius={4}
                    padding={1}
                    maxWidth={500}
                    bgcolor={colors.lightBlue[500]}
                    marginRight={2}
                  >
                    <Typography>
                      1 Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs sdsfsfsd
                      sdfsdfdsfdfg Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs
                      sdsfsfsd sdfsdfdsfdfg
                    </Typography>
                    <Typography
                      style={{ alignSelf: 'flex-end' }}
                      variant="caption"
                    >
                      12:03
                    </Typography>
                  </Box>
                ))}
                <Box
                  display="inline-flex"
                  flexDirection="column"
                  alignSelf="flex-end"
                  borderRadius={4}
                  padding={1}
                  maxWidth={500}
                  bgcolor={colors.lightGreen[500]}
                  marginLeft={2}
                >
                  <Typography>
                    2 Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs sdsfsfsd
                    sdfsdfdsfdfg Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs
                    sdsfsfsd sdfsdfdsfdfg
                  </Typography>
                  <Typography
                    style={{ alignSelf: 'flex-end' }}
                    variant="caption"
                  >
                    12:03
                  </Typography>
                </Box>
                <Box
                  display="inline-flex"
                  flexDirection="column"
                  borderRadius={4}
                  padding={1}
                  maxWidth={500}
                  bgcolor={colors.lightBlue[500]}
                  marginRight={2}
                >
                  <Typography>
                    3 Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs sdsfsfsd
                    sdfsdfdsfdfg Hello! sdfds dsf sd fs dfdsfsdfsdffsdfsdfs
                    sdsfsfsd sdfsdfdsfdfg
                  </Typography>
                  <Typography
                    style={{ alignSelf: 'flex-end' }}
                    variant="caption"
                  >
                    12:03
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
