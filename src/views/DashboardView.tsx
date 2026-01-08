import React from 'react';
import { BookOpen, Cpu, PlayCircle, Terminal } from 'lucide-react';
import { ViewMode, RobotState } from '../types';
import RobotSimulator from '../components/RobotSimulator';

interface Props { setMode: (mode: ViewMode) => void; robotState: RobotState; }

export const DashboardView: React.FC<Props> = ({ setMode, robotState }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-full w-full max-w-7xl mx-auto p-10 items-center">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-6xl font-bold text-white mb-2 tracking-tighter">DUM-E <span className="text-cyan-400">LAB</span></h1>
        <p className="text-slate-500 font-mono text-xs mb-10 tracking-[0.5em]">SYSTEM INTERFACE V1.0</p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button onClick={() => setMode('LEARN')} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-400 transition-all flex flex-col items-center gap-3">
            <BookOpen className="text-cyan-400" /><span className="text-xs text-white font-bold">LEARN</span>
          </button>
          <button onClick={() => setMode('MANUAL')} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 hover:border-green-400 transition-all flex flex-col items-center gap-3">
            <Cpu className="text-green-400" /><span className="text-xs text-white font-bold">CONTROL</span>
          </button>
          <button onClick={() => setMode('SEQUENCE')} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-400 transition-all flex flex-col items-center gap-3">
            <PlayCircle className="text-purple-400" /><span className="text-xs text-white font-bold">SEQUENCE</span>
          </button>
          <button onClick={() => setMode('FIRMWARE')} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700 hover:border-orange-400 transition-all flex flex-col items-center gap-3">
            <Terminal className="text-orange-400" /><span className="text-xs text-white font-bold">FIRMWARE</span>
          </button>
        </div>
      </div>
      <div className="h-full max-h-[500px] w-full bg-slate-900/30 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        <RobotSimulator state={robotState} />
      </div>
    </div>
  );
};

export default DashboardView;