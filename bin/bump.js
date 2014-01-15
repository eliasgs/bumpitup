#!/usr/bin/env node

var pkg = require(__dirname + '/../package.json');
var bump = require('../index');
var file = process.env.PWD + '/package.json';
var arg = process.argv[2];
if (arg == '--version' || arg == '-v') {
  console.log(pkg.version);
  process.exit(0);
}

bump(file, arg, function (err, stdout, stderr) {
  if (stdout) console.log(stdout);
  if (stderr) {
    console.error(stderr);
    process.exit(err.code);
  } else if (err) {
    throw err;
  }
});

