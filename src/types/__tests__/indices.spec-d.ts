/**
 * @file Type Tests - Indices
 * @module vfile-location/types/tests/unit-d/Indices
 */

import type { Point } from '#src/interfaces'
import type { Offset } from '@flex-development/unist-util-types'
import type TestSubject from '../indices'
import type SerializedPoint from '../serialized-point'

describe('unit-d:types/Indices', () => {
  it('should match [[offset: Offset]: Point]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty<Offset>(0)
      .toEqualTypeOf<Point>()
  })

  it('should match [[point: SerializedPoint]: Offset]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty<SerializedPoint>('1:1')
      .toEqualTypeOf<Offset>()
  })
})
