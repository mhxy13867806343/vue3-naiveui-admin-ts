import type { CellType, MazeGrid, MazeStep } from '@/types'

/**
 * Find the coordinates of a specific cell type in the maze.
 */
function findCell(maze: MazeGrid, type: CellType): { row: number; col: number } | null {
  for (let r = 0; r < maze.rows; r++) {
    for (let c = 0; c < maze.cols; c++) {
      if (maze.cells[r][c] === type) {
        return { row: r, col: c }
      }
    }
  }
  return null
}

/**
 * Check if a cell is walkable (not a wall).
 */
function isWalkable(maze: MazeGrid, row: number, col: number): boolean {
  if (row < 0 || row >= maze.rows || col < 0 || col >= maze.cols) return false
  return maze.cells[row][col] !== 'wall'
}

// Cardinal directions for movement: up, down, left, right
const DIRECTIONS: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]

/**
 * Reconstruct the path from start to end using the parent map.
 */
function reconstructPath(
  parentMap: Map<string, string>,
  start: { row: number; col: number },
  end: { row: number; col: number },
): MazeStep[] {
  const path: MazeStep[] = []
  let key = `${end.row},${end.col}`
  const startKey = `${start.row},${start.col}`

  while (key !== startKey) {
    const [r, c] = key.split(',').map(Number)
    path.push({ row: r, col: c, type: 'path' })
    const parent = parentMap.get(key)
    if (!parent) break
    key = parent
  }

  // Add start
  path.push({ row: start.row, col: start.col, type: 'path' })
  path.reverse()
  return path
}

/**
 * BFS maze solver.
 *
 * Yields a MazeStep for each cell visited during solving.
 * Returns the final path as MazeStep[] when complete.
 */
export function* solveBFS(maze: MazeGrid): Generator<MazeStep, MazeStep[]> {
  const start = findCell(maze, 'start')
  const end = findCell(maze, 'end')

  if (!start || !end) return []

  const visited = new Set<string>()
  const parentMap = new Map<string, string>()
  const queue: { row: number; col: number }[] = [start]
  const startKey = `${start.row},${start.col}`
  visited.add(startKey)

  while (queue.length > 0) {
    const current = queue.shift()!
    const currentKey = `${current.row},${current.col}`

    // Yield visited step (except for start/end which keep their type)
    if (currentKey !== startKey && currentKey !== `${end.row},${end.col}`) {
      yield { row: current.row, col: current.col, type: 'visited' }
    }

    // Found the end
    if (current.row === end.row && current.col === end.col) {
      return reconstructPath(parentMap, start, end)
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nr = current.row + dr
      const nc = current.col + dc
      const nKey = `${nr},${nc}`

      if (isWalkable(maze, nr, nc) && !visited.has(nKey)) {
        visited.add(nKey)
        parentMap.set(nKey, currentKey)
        queue.push({ row: nr, col: nc })
      }
    }
  }

  // No path found
  return []
}

/**
 * DFS maze solver.
 *
 * Yields a MazeStep for each cell visited during solving.
 * Returns the final path as MazeStep[] when complete.
 */
export function* solveDFS(maze: MazeGrid): Generator<MazeStep, MazeStep[]> {
  const start = findCell(maze, 'start')
  const end = findCell(maze, 'end')

  if (!start || !end) return []

  const visited = new Set<string>()
  const parentMap = new Map<string, string>()
  const stack: { row: number; col: number }[] = [start]
  const startKey = `${start.row},${start.col}`

  while (stack.length > 0) {
    const current = stack.pop()!
    const currentKey = `${current.row},${current.col}`

    if (visited.has(currentKey)) continue
    visited.add(currentKey)

    // Yield visited step (except for start/end which keep their type)
    if (currentKey !== startKey && currentKey !== `${end.row},${end.col}`) {
      yield { row: current.row, col: current.col, type: 'visited' }
    }

    // Found the end
    if (current.row === end.row && current.col === end.col) {
      return reconstructPath(parentMap, start, end)
    }

    for (const [dr, dc] of DIRECTIONS) {
      const nr = current.row + dr
      const nc = current.col + dc
      const nKey = `${nr},${nc}`

      if (isWalkable(maze, nr, nc) && !visited.has(nKey)) {
        parentMap.set(nKey, currentKey)
        stack.push({ row: nr, col: nc })
      }
    }
  }

  // No path found
  return []
}
