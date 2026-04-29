import { describe, it, expect } from 'vitest'
import {
  createEmptyMaze,
  generateMazeRecursiveBacktrack,
  generateMazePrim,
} from '../mazeAlgorithms'
import { solveBFS, solveDFS } from '../mazeSolvers'
import type { MazeGrid, MazeStep } from '@/types'

/** Run a generator to completion, collecting yielded steps and the return value. */
function runGenerator<Y, R>(gen: Generator<Y, R>): { steps: Y[]; result: R } {
  const steps: Y[] = []
  let next = gen.next()
  while (!next.done) {
    steps.push(next.value as Y)
    next = gen.next()
  }
  return { steps, result: next.value as R }
}

describe('createEmptyMaze', () => {
  it('creates a grid of the correct size filled with walls', () => {
    const maze = createEmptyMaze(7, 9)
    expect(maze.rows).toBe(7)
    expect(maze.cols).toBe(9)
    expect(maze.cells.length).toBe(7)
    expect(maze.cells[0].length).toBe(9)
    for (const row of maze.cells) {
      for (const cell of row) {
        expect(cell).toBe('wall')
      }
    }
  })
})

describe('generateMazeRecursiveBacktrack', () => {
  it('generates a maze with correct dimensions', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(7, 9))
    expect(maze.rows).toBe(7)
    expect(maze.cols).toBe(9)
  })

  it('has exactly one start and one end', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(11, 11))
    let starts = 0
    let ends = 0
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.cols; c++) {
        if (maze.cells[r][c] === 'start') starts++
        if (maze.cells[r][c] === 'end') ends++
      }
    }
    expect(starts).toBe(1)
    expect(ends).toBe(1)
  })

  it('places start at (1,1) and end at (rows-2, cols-2)', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(11, 11))
    expect(maze.cells[1][1]).toBe('start')
    expect(maze.cells[maze.rows - 2][maze.cols - 2]).toBe('end')
  })

  it('ensures even dimensions are adjusted to odd', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(10, 12))
    expect(maze.rows % 2).toBe(1)
    expect(maze.cols % 2).toBe(1)
  })

  it('yields MazeStep objects during generation', () => {
    const { steps } = runGenerator(generateMazeRecursiveBacktrack(7, 7))
    expect(steps.length).toBeGreaterThan(0)
    for (const step of steps) {
      expect(step).toHaveProperty('row')
      expect(step).toHaveProperty('col')
      expect(step).toHaveProperty('type')
    }
  })
})

describe('generateMazePrim', () => {
  it('generates a maze with correct dimensions', () => {
    const { result: maze } = runGenerator(generateMazePrim(7, 9))
    expect(maze.rows).toBe(7)
    expect(maze.cols).toBe(9)
  })

  it('has exactly one start and one end', () => {
    const { result: maze } = runGenerator(generateMazePrim(11, 11))
    let starts = 0
    let ends = 0
    for (let r = 0; r < maze.rows; r++) {
      for (let c = 0; c < maze.cols; c++) {
        if (maze.cells[r][c] === 'start') starts++
        if (maze.cells[r][c] === 'end') ends++
      }
    }
    expect(starts).toBe(1)
    expect(ends).toBe(1)
  })

  it('places start at (1,1) and end at (rows-2, cols-2)', () => {
    const { result: maze } = runGenerator(generateMazePrim(11, 11))
    expect(maze.cells[1][1]).toBe('start')
    expect(maze.cells[maze.rows - 2][maze.cols - 2]).toBe('end')
  })
})

describe('solveBFS', () => {
  it('finds a path from start to end in a generated maze', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(11, 11))
    const { result: path } = runGenerator(solveBFS(maze))
    expect(path.length).toBeGreaterThan(0)
    expect(path[0].row).toBe(1)
    expect(path[0].col).toBe(1)
    expect(path[path.length - 1].row).toBe(maze.rows - 2)
    expect(path[path.length - 1].col).toBe(maze.cols - 2)
  })

  it('returns a path with no duplicate cells', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(11, 11))
    const { result: path } = runGenerator(solveBFS(maze))
    const keys = path.map((s) => `${s.row},${s.col}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('returns a path where each step is adjacent', () => {
    const { result: maze } = runGenerator(generateMazeRecursiveBacktrack(11, 11))
    const { result: path } = runGenerator(solveBFS(maze))
    for (let i = 1; i < path.length; i++) {
      const dr = Math.abs(path[i].row - path[i - 1].row)
      const dc = Math.abs(path[i].col - path[i - 1].col)
      expect(dr + dc).toBe(1)
    }
  })

  it('returns empty path for maze with no start or end', () => {
    const maze = createEmptyMaze(5, 5)
    const { result: path } = runGenerator(solveBFS(maze))
    expect(path).toEqual([])
  })
})

describe('solveDFS', () => {
  it('finds a path from start to end in a generated maze', () => {
    const { result: maze } = runGenerator(generateMazePrim(11, 11))
    const { result: path } = runGenerator(solveDFS(maze))
    expect(path.length).toBeGreaterThan(0)
    expect(path[0].row).toBe(1)
    expect(path[0].col).toBe(1)
    expect(path[path.length - 1].row).toBe(maze.rows - 2)
    expect(path[path.length - 1].col).toBe(maze.cols - 2)
  })

  it('returns a path with no duplicate cells', () => {
    const { result: maze } = runGenerator(generateMazePrim(11, 11))
    const { result: path } = runGenerator(solveDFS(maze))
    const keys = path.map((s) => `${s.row},${s.col}`)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('returns a path where each step is adjacent', () => {
    const { result: maze } = runGenerator(generateMazePrim(11, 11))
    const { result: path } = runGenerator(solveDFS(maze))
    for (let i = 1; i < path.length; i++) {
      const dr = Math.abs(path[i].row - path[i - 1].row)
      const dc = Math.abs(path[i].col - path[i - 1].col)
      expect(dr + dc).toBe(1)
    }
  })

  it('returns empty path for maze with no start or end', () => {
    const maze = createEmptyMaze(5, 5)
    const { result: path } = runGenerator(solveDFS(maze))
    expect(path).toEqual([])
  })
})
