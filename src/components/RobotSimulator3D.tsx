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
    /* Eliminamos la posición manual del grupo, Center se encargará */
    <group scale={[4.5, 4.5, 4.5]}>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.2, 32]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <group rotation={[0, (state.base * Math.PI) / 180, 0]}>
        <group position={[0, 0.2 + gap, 0]} rotation={[0, 0, ((state.shoulder - 90) * Math.PI) / 180]}>
          <mesh position={[0, 0.6, 0]} castShadow>
            <boxGeometry args={[0.25, 1.2, 0.25]} />
            <meshStandardMaterial color="#00f0ff" />
          </mesh>
          
          <group position={[0, 1.2 + gap, 0]} rotation={[0, 0, ((state.elbow - 90) * Math.PI) / 180]}>
            <mesh position={[0, 0.5, 0]} castShadow>
              <boxGeometry args={[0.2, 1.0, 0.2]} />
              <meshStandardMaterial color="#00f0ff" />
            </mesh>
            
            <group position={[0, 1.0 + gap, 0]}>
              <mesh castShadow>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#ff4757" />
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
    /* Forzamos dimensiones fijas en pixeles de la ventana para evitar errores de cálculo */
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Canvas 
        shadows 
        camera={{ position: [15, 0, 15], fov: 35 }} 
        style={{ width: '100%', height: '100%' }}
      >
        <OrbitControls makeDefault enablePan={false} />
        <Suspense fallback={null}>
          {/* El complemento <Center> posiciona el brazo exactamente al centro del Canvas */}
          <Center top>
            <RobotModel {...props} />
          </Center>
          <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={30} blur={2.5} far={10} />
        </Suspense>
        <Grid 
          infiniteGrid 
          position={[0, -2, 0]}
          fadeDistance={50} 
          cellColor="#334155" 
          sectionColor="#00f0ff" 
          sectionSize={3} 
        />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
      </Canvas>
    </div>
  );
};

export default RobotSimulator3D;