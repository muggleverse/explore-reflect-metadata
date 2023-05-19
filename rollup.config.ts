import { defineConfig } from 'rollup'

import { babel } from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { DEFAULT_EXTENSIONS } from '@babel/core'

import pkg from './package.json' assert { type: 'json' }

// const external = Object.keys(pkg)

const extensions = DEFAULT_EXTENSIONS.concat('.ts', '.tsx')

const config = defineConfig({
  input: 'src/index.ts',

  output: [
    { file: pkg.main, name: pkg.name, format: 'cjs' },
    { file: pkg.module, format: 'esm' },
  ],
  // external,
  plugins: [
    resolve({ extensions }),
    commonjs(),
    // typescript(),
    babel({
      babelHelpers: 'runtime',
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env', { exclude: ['@babel/plugin-transform-typeof-symbol'] }],
      ],
      plugins: [['@babel/plugin-transform-runtime'], ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }]],
      extensions,
    }),
    // terser()
  ],
})

export default config
