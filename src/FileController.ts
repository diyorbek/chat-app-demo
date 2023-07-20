import { Data } from './schemas';
import { openFilePicker, readFileAsText, saveToFile } from './utils/fileUtils';

class FileController {
  #instance: FileController | null = null;

  constructor() {
    if (this.#instance) {
      throw new Error('FileController can be instanciated only once!');
    }

    this.#instance = this;
  }

  async loadArchiveFromFile() {
    const file = await openFilePicker('.json');
    return readFileAsText(file);
  }

  async saveArchiveToFile(data: unknown) {
    return saveToFile('chat-archive.json', JSON.stringify(data));
  }
}

export const fileController = new FileController();
