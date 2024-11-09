// "use client"; // Correctly mark the file as a Client Component

// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import * as TWEEN from 'tween.js';
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
// import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
// import { BloomEffect, FXAAEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

// const CUBES_PER_SIDE = 3;

// function toRadians(angle: number): number {
//     return angle * (Math.PI / 180);
// }
// function createBoxWithRoundedEdges(
//     width: number,
//     height: number,
//     depth: number,
//     radius0: number,
//     smoothness: number,
// ) {
//     let shape = new THREE.Shape();
//     let eps = 0.00001;
//     let radius = radius0 - eps;
//     shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
//     shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
//     shape.absarc(
//         width - radius * 2,
//         height - radius * 2,
//         eps,
//         Math.PI / 2,
//         0,
//         true,
//     );
//     shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
//     let geometry = new THREE.ExtrudeGeometry(shape, {
//         depth: depth - radius0 * 2,
//         bevelEnabled: true,
//         bevelSegments: smoothness * 2,
//         steps: 1,
//         bevelSize: radius,
//         bevelThickness: radius0,
//         curveSegments: smoothness,
//     });

//     geometry.center();

//     return geometry;
// }

// const CubeScene = () => {
//     const canvasRef = useRef<HTMLCanvasElement | null>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const scene = new THREE.Scene();

//         // Set up camera and renderer
//         const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//         camera.position.z = 6;
//         camera.lookAt(new THREE.Vector3(0, 0, 0));

//         const renderer = new THREE.WebGLRenderer({
//             canvas: canvas,
//             antialias: false,
//             alpha: true,
//             powerPreference: "high-performance",
//             stencil: false,
//             depth: false,
//         });

//         renderer.autoClear = false;

//         // Add light
//         RectAreaLightUniformsLib.init();
//         const rectLight1 = new THREE.RectAreaLight(0xffffff, 100, 20, 20);
//         rectLight1.position.set(10, 15, 0);
//         rectLight1.rotation.x = Math.PI * 1.5;
//         rectLight1.rotation.y = Math.PI / 4;
//         scene.add(rectLight1);

//         const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 20, 20);
//         rectLight2.position.set(0, -20, 0);
//         rectLight2.rotation.x = Math.PI / 2;
//         scene.add(rectLight2);

//         scene.add(new RectAreaLightHelper(rectLight1));
//         scene.add(new RectAreaLightHelper(rectLight2));

//         // Add spotlight from above
//         const spotlight = new THREE.SpotLight(
//             0xffffff,
//             1,
//             10,
//             Math.PI / 4,
//             0.1,
//             2,
//         );
//         spotlight.position.set(0, 10, 0); // Position the spotlight above the cubes
//         spotlight.target.position.set(0, 0, 0); // Point the spotlight at the center of the cubes
//         spotlight.castShadow = true; // Enable shadows from the spotlight
//         scene.add(spotlight);
//         scene.add(spotlight.target); // Add the target to the scene

//         // Create cubes
//         const material = new THREE.MeshStandardMaterial({
//             color: 0x000000,
//             metalness: 1.0,
//             roughness: 0.01,
//         });
//         const cubes = new THREE.Object3D();
//         const offset = (CUBES_PER_SIDE - 1) / 2;
//         for (let i = 0; i < CUBES_PER_SIDE; i++) {
//             const layer = new THREE.Object3D();
//             for (let j = 0; j < CUBES_PER_SIDE; j++) {
//                 for (let k = 0; k < CUBES_PER_SIDE; k++) {
//                     const geom = createBoxWithRoundedEdges(1, 1, 1, 0.09, 40);
//                     const x = (i - offset) * 1.03;
//                     const y = (j - offset) * 1.03;
//                     const z = (k - offset) * 1.03;
//                     geom.translate(x, y, z);
//                     const cube = new THREE.Mesh(geom, material);
//                     layer.add(cube);
//                 }
//             }
//             cubes.add(layer);
//         }

//         const cubeWrapper = new THREE.Object3D();
//         cubeWrapper.add(cubes);
//         scene.add(cubeWrapper);

//         // Add postprocessing
//         const bloomOptions = {
//             luminanceThreshold: 0.9,
//             luminanceSmoothing: 0.7,
//             intensity: 0.8,
//             radius: 0.1,
//         };
//         const bloomPass = new BloomEffect(bloomOptions);
//         const fxaaPass = new FXAAEffect();
//         const composer = new EffectComposer(renderer);
//         composer.setSize(600, 600);
//         composer.addPass(new RenderPass(scene, camera));
//         composer.addPass(new EffectPass(camera, fxaaPass, bloomPass));

