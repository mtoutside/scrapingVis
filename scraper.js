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

function tokenize(text) {

  let tokens;
  return new Promise((resolve) => {
    builder.build((err, tokenizer) => {
      if(err) {
        console.log(err);
        return;
      }

      let tokens = tokenizer.tokenize(text);

      // console.log(tokens);
      for(let item in tokens) {
        let word = tokens[item].surface_form;
        skiz.push(word);
      }
      resolve(skiz);
      // return skiz;
      // return tokens.map(async (token) => {
      //   return await token.surface_form;
      // });
    });
  });
}

async function go() {
  const html = await getText(URL);
  const wow = await tokenize(html[0]);
  return new Promise((resolve) => {
    resolve(wow);
  });
}


// go();

module.exports = {
  getText,
  tokenize,
  go
}
