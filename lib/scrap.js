const request = require('request');
const cheerio = require('cheerio');

module.exports = function scrap (options, callback) {
  var opts = {};

  if (typeof options === 'string')
    opts['url'] = options; //options is really a url string
  else
    opts = options;

  request(opts, (err, resp, body) => {
    if (err) return callback(err, null, 0, null, null)
    if (!resp) return callback(new Error('No error and no response.'), null, 0, null, null)
    if (resp.statusCode !== 200) return callback(new Error('HTTP response code is not 200.'), cheerio.load(body), resp.statusCode, body, resp)

    if (opts.preParse) {
      opts.preParse(body, (newBody) => {
        parseBody(newBody, resp, callback)
      })
    } else {
      parseBody(body, resp, callback)
    }
  })
}

function parseBody(body, resp, callback) {
  let error = null;
  let $ = null;

  try {
    $ = cheerio.load(body);
  } catch (e) {
    error = new Error('Body parsing error: ' + e.message);
  }
  callback(error, body);
}