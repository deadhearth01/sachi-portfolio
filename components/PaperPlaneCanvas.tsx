"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The SACHI paper rocket — the story object of the site.
 * It emerges from the depths of the hero background, then travels scene to
 * scene as you scroll: hovering while you read, slipping away when the films
 * play, and settling beside the closing call to action, ready to launch.
 * Hover near it and it jiggles; click it and it does a happy spin.
 * Sections choose a pose via data-ribbon="left|right|center|center-far|hidden".
 */

type Pose = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  lean: number; // lean toward its direction of travel
};

const POSES: Record<string, Pose> = {
  right: { x: 0.64, y: 0.24, scale: 1, opacity: 1, lean: -0.35 },
  "right-low": { x: 0.62, y: -0.32, scale: 0.78, opacity: 1, lean: 0.25 },
  left: { x: -0.66, y: 0.2, scale: 0.82, opacity: 1, lean: 0.35 },
  center: { x: 0.05, y: 0.1, scale: 1.2, opacity: 1, lean: -0.2 },
  "center-far": { x: 0.32, y: 0.3, scale: 0.55, opacity: 1, lean: -0.5 },
  hidden: { x: 1.6, y: 0.6, scale: 0.7, opacity: 0, lean: -0.8 },
};

/* ---- low-poly paper rocket: faceted cone nose, hex body, three fins ---- */

