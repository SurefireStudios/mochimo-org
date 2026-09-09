
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applyObjDiff, dupObj } from '../../util';
import { useGetNetworkQuery } from 'api';

import {
  CatmullRomCurve3,
  DoubleSide,
  Float32BufferAttribute,
  Object3D,
  Quaternion,
  Spherical,
  Vector3
} from 'three';
// import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

const CURVE_SEGMENTS = 200;
const distS = new Spherical();
const dist = new Vector3();
const force = new Vector3();
const center = new Vector3();
const axis = new Vector3(0, 1, 0);
const tempObject = new Object3D();
const tempQuaternion = new Quaternion();
const tempSpherical = new Spherical();

function Nodes ({ nodes, options }) {
  // declare references for useFrame access
  const mref = useRef();
  const pref = useRef();
  // declare nodes size tracking
  const [max, setMax] = useState(0);

  // ////////////////////////////////
  // THREE initialization (useMemo)
  const attributes = useMemo(() => {
    const ab = new Vector3();
    const cb = new Vector3();
    // initialize curve
    const array = Array(5).fill(null).map(() => new Vector3());
    const curve2 = new CatmullRomCurve3(
      array,
      false, 'catmullrom', 1.0);
    // positon curve2 points
    curve2.points[0].set(0, 0, 0);
    curve2.points[1].setFromSphericalCoords(0.75, Math.PI / 16, -(Math.PI / 5));
    curve2.points[2].set(0, 1, 0);
    curve2.points[3].setFromSphericalCoords(0.75, Math.PI / 16, Math.PI / 5);
    const points = curve2.getPoints(CURVE_SEGMENTS);
    // initialize float32 array for positions
    const normals = new Float32Array(points.length * 3 * 3);
    const positions = new Float32Array(points.length * 3 * 3);
    let index = 0;
    for (let i = 0, j = points.length - 1; i < j;) {
      if (i < j) {
        // calc flat face normal
        cb.subVectors(points[j], points[i + 1]);
        ab.subVectors(points[i], points[i + 1]);
        cb.cross(ab);
        cb.normalize();
        // set attribute values
        normals[index] = cb.x;
        positions[index++] = points[i].x;
        normals[index] = cb.y;
        positions[index++] = points[i].y;
        normals[index] = cb.z;
        positions[index++] = points[i].z;
        normals[index] = cb.x;
        positions[index++] = points[i + 1].x;
        normals[index] = cb.y;
        positions[index++] = points[i + 1].y;
        normals[index] = cb.z;
        positions[index++] = points[i + 1].z;
        normals[index] = cb.x;
        positions[index++] = points[j].x;
        normals[index] = cb.y;
        positions[index++] = points[j].y;
        normals[index] = cb.z;
        positions[index++] = points[j].z;
        i++; // progress i pointer
      }
      if (j > i) {
        // calc flat face normal
        cb.subVectors(points[i], points[j - 1]);
        ab.subVectors(points[j], points[j - 1]);
        cb.cross(ab);
        cb.normalize();
        // set attribute values
        normals[index] = cb.x;
        positions[index++] = points[j].x;
        normals[index] = cb.y;
        positions[index++] = points[j].y;
        normals[index] = cb.z;
        positions[index++] = points[j].z;
        normals[index] = cb.x;
        positions[index++] = points[j - 1].x;
        normals[index] = cb.y;
        positions[index++] = points[j - 1].y;
        normals[index] = cb.z;
        positions[index++] = points[j - 1].z;
        normals[index] = cb.x;
        positions[index++] = points[i].x;
        normals[index] = cb.y;
        positions[index++] = points[i].y;
        normals[index] = cb.z;
        positions[index++] = points[i].z;
        j--; // progress j pointer
      }
    }
    return { normals, positions };
  }, []);

  // ////////////////////////
  // THREE updates (useFrame)
  useFrame(() => {
    // check network size
    let { size } = nodes;
    if (size) {
      // ensure adequate space is allocated for attributes
      if (size >= max) {
        // update max to next boundary (+32 increments)
        setMax(size = ((size >> 5) << 5) + 32);
        // expand points geometry vertices
        pref.current.geometry.setAttribute('position',
          new Float32BufferAttribute(size * 3, 3));
      }
      const ppositions = pref.current.geometry.attributes.position.array;
      let index = 0;
      // update points positions
      const gravitationalForce = 0.997;
      nodes.forEach((node) => {
        let dist2;
        const { peers, v } = node;
        if (peers && peers.length) {
          force.set(0, 0, 0); // clear previous force
          for (let i = 0; i < peers.length; i++) {
            if (nodes.has(peers[i])) {
              const to = nodes.get(peers[i]);
              if (i < 32) {
                // add all target vectors to force
                dist.subVectors(v, to.v);
                dist2 = v.distanceTo(to.v);
                if (dist2 > 0.01) dist.divideScalar(dist2 / i);
                force.add(dist);
              }
            }
          }
          // apply flower force
          dist.set(0, 50, 0);
          force.add(dist);
          distS.setFromVector3(force);
          distS.phi -= Math.pow(distS.phi / Math.PI, 2);
          distS.radius -= dist.y;
          force.add(dist.setFromSpherical(distS.makeSafe()));
          // apply flower shape force
          dist.set(0, 0, 0);
          force.lerp(dist, gravitationalForce);
          // apply (clamped distance-dampened) force to vector...
          v.lerp(force, Math.min(0.25, Math.max(0, v.distanceToSquared(force))));
          // apply new position to positions array
          ppositions[index++] = v.x;
          ppositions[index++] = v.y;
          ppositions[index++] = v.z;
          // set leaf transform
          tempSpherical.setFromVector3(v);
          tempQuaternion.setFromUnitVectors(axis, v.clone().normalize());
          tempObject.scale.setScalar(center.distanceTo(v));
          tempObject.scale.x /= Math.max(0.75, v.y);
          tempObject.quaternion.copy(tempQuaternion);
          tempObject.rotateOnAxis(axis, tempSpherical.theta);
          tempObject.updateMatrix();
          mref.current.setMatrixAt((index / 3) - 1, tempObject.matrix);
        }
      });
      // set draw range of points to size of nodes
      pref.current.geometry.setDrawRange(0, index / 3);
      // set needsUpdate flag for colors/positions
      pref.current.geometry.attributes.position.needsUpdate = true;

      mref.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <points ref={pref}>
        <bufferGeometry />
        <pointsMaterial size={0.05} color='white' />
      </points>
      <instancedMesh ref={mref} args={[null, null, max]}>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            args={[attributes.positions, 3]}
          />
          <bufferAttribute
            attachObject={['attributes', 'normal']}
            args={[attributes.normals, 3]}
          />
        </bufferGeometry>
        <meshPhysicalMaterial color='#0059ff' side={DoubleSide} />
      </instancedMesh>
    </>
  );
}
// <meshLambertMaterial color='#0059ff' side={THREE.DoubleSide} />
function Lighting () {
  const light = useRef();
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    light.current.position.copy(camera.position);
  });

  return (
    <>
      <pointLight ref={light} decay={2} distance={10} />
      <pointLight position={[0, 0.25, 0]} decay={2} distance={3} intensity={10} />
    </>
  );
}

