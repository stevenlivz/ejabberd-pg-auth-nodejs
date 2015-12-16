#!/usr/bin/env node

//
// NodeJS/Postgres eJabberd authentication daemon for eJabberd.
//

'use strict';

var pg   = require('pg'),
    assert = require('assert'),
    auth   = require('./auth');

/* This is where the authentication kicks off. */
function start(conf) {

    var conString = "postgres://postgres:@"
        + conf.get('host')
        + ":"
        + conf.get('port')
        + "/"
        + conf.get('database');


    // performs the authentication
    var authenticator = new auth.Authenticator();

    // raised when ejabberd raises an error
    authenticator.on('error', function(err) {
            console.error("Authenticator error: " + err);
    });

    // raised when ej auth is ending
    authenticator.on('end', function() {
            console.warn("Stopping authenticator.");
    });

    // raised when an authentication is requested
    authenticator.on('auth', function(user, hostIgnored, password) {

        console.warn('Authentication Requested');

        pg.connect(conString, function(err, client, done) {

          if(err) {
            return console.error('error fetching client from pool', err);
          }

          client.query('SELECT username FROM users WHERE username=$1 AND password=$2', [user, password],
            function(err, result) {

              //call `done()` to release the client back to the pool
              done();

              if(err) {
                return console.error('error running query', err);
              }

              // make sure we got a match
              if (result.rows.length > 0) {
                // send back true
                authenticator.channel.answer(!err);
              } else {
                authenticator.channel.answer(false);
              }
            });
        });
    });
}

module.exports = {
    start: start
};

