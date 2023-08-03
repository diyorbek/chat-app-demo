import { openFilePicker } from '../fileUtils';
import { openFilePickerWithInput } from '../misc';

/**
 *  Mocking "misc.ts" file and replacing
 * `openFilePickerWithInput` with spy function
 */
jest.mock(
  '../misc',
  () =>
    ({
      openFilePickerWithInput: jest.fn(() => 1),
    } as unknown)
);

describe('File system access api support', () => {
  let windowSpy: jest.SpyInstance;
  let mockShowOpenFilePicker: jest.Mock;

  beforeEach(() => {
    /**
     * Sloppy placeholder for [FileSystemFileHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle)
     * We only use `getFile` method of `FileSystemFileHandle`.
     * That's why here it is just an object with that method.
     * We don't care about the return value, so it is just an empty object.
     * */
    const fileSystemFileHandle = { getFile: () => ({}) };

    // Create mock function for `showOpenFilePicker` so we can spy on it.
    mockShowOpenFilePicker = jest.fn(() =>
      Promise.resolve([fileSystemFileHandle])
    );

    // Spying on `globalThis` (which is basically `window` object).
    windowSpy = jest.spyOn(globalThis, 'window', 'get');

    // Overriding `showOpenFilePicker` method with out mocked function.
    // We do it by mocking the implementation of `window` object.
    // By overriding it we also make `showOpenFilePicker` exist in `window`
    windowSpy.mockImplementation(() => ({
      showOpenFilePicker: mockShowOpenFilePicker,
    }));
  });

  afterEach(() => {
    // We need to reset mocks after each test case.
    mockShowOpenFilePicker.mockRestore();
    windowSpy.mockRestore();
  });

  it('should correctly call openFilePicker', () => {
    void openFilePicker('.xml');

    expect(mockShowOpenFilePicker).toBeCalledTimes(1);
    expect(mockShowOpenFilePicker).toBeCalledWith(
      // we expect `showOpenFilePicker` to be called with this argument
      {
        types: [
          {
            accept: {
              'applocation/*': '.xml',
            },
          },
        ],
      }
    );
  });
});

describe('No file system access api', () => {
  it.only('should correctly call openFilePicker', () => {
    void openFilePicker('.xml');

    /**
     * `openFilePickerWithInput` should be called
     * because `window` doesn't have `showOpenFilePicker`
     */
    expect(openFilePickerWithInput).toBeCalledTimes(1);
    expect(openFilePickerWithInput).toBeCalledWith('.xml');
  });
});
