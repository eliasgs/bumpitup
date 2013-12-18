#!/usr/bin/env node

var bump = require('../index');
bump(process.env.PWD + '/package.json', process.argv[2]);

