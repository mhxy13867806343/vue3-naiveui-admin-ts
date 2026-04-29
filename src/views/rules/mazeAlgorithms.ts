import type { CellType, MazeGrid, MazeStep } from '@/types'

/**
 * Create an empty maze grid filled entirely with walls.
 */
export function createEmptyMaze(rows: number, cols: number): MazeGrid {
  const cells: CellType[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 'wall' as CellType),
  )
  return { rows, cols, cells }
}

/**
 * Ensure dimensions are odd (walls on even indices, passages on odd).
 */
function ensureOdd(n: number): number {
  return n % 2 === 0 ? n + 1 : n
}

/**
 * Shuffle an array in place using Fisher-Yates.
 */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Cardinal directions: [dRow, dCol]
const DIRECTIONS: [number, number][] = [
  [-2, 0], // up
  [2, 0],  // down
  [0, -2], // left
  [0, 2],  // right
]

/**
 * Recursive backtracking maze generation.
 *
 * Yields a MazeStep for each cell carved during generation.
 * Returns the final MazeGrid when complete.
 *
 * Grid layout: walls on even indices, passages on odd indices.
 * Start: (1, 1), End: (rows-2, cols-2).
 */
export function* generateMazeRecursiveBacktrack(
  rows: number,
  cols: number,
): Generator<MazeStep, MazeGrid> {
  rows = ensureOdd(Math.max(rows, 5))
  cols = ensureOdd(Math.max(cols, 5))

  const maze = createEmptyMaze(rows, cols)

  // Carve starting cell
  maze.cells[1][1] = 'passage'
  yield { row: 1, col: 1, type: 'passage' }

  // Stack-based iterative DFS (avoids call-stack overflow for large mazes)
  const stack: [number, number][] = [[1, 1]]

  while (stack.length > 0) {
    const [cr, cc] = stack[stack.length - 1]
    const dirs = shuffle([...DIRECTIONS])
    let carved = false

    for (const [dr, dc] of dirs) {
      const nr = cr + dr
      const nc = cc + dc

      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && maze.cells[nr][nc] === 'wall') {
        // Carve the wall between current and neighbor
        const wallR = cr + dr / 2
        const wallC = cc + dc / 2
        maze.cells[wallR][wallC] = 'passage'
        yield { row: wallR, col: wallC, type: 'passage' }

        // Carve the neighbor
        maze.cells[nr][nc] = 'passage'
        yield { row: nr, col: nc, type: 'passage' }

        stack.push([nr, nc])
        carved = true
        break
      }
    }

    if (!carved) {
      stack.pop()
    }
  }

  // Mark start and end
  maze.cells[1][1] = 'start'
  yield { row: 1, col: 1, type: 'start' }

  maze.cells[rows - 2][cols - 2] = 'end'
  yield { row: rows - 2, col: cols - 2, type: 'end' }

  return maze
}

/**
 * Prim's algorithm maze generation.
 *
 * Yields a MazeStep for each cell carved during generation.
 * Returns the final MazeGrid when complete.
 *
 * Grid layout: walls on even indices, passages on odd indices.
 * Start: (1, 1), End: (rows-2, cols-2).
 */
export function* generateMazePrim(
  rows: number,
  cols: number,
): Generator<MazeStep, MazeGrid> {
  rows = ensureOdd(Math.max(rows, 5))
  cols = ensureOdd(Math.max(cols, 5))

  const maze = createEmptyMaze(rows, cols)

  // Start from (1, 1)
  maze.cells[1][1] = 'passage'
  yield { row: 1, col: 1, type: 'passage' }

  // Frontier walls: walls adjacent to carved passages that could open new cells
  const frontiers: [number, number, number, number][] = [] // [wallRow, wallCol, cellRow, cellCol]

  function addFrontiers(r: number, c: number) {
    for (const [dr, dc] of DIRECTIONS) {
      const nr = r + dr
      const nc = c + dc
      if (nr > 0 && nr < rows - 1 && nc > 0 && nc < cols - 1 && maze.cells[nr][nc] === 'wall') {
        const wallR = r + dr / 2
        const wallC = c + dc / 2
        frontiers.push([wallR, wallC, nr, nc])
      }
    }
  }

  addFrontiers(1, 1)

  while (frontiers.length > 0) {
    // Pick a random frontier
    const idx = Math.floor(Math.random() * frontiers.length)
    const [wallR, wallC, cellR, cellC] = frontiers[idx]
    // Remove by swapping with last element
    frontiers[idx] = frontiers[frontiers.length - 1]
    frontiers.pop()

    // Only carve if the target cell is still a wall
    if (maze.cells[cellR][cellC] === 'wall') {
      maze.cells[wallR][wallC] = 'passage'
      yield { row: wallR, col: wallC, type: 'passage' }

      maze.cells[cellR][cellC] = 'passage'
      yield { row: cellR, col: cellC, type: 'passage' }

      addFrontiers(cellR, cellC)
    }
  }

  // Mark start and end
  maze.cells[1][1] = 'start'
  yield { row: 1, col: 1, type: 'start' }

  maze.cells[rows - 2][cols - 2] = 'end'
  yield { row: rows - 2, col: cols - 2, type: 'end' }

  return maze
}
