'use strict';

let colors = require('colors');

let EmbedEngine = (require('./index.js')).EmbedEngine;
let engine = new EmbedEngine({
  timeoutMs: 2000,
  referrer: 'www.example.com'
});
engine.registerDefaultProviders();

let logHeader = function(message) {
  console.log('***********************************************');
  console.log(message);
  console.log('***********************************************');
}


let testSync = function (embedURL) {
  let options = {
    embedURL: embedURL
  };
  engine.getEmbed(options, function (embed) {
    let err = embed.error;
    let data = embed.data;

    if (err) {
      console.error(colors.red('Error embedding URL: ' + embedURL));
      console.error(err.stack.red);
      console.error(colors.red('Time: ' + embed.elapsedMs + ' ms'));
      console.error('\n');
      return;
    }

    if (data && data.oembedAPIURL) console.log('oembedAPIURL: ' + data.oembedAPIURL.underline.cyan);
    console.log('embedURL: ' + embedURL.underline.cyan);
    if (data && data.title) console.log('title: ' + data.title.green);
    if (data && data.html) console.log('embed: ' + data.html);
    console.log(colors.red('Time: ' + embed.elapsedMs + ' ms'));
    console.log('\n');
  });
};

let testAsync = function (optsArray) {
  engine.getMultipleEmbeds(optsArray, function (error, results) {
    error = error;
    for (let i = 0; i < results.length; i++) {
      console.log(i + '.)___________________________');
      if (results[i].options && results[i].options.embedURL) {
        console.log('embedURL: ' + results[i].options.embedURL.cyan);
      }
      if (results[i].data.html) {
        console.log('embed HTML: ' + results[i].data.html);
      }
      if (results[i].error) {
        console.log(colors.red(results[i].error.stack));
      }
      console.log('\n\n');
    }
  });
}

let embedURLs = [
  'https://www.instagram.com/p/BCA0qkon9B1/?taken-by=mtv',
  'https://soundcloud.com/newyorker/listen-to-craig-raine-read-bitch',
  'https://www.youtube.com/watch?v=2LO4QL_i8is',
  'https://vimeo.com/156045670',
  'http://soundcloud.com/forss/flickermood',
  'https://www.flickr.com/photos/sas999/25092061391/in/explore-2016-02-22/',
  'http://www.dailymotion.com/video/x3lwpy7_the-worst-car-in-the-history-of-the-world-top-gear-bbc_auto',
  'https://www.facebook.com/facebook/videos/10153231379946729/',
  'https://www.facebook.com/MTV/posts/10153553500401701',
  'https://twitter.com/simpscreens/status/702025133951680512',
  'http://imgur.com/gallery/KSMB2tI',
  'https://play.spotify.com/track/0ivpUENLpheuPoa6VuY1ax',
  'http://mtv.tumblr.com/post/139813756155/kanye-west-taking-a-kanye-rest-so-he-can-do-his',
  'http://www.mtv.com/videos/misc/1246131/down2adopt-molly.jhtml',
  'https://videopress.com/v/kUJmAcSf',
  'http://www.example.com/foo'
/*
'https://www.youtube.com/watch?v=RNC6Jp8EGs0#s=1'
'https://www.youtube.com/watch?v=0iFj0Ius7vo',
'https://www.youtube.com/watch?v=ebJU115CBjk',
'https://www.youtube.com/watch?v=U8_BVEeBLlM',
'https://www.youtube.com/watch?v=_4h41VWPyeo',
'https://www.youtube.com/watch?v=2c1Clvaj5xE',
'https://www.youtube.com/watch?v=2LO4QL_i8is',
'https://www.youtube.com/watch?v=vq2fbgXNRso',
'https://www.youtube.com/watch?v=QQVQAF7_PfY',
'https://www.youtube.com/watch?v=_pdH1x5NTnk',
'https://www.youtube.com/watch?v=1qBrXFmcPxk',
'https://www.youtube.com/watch?v=oRPHnrmvwPs',
'https://www.youtube.com/watch?v=b2dNn0IbzCE',
'https://www.youtube.com/watch?v=2mp4moLle0c',
'https://www.youtube.com/watch?v=BZ60oN3XtKA',
'https://www.youtube.com/watch?v=Zhg4kEctcYM',
'https://www.youtube.com/watch?v=hrwP5TMPEyI'
*/
];

let optsArray = [];

let mode = 'sync';

if (process.argv[2]) {
  mode = process.argv[2];
}

if (mode == 'sync') {
  logHeader(colors.magenta('SYNC MODE'));
} else {
  logHeader(colors.green('ASYNC MODE'));
}

for (let i = 0; i < embedURLs.length; i++) {
  if (mode == 'sync') {
    testSync(embedURLs[i]);
  } else {
    optsArray.push({
      embedURL: embedURLs[i]
    });
  }
}

if (mode != 'sync') {
  testAsync(optsArray);
}


