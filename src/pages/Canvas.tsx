// https://github.com/chcoomilk - @Klaustin
import { Component, createEffect, createSignal } from "solid-js";

import styles from '../App.module.css';
import Utils from "../utils";

const MAX_X = 600;
const MAX_Y = 600;
const MAX_NODES = 4;

type CanvasNode = {
  x: number,
  y: number,
  label: string,
}

const Canvas: Component = () => {
  let ref: HTMLCanvasElement | undefined = undefined;
  const [getNodes, setNodes] = createSignal<CanvasNode[]>([]);

  const initGame = (ctx: CanvasRenderingContext2D): void => {
    const spawnRandomCircles = (label: string): [number, number] => {
      const x = Utils.getRandomNumber(MAX_X);
      const y = Utils.getRandomNumber(MAX_Y);
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = "8pt";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 3);
      return [x, y];
    }

    for (let i = 0; i < MAX_NODES; i++) {
      const label = (i + 1).toString();
      const [x, y] = spawnRandomCircles(label);
      setNodes(p => {
        p.push({ label, x, y })
        return p;
      });
    }
  };

  createEffect(() => {
    const ctx = ref?.getContext("2d");

    if (ctx) {
      initGame(ctx);
    }
  });

  const handleCanvasOnClick = (
    e: MouseEvent & {
      currentTarget: HTMLCanvasElement;
      target: Element;
    }
  ) => {
    const nodes = getNodes();

    // FITUR DIBUTUHKAN TASK
    let diffs = new Array<[string, number]>();
    nodes.forEach(node => {
      const dx = e.offsetX - node.x;
      const dy = e.offsetY - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      diffs.push([node.label, distance]);
    });

    const result = diffs.reduce((prev, current) => (prev[1] < current[1]) ? prev : current);
    // END
    alert(`You are closer to node #${result[0]}!`);
  };

  return (
    <>
      <p>
        Mencari node terdekat dari mouse
      </p>
      <p>
        Click anywhere inside the box
        to identify what the nearest node is
        to your mouse /
        Klik di dalam box untuk mengetahui
        node yang terdekat dari mouse
      </p>
      <canvas ref={ref} width={MAX_X} height={MAX_Y} class={styles.canvas}
        onClick={handleCanvasOnClick}
      />
    </>
  );
};

export default Canvas;
