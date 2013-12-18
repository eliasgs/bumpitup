# bumpitup

Increase your version in ``package.json`` and create a new commit with the
bumped version number as commit message.

## Install

You probably just want to install as a global package.
```bash
npm install -g bumpitup
```

## Usage

The executable is named ``bump`` and takes a release type (``prerelease``,
``patch``, ``minor`` or ``major``) as the first argument (defaults to
``patch``).

```bash
bump patch
```

