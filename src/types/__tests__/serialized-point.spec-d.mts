/**
 * @file Type Tests - SerializedPoint
 * @module vfile-location/types/tests/unit-d/SerializedPoint
 */

import type TestSubject from '#types/serialized-point'
import type { Column, Line } from '@flex-development/unist-util-types'

describe('unit-d:types/SerializedPoint', () => {
  it('should equal `${Line}:${Column}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${Line}:${Column}`>()
  })
})