function buildRocket() {
  const group = new THREE.Group();
  const materials: THREE.MeshStandardMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];

  const paper = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#fbfaf6"),
    roughness: 0.6,
    metalness: 0.04,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
  });
  const ultra = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#2430d6"),
    roughness: 0.42,
    metalness: 0.18,
    side: THREE.DoubleSide,
    flatShading: true,
    transparent: true,
  });
  const saffron = ultra.clone();
  saffron.color = new THREE.Color("#e88b2d");
  materials.push(paper, ultra, saffron);

  const addCreases = (mesh: THREE.Mesh, opacity = 0.28) => {
    const eg = new THREE.EdgesGeometry(mesh.geometry, 10);
    geometries.push(eg);
    const lmat = new THREE.LineBasicMaterial({
      color: 0x8b877e,
      transparent: true,
      opacity,
    });
    mesh.add(new THREE.LineSegments(eg, lmat));
  };

  // origami body: a square-folded paper tube, panels meeting in crisp edges
  const bodyGeo = new THREE.CylinderGeometry(0.44, 0.36, 1.7, 4, 2);
  geometries.push(bodyGeo);
  const body = new THREE.Mesh(bodyGeo, paper);
  body.rotation.y = Math.PI / 4; // flat panel faces the viewer
  addCreases(body, 0.4);
  group.add(body);

  // collar fold where the nose meets the body
  const collarGeo = new THREE.CylinderGeometry(0.34, 0.46, 0.22, 4, 1);
  geometries.push(collarGeo);
  const collar = new THREE.Mesh(collarGeo, paper);
  collar.rotation.y = Math.PI / 4;
  collar.position.y = 0.85 + 0.11;
  addCreases(collar, 0.4);
  group.add(collar);

  // pyramid nose: four sharp ultramarine folds to a point
  const noseGeo = new THREE.ConeGeometry(0.35, 0.85, 4, 1);
  geometries.push(noseGeo);
  const nose = new THREE.Mesh(noseGeo, ultra);
  nose.rotation.y = Math.PI / 4;
  nose.position.y = 0.85 + 0.22 + 0.42;
  addCreases(nose, 0.3);
  group.add(nose);

  // four folded corner fins — doubled paper, sharp right-angle silhouette
  const finGeo = new THREE.BufferGeometry();
  finGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        0, -0.45, 0, // root top (on body corner)
        0, -0.85, 0, // root bottom (at tail)
        0, -1.05, 0.62, // dropped tip below the tail — classic origami fin
        0, -0.45, 0,
        0, -1.05, 0.62,
        0, -0.38, 0.5, // upper swept edge
      ],
      3
    )
  );
  finGeo.computeVertexNormals();
  geometries.push(finGeo);
  for (let i = 0; i < 4; i++) {
    // alternating paper / ultramarine fins — the two-tone origami read
    const fin = new THREE.Mesh(finGeo, i % 2 === 0 ? paper : ultra);
    fin.rotation.y = (i / 4) * Math.PI * 2; // sits on the fold edges
    fin.translateZ(0.31);
    addCreases(fin, 0.45);
    group.add(fin);
  }

  // paper exhaust curl: a tiny saffron pyramid at the tail
  const flameGeo = new THREE.ConeGeometry(0.15, 0.45, 4, 1);
  geometries.push(flameGeo);
  const flame = new THREE.Mesh(flameGeo, saffron);
  flame.rotation.x = Math.PI;
  flame.position.y = -1.12;
  group.add(flame);

  return { group, materials, geometries, flame };
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

    const { group: rocket, materials, geometries, flame } = buildRocket();
    scene.add(rocket);

    const key = new THREE.DirectionalLight(0xfff2dd, 2.6);
    key.position.set(2.5, 4, 4);
    scene.add(key);
    const bounce = new THREE.DirectionalLight(0x2430d6, 0.5);
    bounce.position.set(-3, -2, 2);
    scene.add(bounce);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(0, 2, -4);
    scene.add(rim);
    scene.add(new THREE.AmbientLight(0xf5f4f0, 0.85));

    const current: Pose = { ...POSES.right, opacity: 0 };
    const target: Pose = { ...POSES.right };
    const pointer = new THREE.Vector2();
    const pointerLerped = new THREE.Vector2();
    let velocity = 0;
    let lastScroll = window.scrollY;
    let width = 1;
    let height = 1;

    // entrance: the rocket rises out of the background depth
    const INTRO_DELAY = 0.35;
    const INTRO_LENGTH = 1.9;
    let intro = reduced ? 1 : 0;

    // jiggle spring — fed by hovering near the rocket
    let jig = 0;
    let jigVel = 0;

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
    };

    const ndc = new THREE.Vector3();
    const pointerNear = () => {
      ndc.copy(rocket.position).project(camera);
      const dx = ndc.x - pointer.x;
      const dy = ndc.y - pointer.y;
      return Math.hypot(dx, dy) < 0.16 * current.scale + 0.06;
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
      const dt = Math.min(clock.getDelta() + 0.016, 0.05);

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

      // hover jiggle: nudge the spring while the cursor sits on the rocket
      if (!reduced && current.opacity > 0.5 && pointerNear()) jigVel += 0.55;
      jigVel += -14 * jig * dt * 60 * 0.016 - 4.2 * jigVel * dt * 60 * 0.016;
      jig += jigVel * dt * 60 * 0.016;

      const vw = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      const spawnX = -0.12 * vw * camera.aspect;
      const spawnY = 0.32 * vw;
      const poseX = current.x * vw * camera.aspect;
      const poseY = current.y * vw + Math.sin(t * 0.8) * 0.07 + velocity * -0.5;

      rocket.position.x = THREE.MathUtils.lerp(spawnX, poseX, intro);
      rocket.position.y = THREE.MathUtils.lerp(spawnY, poseY, intro);
      rocket.position.z = THREE.MathUtils.lerp(-14, 0, intro);

      const mobile = width < 768;
      const jigScale = 1 + Math.sin(t * 31) * jig * 0.05;
      rocket.scale.setScalar(current.scale * (mobile ? 0.5 : 0.8) * jigScale);
      const alpha = current.opacity * THREE.MathUtils.clamp(intro * 2.5, 0, 1);
      for (const m of materials) m.opacity = alpha;

      pointerLerped.lerp(pointer, 0.03);
      const introRoll = (1 - intro) * Math.PI * 1.6; // lazy roll on the way in
      rocket.rotation.z =
        current.lean +
        velocity * 1.1 +
        Math.sin(t * 0.42) * 0.05 +
        Math.sin(t * 27) * jig * 0.12 +
        introRoll;
      // held three-quarter view with a gentle sway — the silhouette always reads
      rocket.rotation.y =
        -0.55 + Math.sin(t * 0.45) * 0.4 + pointerLerped.x * 0.25;
      rocket.rotation.x =
        0.16 + pointerLerped.y * -0.12 + Math.sin(t * 0.5) * 0.03;

      // the exhaust curl flickers with motion
      const flameScale =
        0.8 + Math.abs(velocity) * 6 + Math.sin(t * 9) * 0.12 + jig * 0.5;
      flame.scale.set(flameScale, flameScale, flameScale);

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
