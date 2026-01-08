import React from 'react';
import { RobotState } from '../types';

interface Props { state: RobotState; }

const RobotSimulator: React.FC<Props> = ({ state }) => {
  // Parámetros de dibujo fijos para evitar que desaparezca
  const baseHeight = 25;
  const shoulderLength = 70;
  const elbowLength = 60;
  
  // Punto de anclaje central en un lienzo de 300x300
  const startX = 150; 
  const startY = 220; 

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const shoulderY = startY - baseHeight;
  const shoulderRad = toRad(state.shoulder - 90); 
  const elbowX = startX + shoulderLength * Math.cos(shoulderRad);
  const elbowY = shoulderY + shoulderLength * Math.sin(shoulderRad);
  const elbowRad = shoulderRad + toRad(state.elbow - 90); 
  const gripperX = elbowX + elbowLength * Math.cos(elbowRad);
  const gripperY = elbowY + elbowLength * Math.sin(elbowRad);

  const gripOpenAmt = (state.gripper / 180) * 15;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#0a0f1d] border border-slate-800 rounded-xl overflow-hidden min-h-[350px]">
      <div className="absolute top-4 text-[10px] font-mono text-cyan-500/40 uppercase tracking-widest">Digital Twin // Hard-Coded View</div>
      
      {/* SVG con medidas fijas de respaldo para forzar visibilidad */}
      <svg 
        width="300" 
        height="300" 
        viewBox="0 0 300 300" 
        className="drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]"
        style={{ display: 'block', margin: 'auto' }}
      >
        <line x1="50" y1={startY} x2="250" y2={startY} stroke="#1e293b" strokeWidth="2" />
        <path d={`M${startX-20},${startY} L${startX+20},${startY} L${startX+12},${shoulderY} L${startX-12},${shoulderY} Z`} fill="#111827" stroke="#00f0ff" strokeWidth="2" />
        <line x1={startX} y1={shoulderY} x2={elbowX} y2={elbowY} stroke="#00f0ff" strokeWidth="12" strokeLinecap="round" />
        <line x1={elbowX} y1={elbowY} x2={gripperX} y2={gripperY} stroke="#00f0ff" strokeWidth="8" strokeLinecap="round" />
        <circle cx={startX} cy={shoulderY} r="6" fill="#050a14" stroke="white" strokeWidth="2" />
        <circle cx={elbowX} cy={elbowY} r="5" fill="#050a14" stroke="white" strokeWidth="2" />
        <g transform={`translate(${gripperX}, ${gripperY}) rotate(${(elbowRad * 180) / Math.PI})`}>
           <line x1="0" y1="-5" x2="18" y2={-5 - gripOpenAmt} stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
           <line x1="0" y1="5" x2="18" y2={5 + gripOpenAmt} stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export default RobotSimulator;