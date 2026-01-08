import React from 'react';
import { BookOpen, Cpu } from 'lucide-react';
import { ViewMode } from '../types';

interface DashboardProps {
  setMode: (mode: ViewMode) => void;
}

export const DashboardView: React.FC<DashboardProps> = ({ setMode }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="flex flex-col items-center text-center space-y-12">
        <h1 className="text-9xl font-black text-white tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
          DUM-E <span className="text-cyan-400">3D</span>
        </h1>
        
        <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
          <button 
            onClick={() => setMode('MANUAL')} 
            className="group bg-slate-900/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 border-b-4 border-b-cyan-500 hover:bg-slate-800 transition-all flex flex-col items-center gap-4 shadow-2xl"
          >
             <Cpu className="text-cyan-400 w-16 h-16 group-hover:scale-110 transition-transform" />
             <span className="text-2xl font-bold text-white tracking-widest italic">CONTROL</span>
          </button>
          
          <button 
            onClick={() => setMode('LEARN')} 
            className="group bg-slate-900/80 backdrop-blur-xl p-12 rounded-[3rem] border border-white/10 border-b-4 border-b-purple-500 hover:bg-slate-800 transition-all flex flex-col items-center gap-4 shadow-2xl"
          >
             <BookOpen className="text-purple-500 w-16 h-16 group-hover:scale-110 transition-transform" />
             <span className="text-2xl font-bold text-white tracking-widest italic">LEARN</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;