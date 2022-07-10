import BadWords from './words/bad-words.json'

const badWords = new Set(BadWords)

/**
 * Given an array of words, return a new array containing only "non-profane" words.
 *
 * @param words The words to check.
 * @returns The non-profane words.
 */
export function getNonProfane(words: string[]) {
  return words.filter((word) => !isProfane(word))
}

/**
 * Get whether a word is among the set of profane words.
 *
 * @param word The word to check.
 * @returns Whether the word is profane.
 */
export function isProfane(word: string) {
  return badWords.has(word)
}

/**
 * Get whether a word is NOT among the set of profane words.
 *
 * @param word The word to check.
 * @returns Whether the word is not profane.
 */
export function isNotProfane(word: string) {
  return !badWords.has(word)
}

/**
 * Get a random index from an array.
 *
 * @param arr The array to get the index from.
 * @returns The random index.
 */
export function randomIndex(arr: unknown[]): number {
  return Math.floor(Math.random() * arr.length)
}

/**
 * Return a random value from an array and remove the value from the array.
 * @returns The random value.
 * @note This operation mutates the array.
 */
export function sampleAndRemove<T>(arr: T[]): T {
  const index = randomIndex(arr)
  const item = arr[index]
  arr.splice(index, 1)
  return item
}
