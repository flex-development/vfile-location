/**
 * @file Unit Tests - Location
 * @module vfile-location/tests/unit/Location
 */

import type { Point } from '#src/interfaces'
import type { Times } from '@flex-development/tutils'
import type { Offset } from '@flex-development/unist-util-types'
import { read } from 'to-vfile'
import type { VFile } from 'vfile'
import TestSubject from '../location'

describe('unit:Location', () => {
  let fi: string
  let file: VFile
  let length: number
  let points: Times<6, Point>
  let pts: Times<5, Point>
  let start: Point

  beforeAll(async () => {
    file = await read('__fixtures__/hrt.ts')

    points = [
      { column: 1, line: 1, offset: 0 },
      ...(pts = [
        start = { column: 1, line: 21, offset: 474 },
        { column: 13, line: 30, offset: 707 },
        { column: 42, line: 40, offset: 1014 },
        { column: 2, line: 47, offset: 1124 },
        { column: 1, line: 50, offset: length = String(file).length }
      ])
    ]

    fi = String(file).slice(start.offset)
  })

  describe('#offset', () => {
    let subject: TestSubject
    let sub: TestSubject

    beforeAll(() => {
      subject = new TestSubject(file)
      sub = new TestSubject(fi, start)
    })

    it('should return -1 if point.column < 1', () => {
      expect(subject.offset({ column: 0, line: 1 })).to.eq(-1)
    })

    it('should return -1 if point.column is not found', () => {
      expect(subject.offset({ column: 40, line: 2 })).to.eq(-1)
    })

    it('should return -1 if point.line < 1', () => {
      expect(subject.offset({ column: 1, line: 0 })).to.eq(-1)
    })

    it('should return -1 if point.line > total number of lines', () => {
      expect(subject.offset({ column: 1, line: 100 })).to.eq(-1)
    })

    it('should return -1 if point is nil', () => {
      ;[, null].forEach(offset => expect(subject.offset(offset)).to.eq(-1))
    })

    it('should return index of character in source file', () => {
      points.forEach(point => expect(subject.offset(point)).to.eq(point.offset))
    })

    it('should return index of character in source file (relative)', () => {
      pts.forEach(point => expect(sub.offset(point)).to.eq(point.offset))
    })
  })

  describe('#point', () => {
    let subject: TestSubject
    let sub: TestSubject

    beforeAll(() => {
      subject = new TestSubject(file)
      sub = new TestSubject(fi, start)
    })

    it('should return invalid point if offset < 0', () => {
      // Arrange
      const offset: Offset = faker.number.int({
        max: -1,
        min: Number.NEGATIVE_INFINITY
      })

      // Act + Expect
      expect(subject.point(offset)).to.eql({ column: -1, line: -1, offset })
    })

    it('should return invalid point if offset > source file length', () => {
      // Arrange
      const offset: Offset = faker.number.int({ min: length + 1 })

      // Act + Expect
      expect(subject.point(offset)).to.eql({ column: -1, line: -1, offset })
    })

    it('should return invalid point if offset is a float', () => {
      // Arrange
      const offset: Offset = faker.number.float({ max: length, min: 0 })

      // Act + Expect
      expect(subject.point(offset)).to.eql({ column: -1, line: -1, offset })
    })

    it('should return invalid point if offset is nil', () => {
      ;[, null].forEach(offset => {
        expect(subject.point(offset)).to.eql({
          column: -1,
          line: -1,
          offset: -1
        })
      })
    })

    it('should return place in source file', () => {
      points.forEach(point => expect(subject.point(point.offset)).to.eql(point))
    })

    it('should return place in source file (relative)', () => {
      pts.forEach(point => expect(sub.point(point.offset)).to.eql(point))
    })
  })
})
