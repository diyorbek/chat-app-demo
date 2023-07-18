export function extractTime(ISODateTime: string) {
  return new Date(ISODateTime).toTimeString().slice(0, 5);
}
