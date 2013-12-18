var ver = require('semver');
var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

module.exports = function bump(file, release) {
  var pkg = require(file);
  var version = pkg.version;
  release = release || 'patch';

  pkg.version = ver.inc(version, release);
  if (pkg.version) {
    fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
    console.log('version increased from %s to %s',
                '\u001b[31m' + version + '\u001b[39m', 
                '\u001b[32m' + pkg.version + '\u001b[39m');
    var git = exec('git commit -am "v'+pkg.version+'"',
                   {cwd: path.dirname(file)});
    git.stdout.pipe(process.stdout);
    git.stderr.pipe(process.stderr);
    git.on('exit', function (code) {process.exit(code);});
  } else {
    console.error('could not increase version: %s', pkg.version);
    process.exit(1);
  }
}
