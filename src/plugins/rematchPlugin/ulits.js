// import winPath from 'slash2';
// import { join } from 'path';
// import { existsSync } from 'fs';
const winPath = require('slash2')
const { join }  = require('path')
const { existsSync } = require('fs')
const JS_EXTNAMES = ['.js', '.jsx', '.ts', '.tsx'];

function stripFirstSlash(path) {
  if (path.charAt(0) === '/') {
    return path.slice(1);
  } else {
    return path;
  }
}

 function chunkName(cwd, path) {
  return stripFirstSlash(winPath(path).replace(winPath(cwd), ''))
    .replace(/\//g, '__')
    .replace(/^src__/, '')
    .replace(/^pages__/, 'p__')
    .replace(/^page__/, 'p__');
}

 function optsToArray(item) {
  if (!item) return [];
  if (Array.isArray(item)) {
    return item;
  } else {
    return [item];
  }
}

function endWithSlash(path) {
  return path.slice(-1) !== '/' ? `${path}/` : path;
}

 function findJSFile(baseDir, fileNameWithoutExtname) {
  for (const extname of JS_EXTNAMES) {
    const fileName = `${fileNameWithoutExtname}${extname}`;
    const absFilePath = join(baseDir, fileName);
    if (existsSync(absFilePath)) {
      return absFilePath;
    }
  }
}

module.exports = {
  findJSFile
}
