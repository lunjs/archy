const assert = require('assert');
const archy = require('./');

async function test(name, fn) {
  try {
    await fn();
    console.log('\x1b[32m%s\x1b[0m \x1b[33mOK\x1b[0m', name);
  } catch(e) {
    console.log('\x1b[31m%s\x1b[0m', name, e);
  }
}

const beepNode = {
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
        'party!'
      ]
    }
  ]
};

const multiLineBeepNode = {
  label : 'beep\none\ntwo',
  nodes : [
    'ity',
    {
      label : 'boop',
      nodes : [
        {
          label : 'o_O\nwheee',
          nodes : [
            {
              label : 'oh',
              nodes : [ 'hello', 'puny\nmeat' ]
            },
            'creature'
          ]
        },
        'party\ntime!'
      ]
    }
  ]
};

test('[NPM style] beep', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.NPM });
  assert.strictEqual(s, [
    'beep',
    '├── ity',
    '└─┬ boop',
    '  ├─┬ o_O',
    '  │ ├─┬ oh',
    '  │ │ ├── hello',
    '  │ │ └── puny',
    '  │ └── human',
    '  └── party!',
    ''
  ].join('\n'));
});

test('[NPM style] multi-line', () => {
  const s = archy.draw(multiLineBeepNode, { style: archy.STYLE.NPM });
  assert.strictEqual(s, [
      'beep',
      '│ one',
      '│ two',
      '├── ity',
      '└─┬ boop',
      '  ├─┬ o_O',
      '  │ │ wheee',
      '  │ ├─┬ oh',
      '  │ │ ├── hello',
      '  │ │ └── puny',
      '  │ │     meat',
      '  │ └── creature',
      '  └── party',
      '      time!',
      ''
  ].join('\n'));
});

test('[NPM style] non-unicode', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.NPM, unicode : false });
  assert.strictEqual(s, [
      'beep',
      '+-- ity',
      '`-- boop',
      '  +-- o_O',
      '  | +-- oh',
      '  | | +-- hello',
      '  | | `-- puny',
      '  | `-- human',
      '  `-- party!',
      ''
  ].join('\n'));
});

test('[NPM style] drawRootBranch', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.NPM, drawRootBranch: true });
  assert.strictEqual(s, [
    '└─┬ beep',
    '  ├── ity',
    '  └─┬ boop',
    '    ├─┬ o_O',
    '    │ ├─┬ oh',
    '    │ │ ├── hello',
    '    │ │ └── puny',
    '    │ └── human',
    '    └── party!',
    ''
  ].join('\n'));
});

test('[NPM style] async', async () => {
  const options = {
    style: archy.STYLE.NPM,
    async label(node) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (typeof node === 'string') {
        return node;
      } else {
        return node.label;
      }
    },
    async nodes(node) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return node.nodes;
    }
  };
  const s = await archy.drawAsync(beepNode, options);
  assert.strictEqual(s, [
    'beep',
    '├── ity',
    '└─┬ boop',
    '  ├─┬ o_O',
    '  │ ├─┬ oh',
    '  │ │ ├── hello',
    '  │ │ └── puny',
    '  │ └── human',
    '  └── party!',
    ''
  ].join('\n'));
});

test('[FMW style] beep', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.FMW });
  assert.strictEqual(s, [
    'beep',
    '├── ity',
    '└── boop',
    '    ├── o_O',
    '    │   ├── oh',
    '    │   │   ├── hello',
    '    │   │   └── puny',
    '    │   └── human',
    '    └── party!',
    ''
  ].join('\n'));
});

test('[FMW style] multi-line', () => {
  const s = archy.draw(multiLineBeepNode, { style: archy.STYLE.FMW });
  assert.strictEqual(s, [
      'beep',
      'one',
      'two',
      '├── ity',
      '└── boop',
      '    ├── o_O',
      '    │   wheee',
      '    │   ├── oh',
      '    │   │   ├── hello',
      '    │   │   └── puny',
      '    │   │       meat',
      '    │   └── creature',
      '    └── party',
      '        time!',
      ''
  ].join('\n'));
});

test('[FMW style] non-unicode', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.FMW, unicode : false });
  assert.strictEqual(s, [
      'beep',
      '+-- ity',
      '`-- boop',
      '    +-- o_O',
      '    |   +-- oh',
      '    |   |   +-- hello',
      '    |   |   `-- puny',
      '    |   `-- human',
      '    `-- party!',
      ''
  ].join('\n'));
});

test('[FMW style] drawRootBranch', () => {
  const s = archy.draw(beepNode, { style: archy.STYLE.FMW, drawRootBranch: true });
  assert.strictEqual(s, [
    '└── beep',
    '    ├── ity',
    '    └── boop',
    '        ├── o_O',
    '        │   ├── oh',
    '        │   │   ├── hello',
    '        │   │   └── puny',
    '        │   └── human',
    '        └── party!',
    ''
  ].join('\n'));
});

test('[FMW style] async', async () => {
  const options = {
    style: archy.STYLE.FMW,
    async label(node) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (typeof node === 'string') {
        return node;
      } else {
        return node.label;
      }
    },
    async nodes(node) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return node.nodes;
    }
  };
  const s = await archy.drawAsync(beepNode, options);
  assert.strictEqual(s, [
    'beep',
    '├── ity',
    '└── boop',
    '    ├── o_O',
    '    │   ├── oh',
    '    │   │   ├── hello',
    '    │   │   └── puny',
    '    │   └── human',
    '    └── party!',
    ''
  ].join('\n'));
});
