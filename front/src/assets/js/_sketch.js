
export default function sketch(p) {
  let data;
  let count = 0;

  p.preload = () => {
    let url = 'http://localhost:3000';
    data = p.loadJSON(url);
  }
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.background(360);
    p.cursor(p.CROSS);
    p.frameRate(5);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

  }
  p.draw = () => {
    p.background(360, 0, 100, 10);
    // let str = data[p.int(p.random(Object.keys(data).length))];
    let str = data[count];
    p.textSize(p.random(14, 22));
    p.text(str, p.mouseX, p.mouseY);
    count++;

    if(count >= data.length) count = 0;

  };
}
