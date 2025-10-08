/**
 * @file Type Tests - Point
 * @module vfile-location/interfaces/tests/unit-d/Point
 */

import type TestSubject from '#interfaces/point'
import type { Column, Line, Offset } from '@flex-development/unist-util-types'
import type * as unist from 'unist'

describe('unit-d:interfaces/Point', () => {
  it('should match [column: Column]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('column').toEqualTypeOf<Column>()
  })

  it('should match [line: Line]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('line').toEqualTypeOf<Line>()
  })

  it('should match [offset: Offset]', () => {
    expectTypeOf<TestSubject>().toHaveProperty('offset').toEqualTypeOf<Offset>()
  })

  it('should match unist.Point', () => {
    expectTypeOf<TestSubject>().toMatchTypeOf<unist.Point>()
  })
})
