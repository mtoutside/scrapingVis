import client from 'cheerio-httpcli';
import kuromoji from 'kuromoji';
const DIC_URL = "./node_modules/kuromoji/dict/";
const URL = 'http://kokoro.squares.net/?p=1391';
const builder = kuromoji.builder({ dicPath: DIC_URL });
const list = [];
let sepWordArray = [];

async function getText(html) {
  const result = await client.fetch(html);
  const $ = result.$;
  // const main = $(`#post-1391`).find('p').text();
  list.push( $(`#post-1391`).find('p').text());
  // console.log(main);
  return list;
}

async function tokenize(text) {
  builder.build(async(err, tokenizer) => {
    if(err) {
      console.log(err);
      return;
    }

    let  tokens = tokenizer.tokenize(text);

    sepWordArray = Promise.all(tokens.map((token) => {
      return token.surface_form;
    }));
  });
  return sepWordArray;     
}

async function go() {
  const html = await getText(URL);
  const result = await tokenize(html[0]);
  return await result;
}

module.exports = {
  go
}
