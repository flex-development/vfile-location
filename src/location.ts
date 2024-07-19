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
   * Map, where each key/value pair is either the index of a character in the
   * source file ({@linkcode Offset}) and a {@linkcode Point}, or a line and
   * column in the source file and an offset.
   *
   * Both the key and value are relative to {@linkcode start}.
   *
   * @private
   * @readonly
   * @instance
   * @member {Record<Offset, Readonly<Point>> & Record<string, Offset>}
   */
  readonly #indices: Record<Offset, Readonly<Point>> & Record<string, Offset>

  /**
   * Point before first character in file.
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
   * @param {Value | VFile | null | undefined} [file] - File to index
   * @param {Point | null | undefined} [start] - Point before first character
   */
  constructor(
    file?: Value | VFile | null | undefined,
    start?: Point | null | undefined
  ) {
    this.#indices = {}
    this.start = Object.assign({}, start ?? { column: 1, line: 1, offset: 0 })
    this.start = Object.freeze(this.start)

    // index file
    if (file !== null && file !== undefined) {
      /**
       * Iteration point.
       *
       * @const {Point} point
       */
      const point: Point = { ...this.start }

      for (const char of String(file) + '\n') {
        this.#indices[point.offset] = { ...point }
        this.#indices[`${point.line}:${point.column}`] = point.offset

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
   * @param {unist.Point | null | undefined} [point] - Place in file
   * @return {Offset} Index of character in file or `-1`
   */
  public offset(point?: unist.Point | null | undefined): Offset {
    return this.#indices[`${point?.line}:${point?.column}`] ?? -1
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
   * @param {Offset | null | undefined} [offset] - Index of character in file
   * @return {Point} Place in file
   */
  public point(offset?: Offset | null | undefined): Point {
    return this.#indices[offset ?? Number.NaN] ?? {
      column: -1,
      line: -1,
      offset: offset ?? -1
    }
  }
}

export default Location
