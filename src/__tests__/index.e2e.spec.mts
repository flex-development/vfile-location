/**
 * @file E2E Tests - api
 * @module vfile-location/tests/e2e/api
 */

import * as testSubject from '@flex-development/vfile-location'

describe('e2e:vfile-location', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
