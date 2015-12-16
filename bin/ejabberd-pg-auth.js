#!/usr/bin/env node

//
// NodeJS/Postgres eJabberd authentication daemon for eJabberd.
//

'use strict';

var path = require('path');
var auth = require('../lib/auth-pg.js');
var etc = require('etc')();
var conf = etc.file(path.join(__dirname,'../','config.json'));

auth.start(conf);
