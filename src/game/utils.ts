/**
 * Get a random index from an array.
 */
export function randomIndex(arr: unknown[]): number {
  return Math.floor(Math.random() * arr.length)
}

/**
 * Return a random value from an array and remove the value from the array.
 */
export function sampleAndRemove<T>(arr: T[]): T {
  const index = randomIndex(arr)
  const item = arr[index]
  arr.splice(index, 1)
  return item
}
