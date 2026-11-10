import * as THREE from "three";

import { DRINKS } from "@/content/drinks";

const VOLT = "#e6f03c";
const INK = "#121210";

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas not supported");
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Touchscreen UI drawn into a texture: brand bar, drink grid, pay button. */
export function createScreenTexture() {
  const W = 768;
  const H = 820;
  const { canvas, ctx } = makeCanvas(W, H);

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#1c1d1a");
  bg.addColorStop(1, "#0d0d0c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = VOLT;
  ctx.font = "800 54px system-ui, sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText("REPUPFIT", 48, 44);
  ctx.fillStyle = "#9a9a90";
  ctx.font = "600 26px system-ui, sans-serif";
  ctx.fillText("Choose your drink", 48, 112);

  const swatches = DRINKS.flatMap((d) => d.flavours).slice(0, 6);
  const cols = 3;
  const cell = (W - 96 - 2 * 24) / cols;
  swatches.forEach((f, i) => {
    const x = 48 + (i % cols) * (cell + 24);
    const y = 170 + Math.floor(i / cols) * (cell + 24);
    ctx.fillStyle = "#24251f";
    roundRect(ctx, x, y, cell, cell, 24);
    ctx.fill();
    // cup silhouette
    ctx.fillStyle = "#f2efe6";
    ctx.beginPath();
    ctx.moveTo(x + cell * 0.32, y + cell * 0.22);
    ctx.lineTo(x + cell * 0.68, y + cell * 0.22);
    ctx.lineTo(x + cell * 0.62, y + cell * 0.8);
    ctx.lineTo(x + cell * 0.38, y + cell * 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = f.color;
    ctx.fillRect(x + cell * 0.335, y + cell * 0.42, cell * 0.33, cell * 0.2);
  });

  ctx.fillStyle = VOLT;
  roundRect(ctx, 48, H - 150, W - 96, 96, 48);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = "800 36px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("TAP TO PAY", W / 2, H - 102);

  return toTexture(canvas);
}

/** Header sign above the screen. */
export function createHeaderTexture() {
  const { canvas, ctx } = makeCanvas(1024, 192);
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, 1024, 192);
  ctx.fillStyle = VOLT;
  ctx.font = "900 116px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("REPUPFIT", 512, 100);
  return toTexture(canvas);
}

/** Brushed-metal style body texture: subtle vertical streaks. */
export function createBrushedTexture() {
  const { canvas, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = "#2a2b28";
  ctx.fillRect(0, 0, 256, 256);
  // seeded pseudo-random so the texture is stable between renders
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 900; i++) {
    const x = rand() * 256;
    const shade = 30 + Math.floor(rand() * 26);
    ctx.fillStyle = `rgba(${shade + 20},${shade + 20},${shade + 16},${0.25 + rand() * 0.3})`;
    ctx.fillRect(x, 0, 1, 256);
  }
  const tex = toTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 1);
  return tex;
}

/** Ventilation grille at the base of the machine. */
export function createGrilleTexture() {
  const { canvas, ctx } = makeCanvas(512, 128);
  ctx.fillStyle = "#151614";
  ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = "#050505";
  for (let x = 24; x < 500; x += 22) {
    roundRect(ctx, x, 30, 10, 68, 5);
    ctx.fill();
  }
  return toTexture(canvas);
}

/** Paper texture for the shake cup, with a printed logo band. */
export function createCupTexture() {
  const { canvas, ctx } = makeCanvas(1024, 512);
  ctx.fillStyle = "#f3f0e7";
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = INK;
  ctx.font = "900 64px system-ui, sans-serif";
  ctx.textBaseline = "middle";
  for (let x = 40; x < 1024; x += 512) ctx.fillText("REPUPFIT", x, 130);
  return toTexture(canvas);
}
