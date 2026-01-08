import React from 'react';
import { BookOpen, Cpu } from 'lucide-react';
import { ViewMode, RobotState } from '../types';
import RobotSimulator3D from '../components/RobotSimulator3D';

interface DashboardProps {
  setMode: (mode: ViewMode) => void;
  robotState: RobotState;
}

export const DashboardView: React.FC<DashboardProps> = ({ setMode, robotState }) => {
  return (
    /* Contenedor relativo para que el simulador (fixed) quede por debajo */
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      
      {/* CAPA FONDO */}
      <RobotSimulator3D state={robotState} isExploded={false} />

      {/* CAPA INTERFAZ (Centrada automáticamente por el flex del padre) */}
      <div className="relative z-10 flex flex-col items-center animate-in fade-in duration-700">
        <h1 className="text-8xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] mb-12">
          DUM-E <span className="text-cyan-400">3D</span>
        </h1>
        
        <div className="flex gap-8">
          <button onClick={() => setMode('MANUAL')} className="bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col items-center gap-4 shadow-2xl">
             <Cpu className="text-cyan-400 w-12 h-12" />
             <span className="text-xl font-bold text-white tracking-widest">CONTROL</span>
          </button>
          <button onClick={() => setMode('LEARN')} className="bg-slate-900/80 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col items-center gap-4 shadow-2xl">
             <BookOpen className="text-cyan-400 w-12 h-12" />
             <span className="text-xl font-bold text-white tracking-widest">LEARN</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;