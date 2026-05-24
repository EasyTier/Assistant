import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length: number): string {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += CHARS[arr[i] % CHARS.length];
  }
  return result;
}

export function randomNetworkName(): string {
  return 'et-' + randomString(8).toLowerCase();
}

export function randomSecret(): string {
  return randomString(24);
}

export function randomInstanceName(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
    separator: '_',
    length: 2,
  });
}
