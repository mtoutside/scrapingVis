'use strict';

let word = '1391';
const { dd } = require('dumper.js');
const client = require('cheerio-httpcli');
const KOKORO_URL ="http://kokoro.squares.net/";
const util = require('uil');
let kuromoji = require('kuromoji');
const DIC_URL = "./node_modules/kuromoji/dict/";
let result = [];
let skiz = [];
let main;

client.set('debug', false);

async  function fetchPosts() {
  const p =  await client.fetch(`${KOKORO_URL}?p=${word}`);
  const $ = p.$;
  main = $(`#post-${word}`).find('p').text();
  result.push(main);
  return result;
}

async function tokenize(text) {
  let builder = kuromoji.builder({
    dicPath: DIC_URL});

  builder.build(async (err, tokenizer) => {
    if(err) {
      console.log(err);
      return;
    }

    let tokens = await tokenizer.tokenize(text);
    for(let item in tokens) {
      let word = tokens[item].surface_form;
      skiz.push(word);
      return skiz;
    }
  });
}

let hoge = fetchPosts();
console.log(fetchPosts());

// module.exports = getPosts;
