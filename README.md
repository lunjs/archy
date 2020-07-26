# @lunjs/archy

## Installation

```
npm install @lunjs/archy
```

## Usage

```
const archy = require('@lunjs/archy');
const s = archy.draw({
  label : 'beep',
  nodes : [
    'ity',
    {
      label : 'boop',
      nodes : [
        {
          label : 'o_O',
          nodes : [
            {
              label : 'oh',
              nodes : [ 'hello', 'puny' ]
            },
            'human'
          ]
        },
        'party\ntime!'
      ]
    }
  ]
});
console.log(s);
```

## Output

```
beep
├── ity
└─┬ boop
  ├─┬ o_O
  │ ├─┬ oh
  │ │ ├── hello
  │ │ └── puny
  │ └── human
  └── party
      time!
```

## Options

| Key | Value |
| -- | -- |
| style | default is `'NPM'`, support `'NPM'` or `'FMW'` |
| label | default is `'label'`, support function |
| nodes | default is `'nodes'`, support function |
| unicode | default is `true` |
| drawRootBranch | default is `false` |
| prefix | default is `''` |

## Inspired by

- [node-archy](https://github.com/substack/node-archy)

## License

- [lunjs/archy - MIT](https://github.com/lunjs/archy/blob/master/LICENSE)
- [substack/node-archy - MIT](https://github.com/substack/node-archy/blob/master/LICENSE)
