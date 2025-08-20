/**
 * Problem 1: Find unused letters in the alphabet
 * @param input - String of English letters
 * @returns String of unused letters in alphabetical order
 */
export function findUnusedLetters(input: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const seen = new Set<string>();

  // Collect letters seen
  for (const char of input.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      seen.add(char);
    }
  }

  // Find letters not in the set
  let missing = '';
  for (const letter of alphabet) {
    if (!seen.has(letter)) {
      missing += letter;
    }
  }

  return missing;
}
