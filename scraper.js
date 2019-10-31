import axios from 'axios';
import cheerio from 'cheerio';
import client from 'cheerio-httpcli';
import kuromoji from 'kuromoji';
const DIC_URL = "./node_modules/kuromoji/dict/";
const URL = 'http://kokoro.squares.net/?p=1391';
const builder = kuromoji.builder({ dicPath: DIC_URL });
const list = [];
const skiz = [];

async function getHTML(url) {
  // const { data: html } = await axios.get(url);
  const { data: html } = await client.fetch(url);
  return html;
}

async function getText(html) {
  // const $ = cheerio.load(html);
  // const p = $('#post-1391');
  // console.log(p.html());

  const result = await client.fetch(html);
  const $ = result.$;

    // const main = $(`#post-1391`).find('p').text();
    list.push( $(`#post-1391`).find('p').text());
    // console.log(main);
  return list;
}

async function tokenize(text) {

  await builder.build(async (err, tokenizer) => {
    if(err) {
      console.log(err);
      return;
    }

    let tokens = await tokenizer.tokenize(text);
    // for(let item in tokens) {
    //   let word = tokens[item].surface_form;
    //   skiz.push(word);
    // }
    skiz.push(tokens);
    return skiz;
    // return tokens.map(async (token) => {
    //   return await token.surface_form;
    // });
  });
}

async function go() {
  const html = await getText(URL);
  // const wow = await tokenize(html[0]);
  const wow = await tokenize('私はおいしくいただきました。');
  // getText(await getHTML(URL));
  // const ddd = await getText(URL);
  console.log(wow);
}


go();
