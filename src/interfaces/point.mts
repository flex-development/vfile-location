/**
 * @file Interfaces - Point
 * @module vfile-location/interfaces/Point
 */

import type { Column, Line, Offset } from '@flex-development/unist-util-types'

/**
 * One place in a source file.
 */
interface Point {
  /**
   * Column in a source file (`1`-indexed integer).
   *
   * @see {@linkcode Column}
   */
  column: Column

  /**
   * Line in a source file (`1`-indexed integer).
   *
   * @see {@linkcode Line}
   */
  line: Line

  /**
   * Index of character in a source file (`0`-indexed integer).
   *
   * @see {@linkcode Offset}
   */
  offset: Offset
}

export type { Point as default }
