/**
 * @file location
 * @module vfile-location/location
 */

import type { Offset } from '@flex-development/unist-util-types'
import type * as unist from 'unist'
import type { VFile, Value } from 'vfile'
import type { Point } from './interfaces'

/**
 * Location index.
 *
 * Facilitates conversions between point and offset based locations.
 *
 * @class
 */
class Location {
  /**
   * List, where each index is the original index of a character in the source
   * file, and each item is a {@linkcode Point} relative to {@linkcode start}.
   *
   * @private
   * @readonly
   * @instance
   * @member {Readonly<Point>[]}
   */
  readonly #indices: Readonly<Point>[]

  /**
   * Point before first character in source file.
   *
   * @see {@linkcode Point}
   *
   * @public
   * @readonly
   * @instance
   * @member {Readonly<Point>} start
   */
  public readonly start: Readonly<Point>

  /**
   * Create a new location index to translate between point and offset based
   * locations in `file`.
   *
   * Pass a `start` point to make relative conversions. Any point or offset
   * accessed will be relative to the given point.
   *
   * @see {@linkcode Point}
   * @see {@linkcode VFile}
   * @see {@linkcode Value}
   *
   * @param {Value | VFile} file - File to index
   * @param {(Point | null)?} [start] - Point before first character in `file`
   */
  constructor(file: Value | VFile, start?: Point | null) {
    this.#indices = []
    this.start = Object.assign({}, start ?? { column: 1, line: 1, offset: 0 })
    this.start = Object.freeze(this.start)

    /**
     * Iteration point.
     *
     * @const {Point} point
     */
    const point: Point = { ...this.start }

    // index file
    for (const char of String(file) + '\n') {
      this.#indices.push(Object.freeze({ ...point }))

      // advance point
      if (/[\n\r]/.test(char)) {
        point.column = 1
        point.line++
        point.offset++
      } else {
        point.column++
        point.offset++
      }
    }
  }

  /**
   * Get an offset for `point`.
   *
   * > 👉 The offset for `point` is greater than or equal to `0` when `point` is
   * > valid, and `-1` when `point` is invalid.
   *
   * @see {@linkcode Offset}
   * @see {@linkcode unist.Point}
   *
   * @public
   * @instance
   *
   * @param {(unist.Point | null)?} [point] - Place in source file
   * @return {Offset} Index of character in source file or `-1`
   */
  public offset(point?: unist.Point | null): Offset {
    return this.#indices.find(pt => {
      return !!point && pt.line === point.line && pt.column === point.column
    })?.offset ?? -1
  }

  /**
   * Get a point for `offset`.
   *
   * > 👉 `point.column` and `point.line` are greater than or equal to `1` when
   * > `offset` is valid, and `-1` when `offset` is invalid.
   *
   * @see {@linkcode Offset}
   * @see {@linkcode Point}
   *
   * @public
   * @instance
   *
   * @param {(Offset | null)?} [offset] - Index of character in source file
   * @return {Point} Place in source file
   */
  public point(offset?: Offset | null): Point {
    return this.#indices.find(pt => pt.offset === offset) ?? {
      column: -1,
      line: -1,
      offset: offset ?? -1
    }
  }
}

export default Location
