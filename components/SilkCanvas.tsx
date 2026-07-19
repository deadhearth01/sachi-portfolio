"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const frag = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

// simplex-ish noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.055;
  vec2 m = uMouse * 0.25;

  // layered flowing silk
  float n1 = snoise(p * 1.15 + vec2(t * 0.8, -t * 0.5) + m);
  float n2 = snoise(p * 2.4 - vec2(t * 0.4, t * 0.7) + n1 * 0.65);
  float n3 = snoise(p * 0.6 + vec2(-t * 0.3, t * 0.25) + n2 * 0.4);
  float silk = n1 * 0.5 + n2 * 0.3 + n3 * 0.45;

  // porcelain base
  vec3 porcelain = vec3(0.961, 0.957, 0.941);
  vec3 paper = vec3(0.918, 0.912, 0.886);
  vec3 ultra = vec3(0.141, 0.188, 0.843);
  vec3 saffron = vec3(0.910, 0.545, 0.176);

  vec3 col = mix(porcelain, paper, smoothstep(-0.6, 0.9, silk));

  // ultramarine sheen in the folds
  float sheen = smoothstep(0.35, 0.95, silk) * 0.16;
  col = mix(col, ultra, sheen);

  // faint warm kiss near mouse
  float md = distance(uv, uMouse * 0.5 + 0.5);
  col = mix(col, saffron, smoothstep(0.45, 0.0, md) * 0.05);

  // vignette to keep edges quiet
  float vig = smoothstep(1.25, 0.45, distance(uv, vec2(0.5)));
  col = mix(paper, col, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

const vert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

export default function SilkCanvas({ className = "" }: { className?: string }) {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };
    const mat = new THREE.ShaderMaterial({ fragmentShader: frag, vertexShader: vert, uniforms });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    const target = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("pointermove", onMove);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(target, 0.035);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      renderer.dispose();
      mat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={holder} aria-hidden className={`pointer-events-none [&>canvas]:h-full [&>canvas]:w-full ${className}`} />;
}
