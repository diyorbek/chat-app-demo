import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useChatControllerContext } from '../contexts/ChatControllerContext';
import { chatController } from '../controllers/ChatController';
import { fileController } from '../controllers/FileController';

export function ArchiveActions() {
  const { archivedChats } = useChatControllerContext();

  const handleImport = () => {
    void fileController.loadArchiveFromFile().then((content) => {
      if (content) chatController.loadArchivedChats(content);
    });
  };

  const handleExport = () => {
    void fileController.saveArchiveToFile(archivedChats);
  };

  return (
    <AppBar
      position="relative"
      color="transparent"
      variant="outlined"
      elevation={0}
    >
      <Toolbar>
        <Box display="flex" gap={2}>
          <Button variant="outlined" color="info" onClick={handleImport}>
            Import
          </Button>
          <Button
            variant="outlined"
            color="info"
            disabled={!archivedChats.length}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            color="info"
            disabled={!archivedChats.length}
            onClick={() => chatController.flushArchives()}
          >
            Clear
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
