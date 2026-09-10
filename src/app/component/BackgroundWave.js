
import { Object3D } from 'three/src/core/Object3D.js';
import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// initialize wave effect variables
const NEAR = 1;
const FAR = 2200;
const AMOUNTX = 60;
const AMOUNTZ = 20;
const SEPARATION = 60;
const numPoints = AMOUNTX * AMOUNTZ;
const CX = (AMOUNTX * SEPARATION) / 2;
const CZ = (AMOUNTZ * SEPARATION) / 2;

const tempObject = new Object3D();

function Points () {
  const meshRef = useRef();
  const [half] = useState({ x: 0, y: 0 });
  const [mouse] = useState({ x: 0, y: 0 });
  const { camera, scene } = useThree();

  useEffect(() => {
    const handleResize = () => {
      half.x = window.innerWidth / 2;
      half.y = window.innerHeight / 2;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    const handleMouse = (event) => {
      if (event.isPrimary === false) return;
      mouse.x = event.clientX - half.x;
      mouse.y = event.clientY - half.y;
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [camera, half, mouse]);

  useFrame((state) => {
    // adjust camera based on latest mouse position
    camera.position.x = mouse.x * 0.05;
    camera.position.y = mouse.y * 0.1 + 200;
    camera.position.z = 1200;
    camera.lookAt(scene.position);
    camera.position.y += 600;
    const time = state.clock.getElapsedTime();
    // adjust positions and scales of particles per trig
    for (let ix = 0, id = 0; ix < AMOUNTX; ix++) {
      for (let iz = 0; iz < AMOUNTZ; iz++, id++) {
        tempObject.position.set(
          ix * SEPARATION - CX,
          (Math.sin(0.5 * (ix + time)) + Math.sin(0.5 * (iz + time))) * 50,
          iz * SEPARATION - CZ
        );
        tempObject.scale.setScalar(
          (Math.sin((ix + time) * 0.3) + Math.sin((iz + time) * 0.5) + 1) / 4
        );
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(id, tempObject.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, numPoints]}>
      <sphereGeometry args={[10, 32, 32]} />
      <meshPhongMaterial color={0xffffff} specular={0x929292} shininess={0} />
    </instancedMesh>
  );
}

export default function BackgroundWave () {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.26,
        pointerEvents: 'none',
        transform: 'rotate(180deg)',
        maskImage: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 45%, transparent 80%)',
        WebkitMaskImage: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 45%, transparent 80%)'
      }}
    >
      <Canvas camera={{ fov: 75, near: NEAR, far: FAR }}>
        <fog attach='fog' args={[0x000000, FAR / 2, FAR]} />
        <pointLight color={0x0059ff} position={[0, 1000, 0]} intensity={1.5} />
        <Points />
      </Canvas>
    </Box>
  );
}