//         // Animation loop
//         function animate() {
//             requestAnimationFrame(animate);
//             cubeWrapper.rotation.x += 0.005;
//             cubeWrapper.rotation.y += 0.005;
//             cubeWrapper.rotation.z += 0.005;
//             TWEEN.update();
//             composer.render();
//         }

//         animate();

//         return () => {
//             // Cleanup
//             renderer.dispose();
//         };
//     }, []);

//     return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
// };

// export default CubeScene;
// app/components/Scene.tsx
// components/Cube.tsx
'use client';

import React, { useEffect } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import {
    BloomEffect,
    FXAAEffect,
    EffectComposer,
    EffectPass,
    RenderPass
} from 'postprocessing';

const Cube: React.FC = () => {
    useEffect(() => {
        const CUBES_PER_SIDE = 3;

        function toRadians(angle: number): number {
            return angle * (Math.PI / 180);
        }

        function createBoxWithRoundedEdges(width: number, height: number, depth: number, radius0: number, smoothness: number): THREE.ExtrudeGeometry {
            const shape = new THREE.Shape();
            const eps = 0.00001;
            const radius = radius0 - eps;
            shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
            shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
            shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
            shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);

            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: depth - radius0 * 2,
                bevelEnabled: true,
                bevelSegments: smoothness * 2,
                steps: 1,
                bevelSize: radius,
                bevelThickness: radius0,
                curveSegments: smoothness
            });

            geometry.center();
            return geometry;
        }

        function makeCubes(): THREE.Object3D {
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x444444, 
                metalness: 0.8, 
                roughness: 0.2 
            });
            const numCubes = CUBES_PER_SIDE;
            const cubes = new THREE.Object3D();
            const offset = (numCubes - 1) / 2;

            for (let i = 0; i < numCubes; i++) {
                const layer = new THREE.Object3D();
                for (let j = 0; j < numCubes; j++) {
                    for (let k = 0; k < numCubes; k++) {
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

            const innerWrapper = new THREE.Object3D();
            innerWrapper.add(cubes);
            const outerWrapper = new THREE.Object3D();
            outerWrapper.add(innerWrapper);
            return outerWrapper;
        }

        function constructScene() {
            const scene = new THREE.Scene();
            RectAreaLightUniformsLib.init();

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
            scene.add(ambientLight);

            const rectLight1 = new THREE.RectAreaLight(0xffffff, 50, 10, 10);
            rectLight1.position.set(5, 5, 5);
            rectLight1.lookAt(0, 0, 0);
            scene.add(rectLight1);

            const rectLight2 = new THREE.RectAreaLight(0xffffff, 50, 10, 10);
            rectLight2.position.set(-5, -5, 5);
            rectLight2.lookAt(0, 0, 0);
            scene.add(rectLight2);

            const cube = makeCubes();
            scene.add(cube);
            return { scene, cube };
        }

        function addCamera(): THREE.PerspectiveCamera {
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 6;
            return camera;
        }

        function addRendering(container: HTMLElement, scene: THREE.Scene, camera: THREE.PerspectiveCamera): EffectComposer {
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            container.appendChild(renderer.domElement);

            const bloomOptions = {
                luminanceThreshold: 0.6,
                luminanceSmoothing: 0.8,
                intensity: 1.5,
            };

            const bloomPass = new BloomEffect(bloomOptions);
            const FXAAPass = new FXAAEffect();

            const composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            composer.addPass(new EffectPass(camera, bloomPass, FXAAPass));

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                composer.setSize(window.innerWidth, window.innerHeight);
            });

            return composer;
        }

        const container = document.getElementById('cubeContainer');
        if (!container) return;

        const { scene, cube } = constructScene();
        const camera = addCamera();
        const composer = addRendering(container, scene, camera);

        function animate(): void {
            requestAnimationFrame(animate);
            if (cube && cube.children[0]) {
                cube.children[0].rotation.x += 0.005;
                cube.children[0].rotation.y += 0.005;
            }
            TWEEN.update();
            composer.render();
        }

        animate();

        return () => {
            if (container && container.children[0]) {
                container.removeChild(container.children[0]);
            }
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    }
                }
            });
        };
    }, []);

    return (
        <div className="relative w-full h-screen">
            <div id="cubeContainer" className="absolute inset-0" />
            <div className="spotlight absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 w-full h-[350px] blur-[50px] pointer-events-none z-10">
                <div className="w-full h-full bg-white opacity-30 mask-gradient mix-blend-screen" />
            </div>
        </div>
    );
};

export default Cube;