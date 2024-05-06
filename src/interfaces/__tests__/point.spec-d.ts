/**
 * @file Type Tests - Point
 * @module vfile-location/interfaces/tests/unit-d/Point
 */

import type { Offset } from '@flex-development/unist-util-types'
import type * as unist from 'unist'
import type TestSubject from '../point'

describe('unit-d:interfaces/Point', () => {
  it('should extend unist.Point', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<unist.Point>()
  })

  it('should match [offset: Offset]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('offset').toEqualTypeOf<Offset>()
  })
})
