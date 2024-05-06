# vfile-location

[![github release](https://img.shields.io/github/v/release/flex-development/vfile-location.svg?include_prereleases&sort=semver)](https://github.com/flex-development/vfile-location/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/vfile-location.svg)](https://npmjs.com/package/@flex-development/vfile-location)
[![codecov](https://codecov.io/gh/flex-development/vfile-location/graph/badge.svg?token=)](https://codecov.io/gh/flex-development/vfile-location)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/vfile-location.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits&logoColor=ffffff)](https://conventionalcommits.org/)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript&logoColor=ffffff)](https://typescriptlang.org/)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat&logo=vitest&logoColor=ffffff)](https://vitest.dev/)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat&logo=yarn&logoColor=ffffff)](https://yarnpkg.com/)

[vfile][vfile] utility to convert between point (line/column) and offset (range) based locations

## Contents

- [What is this?](#what-is-this)
- [When should I use this?](#when-should-i-use-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`Location(file[, start])`](#locationfile-start)
    - [`Location#offset([point])`](#locationoffsetpoint)
    - [`Location#point([offset])`](#locationpointoffset)
  - [`Point`](#point)
- [Types](#types)
- [Contribute](#contribute)

## What is this?

This is a tiny but useful package that facilitates conversions between [points and offsets][point] in a file.

## When should I use this?

This utility is useful when adding [*positional information*][positional information] to [unist][unist] nodes, or when
building packages that require location data, such as a set of lint rules.

## Install

This package is [ESM only][esm].

In Node.js (version 18+) with [yarn][yarn]:

```sh
yarn add @flex-development/vfile-location
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { Location } from 'https://esm.sh/@flex-development/vfile-location'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { Location } from 'https://esm.sh/@flex-development/vfile-location'
</script>
```

## Use

```ts
import { Location, type Point } from '@flex-development/vfile-location'
import { read } from 'to-vfile'
import type * as unist from 'unist'
import type { VFile, Value } from 'vfile'

const point: Point = { column: 1, line: 21, offset: 474 }
const pt: Point = { column: 2, line: 47, offset: 1124 }

const file: VFile = await read('hrt.ts')
const val: Value = String(file).slice(point.offset, pt.offset + 1)

const location: Location = new Location(file)
const loc: Location = new Location(val, point)

console.log(location.offset({ ...point, offset: undefined })) // => point.offset
console.log(location.point(point.offset)) // => point

console.log(loc.offset({ ...pt, offset: undefined })) // => pt.offset
console.log(loc.point(pt.offset)) // => pt
```

## API

This package exports the identifier [`Location`](#locationfile-start). There is no default export.

### `Location(file[, start])`

Create a new location index to translate between point and offset based locations in `file`.

Pass a `start` point to make relative conversions. Any point or offset accessed will be relative to the given point.

- `file` ([`Value`][vfile-value] | [`VFile`][vfile-api]) &mdash; file to index
- `start` ([`Point`](#point) | `null` | `undefined`) &mdash; point before first character in `file`

#### `Location#offset([point])`

Get an offset for `point`.

> 👉 The offset for `point` is greater than or equal to `0` when `point` is valid, and `-1` when `point` is invalid.

##### Parameters

- `point` ([`unist.Point`][point] | `null` | `undefined`) &mdash; place in source file

##### Returns

([`Offset`][offset]) Index of character in source file or `-1`.

#### `Location#point([offset])`

Get a point for `offset`.

> 👉 `point.column` and `point.line` are greater than or equal to `1` when `offset` is valid, and `-1` when `offset` is
> invalid.

##### Parameters

- `offset` ([`Offset`][offset] | `null` | `undefined`) &mdash; index of character in source file

##### Returns

([`Point`](#point)) Place in source file.

### `Point`

One place in a source file (TypeScript interface).

#### Properties

- `column` (`number`) &mdash; column in source file (`1`-indexed integer)
- `line` (`number`) &mdash; line in source file (`1`-indexed integer)
- `offset` ([`Offset`][offset]) &mdash; index of character in source file (`0`-indexed integer)

## Types

This package is fully typed with [TypeScript][typescript].

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[esmsh]: https://esm.sh/
[offset]: https://github.com/flex-development/unist-util-types#offset
[point]: https://github.com/syntax-tree/unist#point
[positional information]: https://github.com/syntax-tree/unist#positional-information
[typescript]: https://www.typescriptlang.org
[unist]: https://github.com/syntax-tree/unist
[vfile]: https://github.com/vfile/vfile
[vfile-api]: https://github.com/vfile/vfile#vfileoptions
[vfile-value]: https://github.com/vfile/vfile#value
[yarn]: https://yarnpkg.com
