import React from 'react';
import { RobotState } from '../types'; //

interface Props {
  state: RobotState;
}

const RobotSimulator: React.FC<Props> = ({ state }) => {
  // Dimensiones escaladas para que el robot quepa perfectamente en el centro
  const baseHeight = 35;     
  const shoulderLength = 75;  
  const elbowLength = 65;     
  
  // Coordenadas para centrar el robot en un lienzo de 300x300
  const startX = 150;        
  const startY = 220;        

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  // Cálculos cinemáticos corregidos
  const shoulderY = startY - baseHeight;
  const shoulderRad = toRad(state.shoulder - 90); 
  const elbowX = startX + shoulderLength * Math.cos(shoulderRad);
  const elbowY = shoulderY + shoulderLength * Math.sin(shoulderRad);

  const elbowRad = shoulderRad + toRad(state.elbow - 90); 
  const gripperX = elbowX + elbowLength * Math.cos(elbowRad);
  const gripperY = elbowY + elbowLength * Math.sin(elbowRad);

  const gripOpenAmt = (state.gripper / 180) * 15;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0f1d] rounded-xl border border-slate-800 relative overflow-hidden p-2">
      {/* Indicador de Estado Superior */}
      <div className="absolute top-4 w-full text-center z-10">
        <span className="text-[10px] font-mono text-cyan-500/40 tracking-[0.3em] uppercase">
          Digital Twin // Viewport Centered
        </span>
      </div>

      {/* El SVG ahora tiene límites de altura para no hacerse gigante */}
      <svg 
        viewBox="0 0 300 300" 
        className="w-full h-auto max-h-[60vh] max-w-[500px] drop-shadow-[0_0_30px_rgba(0,240,255,0.15)]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Guía de suelo minimalista */}
        <line x1="60" y1={startY} x2="240" y2={startY} stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        
        {/* Base Estilizada */}
        <path 
          d={`M${startX - 22},${startY} L${startX + 22},${startY} L${startX + 12},${shoulderY} L${startX - 12},${shoulderY} Z`} 
          fill="#111827" 
          stroke="#00f0ff" 
          strokeWidth="2" 
        />
        
        {/* Brazo: Hombro -> Codo */}
        <line x1={startX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#00f0ff" strokeWidth="10" strokeLinecap="round" />
        
        {/* Brazo: Codo -> Pinza */}
        <line x1={elbowX} y1={elbowY} x2={gripperX} y2={gripperY} stroke="#00f0ff" strokeWidth="7" strokeLinecap="round" />
        
        {/* Articulaciones de alto contraste */}
        <circle cx={startX} cy={shoulderY} r="5.5" fill="#050a14" stroke="#ffffff" strokeWidth="2" />
        <circle cx={elbowX} cy={elbowY} r="4.5" fill="#050a14" stroke="#ffffff" strokeWidth="2" />

        {/* Pinza (Efector Final) */}
        <g transform={`translate(${gripperX}, ${gripperY}) rotate(${(elbowRad * 180) / Math.PI})`}>
           <line x1="0" y1="-4" x2="15" y2={-4 - gripOpenAmt} stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
           <line x1="0" y1="4" x2="15" y2={4 + gripOpenAmt} stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      {/* Datos de posición discretos en la esquina */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center opacity-50">
        <div className="font-mono text-[9px] text-cyan-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
          DATA_STREAM: B{state.base}° S{state.shoulder}° E{state.elbow}° G{state.gripper}°
        </div>
      </div>
    </div>
  );
};

export default RobotSimulator;