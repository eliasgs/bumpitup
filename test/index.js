var assert = require('assert');
var exec = require('child_process').exec;
var bump = require('../index');

describe('bump', function () {
  var options = {cwd: __dirname};
  var temp = options.cwd + '/temp';
  function success(version, cb) {
    var pkg = require(temp + '/package.json');
    assert.equal(pkg.version, version);
    exec('git log --format=%s -1', {cwd: temp}, function (err, stdout) {
      if (err) throw err;
      assert.equal(stdout.replace('\n', ''), 'v' + version);
      cb()
    });
  }
  beforeEach(function (done) {
    exec('cp -a fixture temp', options, done);
  });
  afterEach(function (done) {
    exec('rm -rf temp', options, done);
  });
  it('should be able to bump prerelease', function (done) {
    bump(temp + '/package.json', 'prerelease', function (err) {
      if (err) throw err;
      success('0.0.0-0', done);
    });
  });
});
