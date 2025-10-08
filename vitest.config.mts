/**
 * @file Configuration - Vitest
 * @module config/vitest
 * @see https://vitest.dev/config
 */

import Notifier from '#tests/reporters/notifier'
import VerboseReporter from '#tests/reporters/verbose'
import pathe from '@flex-development/pathe'
import { ok } from 'devlop'
import ci from 'is-ci'
import {
  defineConfig,
  type ConfigEnv,
  type ViteUserConfig
} from 'vitest/config'
import type {
  ResolveSnapshotPathHandlerContext,
  TypecheckConfig
} from 'vitest/node'
import pkg from './package.json' with { type: 'json' }
import tsconfig from './tsconfig.json' with { type: 'json' }

export default defineConfig(config)

/**
 * Create a vitest configuration.
 *
 * @see {@linkcode ConfigEnv}
 * @see {@linkcode ViteUserConfig}
 *
 * @this {void}
 *
 * @param {ConfigEnv} env
 *  Configuration environment
 * @return {ViteUserConfig}
 *  Root vitest configuration object
 */
function config(this: void, env: ConfigEnv): ViteUserConfig {
  /**
   * Options used to configure typechecks.
   *
   * @const {Partial<TypecheckConfig>} typecheck
   */
  const typecheck: Partial<TypecheckConfig> = {
    allowJs: false,
    checker: 'tsc',
    enabled: env.mode === 'typecheck',
    ignoreSourceErrors: false,
    include: ['**/__tests__/*.spec-d.mts'],
    only: true,
    tsconfig: 'tsconfig.json'
  }

  return {
    test: {
      allowOnly: !ci,
      chaiConfig: {
        includeStack: true,
        showDiff: true,
        truncateThreshold: 0
      },
      clearMocks: true,
      coverage: {
        all: true,
        clean: true,
        cleanOnRerun: true,
        exclude: [
          '**/*.d.mts',
          '**/__mocks__/',
          '**/__tests__/',
          '**/interfaces/',
          '**/types/',
          '**/index.mts',
          '!src/index.mts'
        ],
        extension: ['.mts'],
        include: ['src'],
        provider: 'v8',
        reportOnFailure: !ci,
        reporter: env.mode === 'reports'
          ? ['text']
          : [ci ? 'lcovonly' : 'html', 'json-summary', 'text'],
        reportsDirectory: './coverage',
        skipFull: false,
        thresholds: { 100: true, perFile: true }
      },
      globalSetup: [],
      globals: true,
      include: ['src/**/__tests__/*.spec.mts'],
      mockReset: true,
      outputFile: {
        blob: pathe.join('.vitest-reports', env.mode + '.blob.json'),
        json: pathe.join('__tests__', 'reports', env.mode + '.json'),
        junit: pathe.join('__tests__', 'reports', env.mode + '.junit.xml')
      },
      passWithNoTests: true,
      projects: [
        {
          extends: true,
          resolve: {
            conditions: [
              'browser',
              ...tsconfig.compilerOptions.customConditions
            ]
          },
          test: {
            env: { VITEST_ENVIRONMENT: 'happy-dom' },
            environment: 'happy-dom',
            environmentOptions: {},
            name: 'browser',
            setupFiles: [],
            typecheck
          }
        },
        {
          extends: true,
          ssr: {
            resolve: { conditions: tsconfig.compilerOptions.customConditions }
          },
          test: {
            env: { VITEST_ENVIRONMENT: 'node' },
            environment: 'node',
            environmentOptions: {},
            name: 'node',
            setupFiles: [],
            typecheck
          }
        }
      ],
      reporters: JSON.parse(process.env['VITEST_UI'] ?? '0')
        ? [new Notifier(), new VerboseReporter()]
        : env.mode === 'reports'
        ? [new VerboseReporter()]
        : [
          ci ? 'github-actions' : new Notifier(),
          'blob',
          'json',
          ['junit', { suiteName: pkg.name }],
          new VerboseReporter()
        ],
      /**
       * Store snapshots next to the directory of `file`.
       *
       * @this {void}
       *
       * @param {string} file
       *  Path to test file
       * @param {string} extension
       *  Snapshot extension
       * @param {ResolveSnapshotPathHandlerContext} context
       *  Snapshot path handler context
       * @return {string}
       *  Custom snapshot path
       */
      resolveSnapshotPath(
        this: void,
        file: string,
        extension: string,
        context: ResolveSnapshotPathHandlerContext
      ): string {
        const { VITEST_ENVIRONMENT: environment } = context.config.env

        ok(typeof environment === 'string', 'expected `VITEST_ENVIRONMENT`')
        ok(environment, 'expected `VITEST_ENVIRONMENT`')

        return pathe.resolve(
          pathe.dirname(pathe.dirname(file)),
          pathe.join('__snapshots__', environment),
          pathe.basename(file).replace(/\.spec.mts/, '') + extension
        )
      },
      restoreMocks: true,
      setupFiles: [],
      snapshotFormat: {
        callToJSON: true,
        min: false,
        printBasicPrototype: false,
        printFunctionName: true
      },
      snapshotSerializers: [],
      unstubEnvs: true,
      unstubGlobals: true
    }
  }
}
