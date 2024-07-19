/**
 * @file Type Aliases - SerializedPoint
 * @module vfile-location/types/SerializedPoint
 */

import type { Column, Line } from '@flex-development/unist-util-types'

/**
 * String representing one place in a source file.
 *
 * @see {@linkcode Column}
 * @see {@linkcode Line}
 */
type SerializedPoint = `${Line}:${Column}`

export type { SerializedPoint as default }
