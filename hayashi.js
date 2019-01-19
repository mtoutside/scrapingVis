'use strict';

/**
 * dr.HAYASHI
 *
 * 以下のword変数の内容で検索します
 */
let word = '1391';
const { dd } = require('dumper.js');
const client = require('cheerio-httpcli');
const KOKORO_URL ="http://kokoro.squares.net/";
const util = require('util');
const DIC_URL = "./node_modules/kuromoji/dict/";
// const DIC_URL = "../node_modules/kuromoji/dict/";

// [重要] google検索の場合はfollowMetaRefreshをfalseにする(README.md参照)
// client.set('followMetaRefresh', false);
client.set('debug', true);
// client.fetch(`${KOKORO_URL}`, { p: word }, function (err, $, res, body) {
client.fetch(`http://kokoro.squares.net/?p=7125`, { p: word }, function (err, $, res, body) {
  if (err) {
    console.error(err);
    return;
  }

  // let results = [];
  // 検索結果が個別に格納されている要素をループ
  // $('#rso .g').each(function () {
  //   // 各検索結果のタイトル部分とURL、概要を取得
  //   let $h3 = $(this).find('h3');
  //   let url = $h3.find('a').attr('href');
  //   if (url) {
  //     results.push({
  //       title: $h3.text(),
  //       url: url,
  //       description: $(this).find('.st').text()
  //     });
  //   }
  // });

  console.log($(`#post-${word}`).find('h2').text());
  let maincontent = $(`#post-${word}`).find('p').text();

  // results.push({
  //   main: mainconts
  // })

  // console.log(results);
  // console.info(mainconts);


let kuromoji = require('kuromoji');
let builder = kuromoji.builder({
  dicPath: DIC_URL});
let text = maincontent;

builder.build((err, tokenizer) => {
  if(err) {
    console.log(err);
    return;
  }

  let tokens = tokenizer.tokenize(text);
//	let result = [];

//  for(let item in tokens) {
//    for( let key in tokens[item]) {
//      if(result.length > 0) result += ",";
//      result += tokens[item][key];
//    }
    //console.log(result);
    // module.exports = tokenizer;
//  }
	//console.log(result);
//  dd(result);
//	});
  let result = [];
  for(let item in tokens) {
    //for( let key in tokens[item]) {
      //if(result.length > 1) result += ",";
      //result += tokens[item].surface_form;
      let word = tokens[item].surface_form;
			result.push(word);
      //console.dir(result[item]);

    //}
    // console.dir(result);
    module.exports = tokenizer;
  }
	    console.log(result[9]);
});
});
