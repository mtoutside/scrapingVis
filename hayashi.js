'use strict';

let word = '1391';
const { dd } = require('dumper.js');
const client = require('cheerio-httpcli');
const KOKORO_URL ="http://kokoro.squares.net/";
const util = require('util');
let kuromoji = require('kuromoji');
const DIC_URL = "./node_modules/kuromoji/dict/";

client.set('debug', false);

function getPosts() {
  // client.fetch(`${KOKORO_URL}`, { p: word }, function (err, $, res, body) {
  let result = [];
  client.fetch(`http://kokoro.squares.net/?p=7125`, { p: word }, (err, $, res, body) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log($(`#post-${word}`).find('h2').text());
    let maincontent = $(`#post-${word}`).find('p').text();

    let builder = kuromoji.builder({
      dicPath: DIC_URL});
    let text = maincontent;

    builder.build((err, tokenizer) => {
      if(err) {
        console.log(err);
        return;
      }

      let tokens = tokenizer.tokenize(text);
      for(let item in tokens) {
        let word = tokens[item].surface_form;
        result.push(word);
        return result;

        // console.dir(result);
        // module.exports = tokenizer;
      }
    });
  });
}
getPosts();

module.exports = getPosts;
