/**
 * @file Type Tests - Indices
 * @module vfile-location/types/tests/unit-d/Indices
 */

import type TestSubject from '#types/indices'
import type { Offset } from '@flex-development/unist-util-types'
import type { Point, SerializedPoint } from '@flex-development/vfile-location'

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
