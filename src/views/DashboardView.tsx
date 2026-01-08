import React from 'react';
import { BookOpen, Cpu, PlayCircle, Terminal } from 'lucide-react';
import { ViewMode, RobotState } from '../types'; 
import RobotSimulator from '../components/RobotSimulator';

interface Props {
  setMode: (mode: ViewMode) => void;
  robotState: RobotState; 
}

export const DashboardView: React.FC<Props> = ({ setMode, robotState }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full p-6 bg-[#050a14]">
      <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white mb-2">DUM-E <span className="text-[#00f0ff]">LAB</span></h1>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-8">
          <MenuButton icon={<BookOpen className="text-[#00f0ff]"/>} label="LEARN" onClick={() => setMode('LEARN')} />
          <MenuButton icon={<Cpu className="text-green-400"/>} label="CONTROL" onClick={() => setMode('MANUAL')} />
          <MenuButton icon={<PlayCircle className="text-purple-400"/>} label="SEQUENCE" onClick={() => setMode('SEQUENCE')} />
          <MenuButton icon={<Terminal className="text-orange-400"/>} label="FIRMWARE" onClick={() => setMode('FIRMWARE')} />
        </div>
      </div>
      <div className="bg-slate-950 rounded-xl border border-slate-700 relative min-h-[300px]">
        <RobotSimulator state={robotState} />
      </div>
    </div>
  );
};

const MenuButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button onClick={onClick} className="bg-slate-800 hover:bg-slate-700 p-4 rounded-lg border border-slate-600 flex flex-col items-center gap-2 transition-all">
    {icon}
    <span className="font-mono text-sm text-white uppercase">{label}</span>
  </button>
);

export default DashboardView;