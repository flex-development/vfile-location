/**
 * @file Type Aliases - Indices
 * @module vfile-location/types/Indices
 */

import type { Point } from '#src/interfaces'
import type { Offset } from '@flex-development/unist-util-types'
import type SerializedPoint from './serialized-point'

/**
 * Map, where each key/value pair is either the index of a character in a
 * source file ({@linkcode Offset}) and a {@linkcode Point}, or a line and
 * column in the source file and an offset.
 */
type Indices = { [offset: Offset]: Point; [point: SerializedPoint]: Offset }

export type { Indices as default }
