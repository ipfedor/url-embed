'use strict';

/** @ignore */
let OEmbedProvider = require('../OEmbedProvider');

/**
  Coub embed provider
  @see https://coub.com/dev/docs/Player+API%2FoEmbed+protocol
*/
class Coub extends OEmbedProvider {}

Coub.prototype.name = 'coub';
Coub.prototype.providerURL = 'http://coub.com/api/oembed.json';
Coub.prototype.urlPatterns = ['^https?://coub.com/view/.*'];
Coub.prototype.format = 'json';
module.exports = Coub;
