#!/usr/bin/env node

var bump = require('../index');
var file = process.env.PWD + '/package.json';
var release = process.argv[2];
bump(file, release, function (err, stdout, stderr) {
  if (stdout) console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(err.code);
  } else if (err) {
    throw err;
  }
});

