/**
 * @file Benchmark Tests - Location
 * @module vfile-location/tests/bench/Location
 */

import points from '__fixtures__/underscore-1.5.2.points.json'
import { readSync as read } from 'to-vfile'
import type { VFile } from 'vfile'
import { bench } from 'vitest'
import TestSubject from '../location'

describe('bench:Location', () => {
  const file: VFile = read('__fixtures__/underscore-1.5.2.js')
  const location: TestSubject = new TestSubject(file)

  describe('index file', () => {
    bench('constructor', () => {
      new TestSubject(file)
    })
  })

  describe('offsets', () => {
    bench('#offset', () => {
      for (const point of points) location.offset(point)
    })
  })

  describe('points', () => {
    bench('#point', () => {
      for (const point of points) location.point(point.offset)
    })
  })
})
