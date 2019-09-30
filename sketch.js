import canvasSketch from "canvas-sketch";
import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";
import palettes from "nice-color-palettes";

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  // random.setSeed("uniq_id");
  const palette = random.pick(palettes);
  console.log(palette);

  const createGrid = () => {
    const points = [];
    const size = 20;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const u = size <= 1 ? 0.5 : x / (size - 1);
        const v = size <= 1 ? 0.5 : y / (size - 1);

        const radius = Math.abs(random.noise2D(u, v) * 0.2);

        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u, v]
        });
      }
    }

    return points;
  };

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const canvasMargin = 400;

    points.forEach(({ position, radius, color, rotation }) => {
      context.beginPath();
      const [u, v] = position;

      const x = lerp(canvasMargin, width - canvasMargin, u);
      const y = lerp(canvasMargin, height - canvasMargin, v);

      // context.fillStyle = color;
      // context.lineWidth = 10;
      // context.arc(x, y, radius * width, 0, Math.PI * 2);
      // context.fill();

      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = color;
      context.font = `${radius * width}px "Arial"`;
      context.fillText("-", 0, 0);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