function Controls ({ enable, ...props }) {
  const controls = useRef();

  useEffect(() => {
    if (controls.current) {
      controls.current.setPolarAngle(Math.PI / 3);
      const { position } = controls.current.object;
      tempSpherical.setFromVector3(position);
      tempSpherical.radius = 4;
      position.setFromSpherical(tempSpherical);
    }
  }, [controls]);

  return (
    <OrbitControls
      ref={controls}
      target={center}
      enablePan={false}
      enableZoom={enable}
      enableRotate={enable}
      autoRotateSpeed={-0.25}
      autoRotate
      {...props}
    />
  );
}

export default function NetworkFlower ({ enable }) {
  const core = useRef();
  const { data } = useGetNetworkQuery();
  const [nodes] = useState(new Map());

  const updateNodes = useCallback((node) => {
    // apply or assign node to nodes Map()
    if (nodes.has(node.ip)) applyObjDiff(nodes.get(node.ip), dupObj(node));
    else nodes.set(node.ip, { v: new Vector3().random(), ...dupObj(node) });
  }, [nodes]);

  // ////////////////////
  // Update Network State
  useEffect(() => {
    if (data?.length) data.forEach(updateNodes);
  }, [data, updateNodes]);
  useEffect(() => {
    // expose EventSource API and create new stream
    const { EventSource } = window;
    const source = new EventSource('https://ip.leonapp.it:8082/stream?network');
    // set stream event handlers
    // source.onopen = () => console.log('Network stream opened...');
    source.onerror = (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Network stream error:', error);
      }
    };
    source.onmessage = (message) => {
      // ignore non-object messages
      if (typeof message !== 'object') return;
      if (typeof message.data !== 'string') return;
      try { // convert data, check ip, delete eventType and update
        const update = JSON.parse(message.data);
        const { ip } = update;
        if (typeof ip !== 'string') return;
        delete update.eventType;
        updateNodes(update);
      } catch (error) {
        // catch process breaking error
        if (process.env.NODE_ENV === 'development') {
          console.error('Message parsing error:', error);
        }
      }
    };
    // return unmount/cleanup function
    return () => source.close();
  }, [updateNodes]);

  return (
    <Canvas>
      <Controls enable={enable} maxDistance={4 + (nodes.size || 0)} />
      <Lighting />
      <mesh ref={core} scale={0.0025 * (nodes.size || 0)}>
        <sphereGeometry />
        <meshBasicMaterial transparent color='lime' />
      </mesh>
      <Nodes nodes={nodes} />
      <Stars count={500} fade />
      {/*
      <EffectComposer>
        <Bloom
          intensity={10} height={1600}
          luminanceThreshold={0.25} luminanceSmoothing={0.9}
        />
        {core.current && (
          <GodRays sun={core.current} exposure={2} blur />
        )}
      </EffectComposer>
      */}
    </Canvas>
  );
}
