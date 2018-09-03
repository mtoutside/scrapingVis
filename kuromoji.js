'use strict'
const {dd}= require('dumper.js');
const util = require('util');
// const DIC_URL = "../node_modules/kuromoji/dict/";
const DIC_URL = "./node_modules/kuromoji/dict/";

let kuromoji = require('kuromoji');
let builder = kuromoji.builder({
  dicPath: DIC_URL});
let text = "私は死んだのです";
builder.build((err, tokenizer) => {
  if(err) {
    //console.log(err);
    return;
  }

  let tokens = tokenizer.tokenize(text);
//	console.dir(tokens);
  let result = "";
  for(let item in tokens) {
    //for( let key in tokens[item]) {
      //if(result.length > 1) result += ",";
      result += tokens[item].surface_form;
      //console.dir(result[item]);

    //}
//    console.log(result[item]);
    module.exports = tokenizer;
  }
	    console.log(result);
});
