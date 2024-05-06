/**
 * @file E2E Tests - api
 * @module vfile-location/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:vfile-location', () => {
  it('should expose public api', () => {
    expect(testSubject).to.have.keys(['Location'])
  })
})
