import P5 from 'p5';
import sketch from './_sketch';

fetch('http://localhost:3000')
// .then(function(response) {
//   return response.json();
// })
// .then(function(myJson) {
//   console.log(JSON.stringify(myJson));
// })
  .then(res => {
    let div = document.createElement('div');
    div.textContent = res.json();
    console.log(res);
    document.body.appendChild(div);
  });

const app = new P5(sketch, document.body);
