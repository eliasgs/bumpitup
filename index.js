var ver = require('semver');
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function bump(path, release) {
  var pkg = require(path);

  var version = pkg.version;
  pkg.version = ver.inc(version, release);
  if (pkg.version) {
    fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
    console.log('version increased from %s to %s',
                '\u001b[31m' + version + '\u001b[39m', 
                '\u001b[32m' + pkg.version + '\u001b[39m');
    var git = exec('git commit -am "v'+pkg.version+'"');
    git.stdout.pipe(process.stdout);
    git.stderr.pipe(process.stderr);
    git.on('exit', function (code) {process.exit(code);});
  } else {
    console.error('could not increase version: %s', pkg.version);
    process.exit(1);
  }
}
