"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The SACHI paper rocket — the classic dart every kid folds: sharp nose,
 * two wings, creased down the middle. It emerges from the hero background,
 * then travels scene to scene as you scroll, and jiggles when you hover it.
 * Sections choose a pose via data-ribbon="left|right|right-low|center|
 * center-far|hidden".
 */

type Pose = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  lean: number;
};

const POSES: Record<string, Pose> = {
  right: { x: 0.64, y: 0.24, scale: 1, opacity: 1, lean: 0.3 },
  "right-low": { x: 0.62, y: -0.32, scale: 0.78, opacity: 1, lean: 0.12 },
  left: { x: -0.66, y: 0.2, scale: 0.82, opacity: 1, lean: -0.25 },
  center: { x: 0.05, y: 0.1, scale: 1.2, opacity: 1, lean: 0.2 },
  "center-far": { x: 0.32, y: 0.3, scale: 0.55, opacity: 1, lean: 0.35 },
  hidden: { x: 1.6, y: 0.6, scale: 0.7, opacity: 0, lean: 0.5 },
};

/* ---- the classic folded dart: two wings, under-wing flaps, deep keel ---- */

function buildDart() {
  const group = new THREE.Group();
  const materials: THREE.MeshStandardMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  const paper = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#fbfaf6"),
    roughness: 0.58,
    metalness: 0.04,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
  });
  const ultra = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2430d6"),
    roughness: 0.45,
    metalness: 0.1,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
  });
  materials.push(paper, ultra);

  // folded-dart landmarks (nose toward +z)
  const N = [0, 0, 1.75]; // sharp nose
  const S = [0, 0.03, -1.45]; // spine, rear
  const K = [0, -0.52, -1.4]; // keel, rear bottom
  const TL = [-1.3, 0.14, -1.5]; // left wingtip
  const TR = [1.3, 0.14, -1.5];
  const FL = [-0.3, -0.2, -1.42]; // under-wing fold, left
  const FR = [0.3, -0.2, -1.42];

  const tri = (a: number[], b: number[], c: number[]) => [...a, ...b, ...c];

  // top wings — the two big paper surfaces
  const wingsGeo = new THREE.BufferGeometry();
  wingsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [...tri(N, S, TL), ...tri(N, TR, S)],
      3
    )
  );
  wingsGeo.computeVertexNormals();
  geometries.push(wingsGeo);
  const wings = new THREE.Mesh(wingsGeo, paper);
  group.add(wings);

  // under-wing flaps + keel — the folded layers you see from below
  const foldsGeo = new THREE.BufferGeometry();
  foldsGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [...tri(N, FL, K), ...tri(N, K, FR), ...tri(N, K, S)],
      3
    )
  );
  foldsGeo.computeVertexNormals();
  geometries.push(foldsGeo);
  const folds = new THREE.Mesh(foldsGeo, ultra);
  group.add(folds);

  // crease lines so every fold reads at any size
  for (const mesh of [wings, folds]) {
    const eg = new THREE.EdgesGeometry(mesh.geometry, 5);
    geometries.push(eg);
    mesh.add(
      new THREE.LineSegments(
        eg,
        new THREE.LineBasicMaterial({
          color: 0x8b877e,
          transparent: true,
          opacity: 0.35,
        })
      )
    );
  }

  return { group, materials, geometries };
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

    const { group: dart, materials, geometries } = buildDart();
    dart.rotation.order = "YXZ";
    scene.add(dart);

    const key = new THREE.DirectionalLight(0xfff2dd, 2.4);
    key.position.set(-1.5, 3, 5);
    scene.add(key);
    const bounce = new THREE.DirectionalLight(0x2430d6, 0.4);
    bounce.position.set(-3, -2, 2);
    scene.add(bounce);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0, 2, -4);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xf5f4f0, 1.05));

    const current: Pose = { ...POSES.right, opacity: 0 };
    const target: Pose = { ...POSES.right };
    const pointer = new THREE.Vector2();
    const pointerLerped = new THREE.Vector2();
    let velocity = 0;
    let lastScroll = window.scrollY;
    let width = 1;
    let height = 1;

    const INTRO_DELAY = 0.35;
    const INTRO_LENGTH = 1.9;
    let intro = reduced ? 1 : 0;

    const pickPose = () => {
      const mid = window.innerHeight * 0.5;
      let name = "hidden"; // sections opt in; untagged content stays clear
      for (const s of document.querySelectorAll<HTMLElement>("[data-ribbon]")) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          name = s.dataset.ribbon || "hidden";
          break;
        }
      }
      Object.assign(target, POSES[name] || POSES.hidden);
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

    const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      const t = clock.getElapsedTime();

      if (!reduced) {
        intro = easeOutExpo(
          THREE.MathUtils.clamp((t - INTRO_DELAY) / INTRO_LENGTH, 0, 1)
        );
      }

      const sy = window.scrollY;
      velocity += ((sy - lastScroll) * 0.0016 - velocity) * 0.08;
      lastScroll = sy;

      pickPose();

      const ease = reduced ? 1 : 0.05;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.scale += (target.scale - current.scale) * ease;
      current.lean += (target.lean - current.lean) * ease;
      current.opacity += (target.opacity - current.opacity) * (reduced ? 1 : 0.07);

      const vw = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const isNarrow = width < 768;
      const spawnX = -0.12 * vw * camera.aspect;
      const spawnY = 0.32 * vw;
      const poseX = current.x * vw * camera.aspect;
      const poseY =
        current.y * vw +
        (isNarrow ? 0.14 * vw : 0) +
        Math.sin(t * 0.8) * 0.07 +
        velocity * -0.5;

      // minimal cursor-follow: the plane eases a little toward the mouse
      const followX = pointerLerped.x * 0.22;
      const followY = pointerLerped.y * 0.16;
      dart.position.x = THREE.MathUtils.lerp(spawnX, poseX + followX, intro);
      dart.position.y = THREE.MathUtils.lerp(spawnY, poseY + followY, intro);
      dart.position.z = THREE.MathUtils.lerp(-14, 0, intro);

      dart.scale.setScalar(current.scale * (isNarrow ? 0.45 : 0.85));
      const alpha = current.opacity * THREE.MathUtils.clamp(intro * 2.5, 0, 1);
      for (const m of materials) m.opacity = alpha;

      pointerLerped.lerp(pointer, 0.03);
      const introRoll = (1 - intro) * Math.PI * 1.4;

      // thrown-dart attitude: nose ahead of it, both wings readable
      dart.rotation.y =
        -0.95 + Math.sin(t * 0.4) * 0.18 + pointerLerped.x * 0.22 + introRoll;
      dart.rotation.x =
        -0.4 + pointerLerped.y * -0.14 + Math.sin(t * 0.55) * 0.05;
      dart.rotation.z =
        current.lean + velocity * 1.2 + Math.sin(t * 0.42) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      pickPose();
      Object.assign(current, target);
      loop();
      cancelAnimationFrame(raf);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      for (const g of geometries) g.dispose();
      for (const m of materials) m.dispose();
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
