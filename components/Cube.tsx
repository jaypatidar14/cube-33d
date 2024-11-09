"use client"; // Correctly mark the file as a Client Component

import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as TWEEN from 'tween.js';
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { BloomEffect, FXAAEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

const CUBES_PER_SIDE = 3;

function toRadians(angle: number): number {
    return angle * (Math.PI / 180);
}
function createBoxWithRoundedEdges(
    width: number,
    height: number,
    depth: number,
    radius0: number,
    smoothness: number,
) {
    let shape = new THREE.Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(
        width - radius * 2,
        height - radius * 2,
        eps,
        Math.PI / 2,
        0,
        true,
    );
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    let geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth - radius0 * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius0,
        curveSegments: smoothness,
    });

    geometry.center();

    return geometry;
}

const CubeScene = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();

        // Set up camera and renderer
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 6;
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
        });

        renderer.autoClear = false;

        // Add light
        RectAreaLightUniformsLib.init();
        const rectLight1 = new THREE.RectAreaLight(0xffffff, 100, 20, 20);
        rectLight1.position.set(10, 15, 0);
        rectLight1.rotation.x = Math.PI * 1.5;
        rectLight1.rotation.y = Math.PI / 4;
        scene.add(rectLight1);

        const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 20, 20);
        rectLight2.position.set(0, -20, 0);
        rectLight2.rotation.x = Math.PI / 2;
        scene.add(rectLight2);

        scene.add(new RectAreaLightHelper(rectLight1));
        scene.add(new RectAreaLightHelper(rectLight2));

        // Add spotlight from above
        const spotlight = new THREE.SpotLight(
            0xffffff,
            1,
            10,
            Math.PI / 4,
            0.1,
            2,
        );
        spotlight.position.set(0, 10, 0); // Position the spotlight above the cubes
        spotlight.target.position.set(0, 0, 0); // Point the spotlight at the center of the cubes
        spotlight.castShadow = true; // Enable shadows from the spotlight
        scene.add(spotlight);
        scene.add(spotlight.target); // Add the target to the scene

        // Create cubes
        const material = new THREE.MeshStandardMaterial({
            color: 0x000000,
            metalness: 1.0,
            roughness: 0.01,
        });
        const cubes = new THREE.Object3D();
        const offset = (CUBES_PER_SIDE - 1) / 2;
        for (let i = 0; i < CUBES_PER_SIDE; i++) {
            const layer = new THREE.Object3D();
            for (let j = 0; j < CUBES_PER_SIDE; j++) {
                for (let k = 0; k < CUBES_PER_SIDE; k++) {
                    const geom = createBoxWithRoundedEdges(1, 1, 1, 0.09, 40);
                    const x = (i - offset) * 1.03;
                    const y = (j - offset) * 1.03;
                    const z = (k - offset) * 1.03;
                    geom.translate(x, y, z);
                    const cube = new THREE.Mesh(geom, material);
                    layer.add(cube);
                }
            }
            cubes.add(layer);
        }

        const cubeWrapper = new THREE.Object3D();
        cubeWrapper.add(cubes);
        scene.add(cubeWrapper);

        // Add postprocessing
        const bloomOptions = {
            luminanceThreshold: 0.9,
            luminanceSmoothing: 0.7,
            intensity: 0.8,
            radius: 0.1,
        };
        const bloomPass = new BloomEffect(bloomOptions);
        const fxaaPass = new FXAAEffect();
        const composer = new EffectComposer(renderer);
        composer.setSize(600, 600);
        composer.addPass(new RenderPass(scene, camera));
        composer.addPass(new EffectPass(camera, fxaaPass, bloomPass));

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            cubeWrapper.rotation.x += 0.005;
            cubeWrapper.rotation.y += 0.005;
            cubeWrapper.rotation.z += 0.005;
            TWEEN.update();
            composer.render();
        }

        animate();

        return () => {
            // Cleanup
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default CubeScene;