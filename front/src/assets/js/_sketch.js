
export default function sketch(p) {
  let url = 'http://localhost:3000';
  let data;
  let count = 0;
  let posX = 10;
  let posY = 0;
  let textLength;
  let num = 20;
  let thr = 1;
  let fibo = [];
  const SGN = [1, 1, -1, -1];

  p.preload = () => {
    data = p.loadJSON('./assets/data.json');
  }
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.background(360);
    // p.generateFibo(p.random(5, num));
    // p.divSquare(0, 0, 0, 0, 1, 1);
    p.cursor(p.CROSS);
    p.frameRate(1);
    textLength = Object.keys(data).length;
    posY = 20;
    p.drawText();
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    // p.divSquare(0, 0, 0, 0, 1, 1);

  }
  p.draw = () => {
    p.background(360, 0, 100, 10);
    // let str = data[p.int(p.random(Object.keys(data).length))];
    // p.separateGrid(0, 0, p.width);
    let str = data[count];
    // p.textSize(p.random(14, 22));
    count++;


    if(count >= textLength) count = 0;

  };

  p.drawText = () => {
    for(let i = 0; i < textLength; i++) {
      p.text(data[i], posX, posY);

      posX += p.textWidth(data[i]);
      if (posX >= p.width - 200) {
        posY += 30;
        posX = 20;
      }
    }
  }

  p.separateGrid = (x, y, d) => {
    let sepNum = p.int(p.random(1, 4));
    let w = d / sepNum;

    for(let i = x; i < x + d - 1; i += w) {
      for(let j = y; j < y + d - 1; j += w) {
        if(p.random(100) < 90 && d > p.width / 5) {
          p.separateGrid(i, j, w);
        } else {
          p.textSize(w);
          p.textAlign(p.CENTER, p.CENTER);
          let str = data[count];
          p.text(str, i + w / 2, j + w / 2 + w / 8);
        }
      }
    }
  }


  p.generateFibo = (index) => {
    fibo = [0, 1];
    console.log(fibo);
    for(let i = 1; i < index; i++) {
      fibo = p.append(fibo, fibo[i - 1] + fibo[i]);
    }
    fibo = p.reverse(fibo);
  }

  /**
   * divSquare
   * 正方形の位置(xPos, yPos)，フィボナッチ数列の項数index，
   * 関数の繰り返し回数itr，正方形の描画に関する符号(sgnX,sgnY)を引数とする分割
   *
   * @param xPos 正方形の位置x
   * @param yPos 正方形の位置y
   * @param index フィボナッチ数列の項数
   * @param itr 繰り返し回数
   * @param sgnX
   * @param sgnY
   * @returns void
   */
  p.divSquare = (xPos, yPos, index, itr, sgnX, sgnY) => {
    for(let i = 0; i < num - index; i++) {
      let lng0 = fibo[i + index + 1];
      let lng1 = fibo[i + index];
      let newSgnX = sgnX * SGN[i % 4];
      let newSgnY = sgnY * SGN[(i + 1) % 4];
      p.colRect(xPos, yPos, newSgnX * lng0, newSgnY * lng1, index + i + 1);

      xPos += newSgnX * lng0;
      yPos += newSgnY * lng1;
      if(itr < thr) {
        p.divRect(xPos, yPos, i + index + 1, itr + 1, -newSgnX, -newSgnY);
      }
    }
  }

  p.divRect = (xPos, yPos, index, itr, sgnX, sgnY) => {
    for(let i = 0; i < num - index; i++) {
      let lng = fibo[i + index];
      let newSgnX = sgnX * SGN[(i + 1) % 4];
      let newSgnY = sgnY * SGN[i % 4];
      p.colRect(xPos, yPos, newSgnX * lng, newSgnY * lng, index + i);
      xPos += newSgnX * lng;
      yPos += newSgnY * lng;
      if(itr < thr) {
        p.divSquare(xPos, yPos, index + i, itr + 1, -newSgnX, -newSgnY);
      }
    }
  }

  /**
   * colRect
   *
   * @param xPos x位置
   * @param yPos y位置
   * @param wd 横幅
   * @param ht 高さ
   * @param index 項目に対する色
   * @returns void
   */
  p.colRect = (xPos, yPos, wd, ht, index) => {
    let scalar = p.width / fibo[0];
    let str = data[index];
    // p.fill((index * 1 / num) % 1, 100, 100);
      // str = data[i];
      // p.rect(scalar * xPos, scalar * yPos, scalar * wd, scalar * ht);
      p.textAlign(p.CENTER, p.CENTER);
    for(let i = 0; i < 200; i++) {
      str = data[i];
      p.text(str, scalar * xPos * p.random(wd) * i * 0.01, scalar * yPos *  p.random(ht) * i * 0.1);
    }
  }

  p.mouseReleased = () => {
    count = 0;
    // p.generateFibo(p.random(num));
    // p.divSquare(0, 0, 0, 0, 1, 1);
    posY = 0;
    p.drawText();
  }

  p.keyPressed = () => {
    if(p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE) p.background(255);
  }
}
