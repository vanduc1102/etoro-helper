'use strict';

var fs = require('fs');
var archiver = require('archiver');
const del = require('del');
const manifest = require('../src/manifest.json');

del.sync(['dist']);

var version = manifest.name.replace(' ', '-').toLowerCase() + '-v' + manifest.version + '.zip';
var distPath = './dist/';
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}
var releasePath = distPath + version;
var output = fs.createWriteStream(releasePath, { flag: 'w' });

var archive = archiver('zip');

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('Released file : ' + releasePath);
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('src/');
archive.finalize();
