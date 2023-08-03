export function extractTime(ISODateTime: string) {
  return new Date(ISODateTime).toTimeString().slice(0, 5);
}

export function createHiddenInput() {
  const input = document.createElement('input');

  // See https://stackoverflow.com/questions/47664777/javascript-file-input-onchange-not-working-ios-safari-only
  input.style.position = 'fixed';
  input.style.top = '-100000px';
  input.style.left = '-100000px';

  return input;
}

// We have to export it for testing purposes
export function openFilePickerWithInput(accept: string): Promise<File> {
  const input = createHiddenInput();
  input.type = 'file';
  input.accept = accept;

  document.body.appendChild(input);

  return new Promise((resolve, reject) => {
    input.onchange = () => {
      if (input.files) resolve(input.files[0]);
      else reject();

      document.body.removeChild(input);
    };

    input.click();
  });
}

export function safeParseJSON<T>(data: string): T | null {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    return null;
  }
}
