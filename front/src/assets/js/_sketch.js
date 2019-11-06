
export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(255);
  };

  p.draw = () => {
    p.background(255);

    let hue = p.map(p.mouseX, 0, p.width, 0, 360);
    p.fill(hue, 80, 80);
    p.ellipse(p.mouseX, p.mouseY, 200, 200);
  };
}
