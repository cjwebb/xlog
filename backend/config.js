"use strict"

var config = require('12factor-config');

module.exports = config({
  authId: {
    env: 'XLOG_CLIENT_ID',
    type: 'string',
    required: true
  },
  authSecret: {
    env: 'XLOG_CLIENT_SECRET',
    type: 'string',
    required: true
  },
  authDomain: {
    env: 'XLOG_AUTH0_DOMAIN',
    type: 'string',
    required: true
  }
});

