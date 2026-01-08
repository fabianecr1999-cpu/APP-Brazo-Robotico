import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, ContactShadows, Center } from '@react-three/drei';
import { RobotState } from '../types';

export interface RobotSimulator3DProps {
  state: RobotState;
  isExploded: boolean;
}

const RobotModel: React.FC<RobotSimulator3DProps> = ({ state, isExploded }) => {
  const gap = isExploded ? 1.5 : 0;
  return (
    <group scale={[4.5, 4.5, 4.5]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.2, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      <group rotation={[0, (state.base * Math.PI) / 180, 0]}>
        <group position={[0, 0.2 + gap, 0]} rotation={[0, 0, ((state.shoulder - 90) * Math.PI) / 180]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.25, 1.2, 0.25]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.3} />
          </mesh>
          <group position={[0, 1.2 + gap, 0]} rotation={[0, 0, ((state.elbow - 90) * Math.PI) / 180]}>
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.2, 1.0, 0.2]} />
              <meshStandardMaterial color="#00f0ff" />
            </mesh>
            <group position={[0, 1.0 + gap, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#ff4757" emissive="#ff4757" emissiveIntensity={0.5} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export const RobotSimulator3D: React.FC<RobotSimulator3DProps> = (props) => {
  return (
    /* Capa fija al fondo que ignora clics por defecto */
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-[#050a14]">
      <Canvas 
        shadows 
        /* El Canvas sí permite rotar el robot */
        className="pointer-events-auto"
        gl={{ antialias: true }} 
        camera={{ position: [15, 0, 15], fov: 35 }}
      >
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.8} enablePan={false} />
        <Suspense fallback={null}>
          <Center top>
            <RobotModel {...props} />
          </Center>
          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={30} blur={2.5} far={10} />
        </Suspense>
        <Grid infiniteGrid position={[0, -2, 0]} fadeDistance={50} cellColor="#334155" sectionColor="#00f0ff" sectionSize={3} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} castShadow />
      </Canvas>
    </div>
  );
};

export default RobotSimulator3D;