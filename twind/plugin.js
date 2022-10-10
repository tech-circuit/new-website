// @ts-check
/* eslint-disable */
const babel = require('@babel/core');
const { expandGroups } = require('twind');
const fs = require('fs');
const path = require('path');

const t = babel.types;

const twinCachePath = path.join(process.cwd(), 'twin', 'cache.txt');

/**
 * @returns {babel.PluginObj<babel.PluginPass & {twind: {classes: string, }}>}
 */
function twinPlugin() {
  return {
    name: 'twin-plugin',
    visitor: {
      Program: {
        enter(_, state) {
          const twind = {
            classes: '',
          };

          state.twind = twind;
        },
        exit(_, state) {
          if (state.twind.classes.length > 0) {
            fs.appendFileSync(twinCachePath, state.twind.classes, 'utf8');
          }
        },
      },
      TaggedTemplateExpression(path, state) {
        if (t.isIdentifier(path.node.tag) && path.node.tag.name === 'tw') {
          const classes = expandGroups(
            path.node.quasi.quasis.map(q => q.value.raw).join(' ')
          );
          state.twind.classes += classes;
          state.twind.classes += ' ';
          path.replaceWith(t.stringLiteral(classes));
        }
      },
    },
  };
}

if (fs.existsSync(twinCachePath)) {
  fs.unlinkSync(twinCachePath);
}

module.exports = twinPlugin;
