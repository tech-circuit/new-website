// @ts-check
/* eslint-disable */
const babel = require('@babel/core');
const { expandGroups } = require('twind');
const fs = require('fs');
const path = require('path');

const t = babel.types;

/**
 * @param {string} string
 */
function convertToValidFilename(string) {
  return string.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, '');
}

/**
 * @returns {babel.PluginObj<babel.PluginPass & {twind: {classes: string[], validPath?: string}}>}
 */
function twinPlugin() {
  return {
    name: 'twin-plugin',
    visitor: {
      Program: {
        enter(_, state) {
          const validFileName =
            state.filename && convertToValidFilename(state.filename);
          const validPath =
            validFileName &&
            path.join(process.cwd(), 'twin', 'cache', `${validFileName}.txt`);
          const twind = {
            classes: [],
            validPath,
          };

          state.twind = twind;
        },
        exit(_, state) {
          if (state.twind.validPath) {
            if (state.twind.classes.length > 0) {
              fs.writeFileSync(
                state.twind.validPath,
                state.twind.classes.join(' '),
                'utf8'
              );
            } else {
              fs.unlinkSync(state.twind.validPath);
            }
          }
        },
      },
      JSXAttribute(path, state) {
        if (
          path.node.name.name === 'className' &&
          t.isStringLiteral(path.node.value)
        ) {
          const classes = expandGroups(path.node.value.value);
          // @ts-ignore
          state.twind.classes.push(classes);
          path.node.value.value = classes;
        }
      },
    },
  };
}

module.exports = twinPlugin();
