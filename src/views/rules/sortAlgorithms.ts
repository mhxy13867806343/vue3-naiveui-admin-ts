import type { SortStep } from '@/types'

/**
 * Bubble Sort — Generator implementation.
 *
 * Repeatedly steps through the array, compares adjacent elements,
 * and swaps them if they are in the wrong order.
 *
 * Yields a SortStep for each comparison.
 * Returns the final sorted array.
 */
export function* bubbleSort(arr: number[]): Generator<SortStep, number[]> {
  const a = [...arr]
  const n = a.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        yield { array: [...a], comparing: [j, j + 1], swapping: [j, j + 1] }
      } else {
        yield { array: [...a], comparing: [j, j + 1], swapping: null }
      }
    }
  }

  return a
}

/**
 * Quick Sort — Generator implementation.
 *
 * Uses Lomuto partition scheme. Recursion is handled via an explicit
 * stack to keep the generator flat.
 *
 * Yields a SortStep for each comparison.
 * Returns the final sorted array.
 */
export function* quickSort(arr: number[]): Generator<SortStep, number[]> {
  const a = [...arr]
  const n = a.length
  if (n <= 1) return a

  // Stack of [low, high] ranges to partition
  const stack: [number, number][] = [[0, n - 1]]

  while (stack.length > 0) {
    const [low, high] = stack.pop()!
    if (low >= high) continue

    // Lomuto partition
    const pivot = a[high]
    let i = low

    for (let j = low; j < high; j++) {
      yield { array: [...a], comparing: [j, high], swapping: null }

      if (a[j] <= pivot) {
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          yield { array: [...a], comparing: [i, j], swapping: [i, j] }
        }
        i++
      }
    }

    // Place pivot in its correct position
    if (i !== high) {
      ;[a[i], a[high]] = [a[high], a[i]]
      yield { array: [...a], comparing: [i, high], swapping: [i, high] }
    }

    // Push sub-ranges onto the stack (right first so left is processed first)
    stack.push([i + 1, high])
    stack.push([low, i - 1])
  }

  return a
}

/**
 * Merge Sort — Generator implementation.
 *
 * Bottom-up iterative merge sort to keep the generator flat.
 * Merges are done in-place on the working array.
 *
 * Yields a SortStep for each comparison during merging.
 * Returns the final sorted array.
 */
export function* mergeSort(arr: number[]): Generator<SortStep, number[]> {
  const a = [...arr]
  const n = a.length
  if (n <= 1) return a

  // Bottom-up merge sort
  for (let width = 1; width < n; width *= 2) {
    for (let start = 0; start < n; start += width * 2) {
      const mid = Math.min(start + width, n)
      const end = Math.min(start + width * 2, n)

      // Merge a[start..mid) and a[mid..end)
      const left = a.slice(start, mid)
      const right = a.slice(mid, end)
      let i = 0
      let j = 0
      let k = start

      while (i < left.length && j < right.length) {
        const li = start + i
        const ri = mid + j

        if (left[i] <= right[j]) {
          a[k] = left[i]
          i++
          yield { array: [...a], comparing: [li, ri], swapping: null }
        } else {
          a[k] = right[j]
          j++
          yield { array: [...a], comparing: [li, ri], swapping: [k, ri] }
        }
        k++
      }

      while (i < left.length) {
        a[k] = left[i]
        i++
        k++
      }

      while (j < right.length) {
        a[k] = right[j]
        j++
        k++
      }
    }
  }

  return a
}

/**
 * Insertion Sort — Generator implementation.
 *
 * Builds the sorted portion one element at a time by inserting
 * each element into its correct position.
 *
 * Yields a SortStep for each comparison.
 * Returns the final sorted array.
 */
export function* insertionSort(arr: number[]): Generator<SortStep, number[]> {
  const a = [...arr]
  const n = a.length

  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0 && a[j - 1] > a[j]) {
      ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
      yield { array: [...a], comparing: [j - 1, j], swapping: [j - 1, j] }
      j--
    }
    if (j > 0) {
      yield { array: [...a], comparing: [j - 1, j], swapping: null }
    }
  }

  return a
}
