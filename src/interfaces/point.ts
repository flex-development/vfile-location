/**
 * @file Interfaces - Point
 * @module vfile-location/interfaces/Point
 */

import type { Offset } from '@flex-development/unist-util-types'
import type * as unist from 'unist'

/**
 * One place in a source file.
 *
 * @see {@linkcode unist.Point}
 *
 * @extends {unist.Point}
 */
interface Point extends unist.Point {
  /**
   * Index of character in a source file (`0`-indexed integer).
   *
   * @see {@linkcode Offset}
   */
  offset: Offset
}

export type { Point as default }
