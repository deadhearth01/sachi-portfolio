"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The SACHI paper plane — the story object of the site.
 * In the hero it is a flat sheet of paper; as you scroll it folds itself
 * (morph targets) into a paper dart, then glides through the scenes:
 * hovering while you read, darting away when the films play, and finally
 * settling nose-up next to the closing call to action, ready to launch.
 * Sections choose a pose via data-ribbon="left|right|center|center-far|hidden".
 */

type Pose = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotY: number; // heading
  rotZ: number; // bank
};

const POSES: Record<string, Pose> = {
  right: { x: 0.66, y: 0.28, scale: 1, opacity: 1, rotY: -0.9, rotZ: -0.12 },
  left: { x: -0.66, y: 0.22, scale: 0.8, opacity: 1, rotY: 0.9, rotZ: 0.14 },
  center: { x: 0.05, y: 0.1, scale: 1.2, opacity: 1, rotY: -0.5, rotZ: -0.3 },
  "center-far": { x: 0.32, y: 0.3, scale: 0.55, opacity: 1, rotY: -1.3, rotZ: -0.08 },
  hidden: { x: 1.6, y: 0.5, scale: 0.7, opacity: 0, rotY: -1.4, rotZ: -0.4 },
};

/* ---- geometry: flat sheet -> folded dart, one morph target ---- */

function buildPlaneGeometry() {
  // crease-pattern fan: 4 triangles from the nose corner of the sheet
  // flat sheet (y = 0)
  const A = [0, 0, 1.5]; // front centre — becomes the nose
  const B = [-1.1, 0, 1.5]; // front-left corner — folds under
  const C = [1.1, 0, 1.5]; // front-right corner — folds under
  const D = [-1.1, 0, -1.5]; // rear-left — becomes left wingtip
  const E = [1.1, 0, -1.5]; // rear-right — becomes right wingtip
  const F = [0, 0, -1.5]; // rear centre — becomes the spine tail

  // folded dart
  const fA = [0, 0, 1.6];
  const fB = [-0.05, -0.14, 0.5];
  const fC = [0.05, -0.14, 0.5];
  const fD = [-1.35, 0.5, -1.4];
  const fE = [1.35, 0.5, -1.4];
  const fF = [0, 0.06, -1.35];

  const flat = [
    ...A, ...B, ...D,
    ...A, ...D, ...F,
    ...A, ...F, ...E,
    ...A, ...E, ...C,
  ];
  const folded = [
    ...fA, ...fB, ...fD,
    ...fA, ...fD, ...fF,
    ...fA, ...fF, ...fE,
    ...fA, ...fE, ...fC,
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(flat, 3));
  geo.morphAttributes.position = [new THREE.Float32BufferAttribute(folded, 3)];
  geo.computeVertexNormals();
  return geo;
}

export default function PaperPlaneCanvas() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 7);

    const geo = buildPlaneGeometry();
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#fbfaf6"),
      roughness: 0.62,
      metalness: 0.05,
      side: THREE.DoubleSide,
      flatShading: true,
      transparent: true,
    });
    const plane = new THREE.Mesh(geo, mat);
    plane.morphTargetInfluences = [0];
    scene.add(plane);

    // paper reads through light: warm key, cool ultramarine bounce, deep rim
    const key = new THREE.DirectionalLight(0xfff2dd, 2.6);
    key.position.set(2.5, 4, 4);
    scene.add(key);
    const bounce = new THREE.DirectionalLight(0x2430d6, 0.45);
    bounce.position.set(-3, -2, 2);
    scene.add(bounce);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0, 2, -4);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xf5f4f0, 0.9));

    const current: Pose = { ...POSES.right, opacity: 0 };
    const target: Pose = { ...POSES.right };
    const pointer = new THREE.Vector2();
    const pointerLerped = new THREE.Vector2();
    let fold = 0;
    let foldTarget = 0;
    let velocity = 0;
    let lastScroll = window.scrollY;
    let width = 1;
    let height = 1;

    const pickPose = () => {
      const mid = window.innerHeight * 0.5;
      let name = "right";
      for (const s of document.querySelectorAll<HTMLElement>("[data-ribbon]")) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          name = s.dataset.ribbon || "right";
          break;
        }
      }
      Object.assign(target, POSES[name] || POSES.right);

      // fold progress: flat at the very top, fully folded one viewport later
      const hero = document.querySelector<HTMLElement>("[data-scene='01']");
      if (hero) {
        const h = hero.getBoundingClientRect().height || window.innerHeight;
        // rest with a hint of crease so the sheet always reads as paper
        foldTarget = THREE.MathUtils.clamp(0.06 + window.scrollY / (h * 0.75), 0, 1);
      } else {
        foldTarget = 1; // interior pages: already a plane
      }
    };

    const onPointer = (e: PointerEvent) => {
      pointer.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("pointermove", onPointer);

    const resize = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();

      const sy = window.scrollY;
      velocity += ((sy - lastScroll) * 0.0018 - velocity) * 0.08;
      lastScroll = sy;

      pickPose();

      const ease = reduced ? 1 : 0.05;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.scale += (target.scale - current.scale) * ease;
      current.rotY += (target.rotY - current.rotY) * ease;
      current.rotZ += (target.rotZ - current.rotZ) * ease;
      current.opacity += (target.opacity - current.opacity) * (reduced ? 1 : 0.07);
      fold += (foldTarget - fold) * (reduced ? 1 : 0.09);

      plane.morphTargetInfluences![0] = fold;

      const vw = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const glide = 1 - fold; // the sheet floats more, the dart flies straighter
      plane.position.x = current.x * vw * camera.aspect;
      plane.position.y =
        current.y * vw +
        Math.sin(t * (0.6 + fold * 0.4)) * (0.05 + glide * 0.06) +
        velocity * -0.6;

      const mobile = width < 768;
      // the open sheet sits smaller than the flying dart
      const foldScale = 0.68 + fold * 0.22;
      plane.scale.setScalar(current.scale * foldScale * (mobile ? 0.6 : 1));
      mat.opacity = current.opacity;

      pointerLerped.lerp(pointer, 0.03);
      // flat sheet lies open toward the viewer; the dart takes a heading
      plane.rotation.x =
        THREE.MathUtils.lerp(-1.15, 0.12, fold) + pointerLerped.y * -0.12 + Math.sin(t * 0.5) * 0.04;
      plane.rotation.y =
        THREE.MathUtils.lerp(0.35, current.rotY, fold) + pointerLerped.x * 0.18;
      plane.rotation.z =
        THREE.MathUtils.lerp(Math.sin(t * 0.4) * 0.06, current.rotZ + velocity * 1.6, fold);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      pickPose();
      Object.assign(current, target);
      fold = foldTarget;
      loop();
      cancelAnimationFrame(raf);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={holder}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] [&>canvas]:h-full [&>canvas]:w-full"
    />
  );
}
