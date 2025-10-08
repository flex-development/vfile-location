/**
 * @file eslint
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

import fldv from '@flex-development/eslint-config'

/**
 * eslint configuration.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export default [
  ...fldv.configs.node,
  {
    ignores: ['__fixtures__/underscore-1.5.2.js']
  }
]
