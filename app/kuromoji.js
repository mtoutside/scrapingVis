'use strict'
const util = require('util');
// const DIC_URL = "../node_modules/kuromoji/dict/";
const DIC_URL = "./node_modules/kuromoji/dict/";

let kuromoji = require('kuromoji');
let builder = kuromoji.builder({
  dicPath: DIC_URL});
let text = "私は死んだ";
builder.build((err, tokenizer) => {
  if(err) {
    console.log(err);
    return;
  }

  let tokens = tokenizer.tokenize(text);

  for(let item in tokens) {
    let result = "";
    for( let key in tokens[item]) {
      if(result.length > 0) result += ",";
      result += tokens[item][key];
    }
    console.log(result);
    module.exports = tokenizer;
  }
});