'use strict';

/** @ignore */
let OEmbedProvider = require('../OEmbedProvider');

/**
  MyMail embed provider
  @see
*/
class MyMail extends OEmbedProvider {}

MyMail.prototype.name = 'mymail';
MyMail.prototype.providerURL = 'http://open.iframe.ly/api/oembed/';
MyMail.prototype.urlPatterns = [
  '^https://my.mail.ru/mail/[^/]+/video/[^/]+/.*'
];
MyMail.prototype.format = 'json';
MyMail.prototype.defaultProviderQueryStringParameters = {origin:"preview"};

module.exports = MyMail;
