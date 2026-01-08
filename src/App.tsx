import React, { useState } from 'react';
import { Settings, Usb } from 'lucide-react';
import { ViewMode } from './types'; 
import { useSerial } from './hooks/useSerial';
import { useRobot } from './hooks/useRobot';

import DashboardView from './views/DashboardView';
import FirmwareView from './views/FirmwareView';
import RobotSimulator from './components/RobotSimulator';
import ControlPanel from './components/ControlPanel';
import DidacticModule from './components/DidacticModule';
import Sequencer from './components/Sequencer';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('DASHBOARD');
  const serial = useSerial();
  const robot = useRobot(serial);

  const renderContent = () => {
    switch (viewMode) {
      case 'DASHBOARD': return <DashboardView setMode={setViewMode} robotState={robot.state} />;
      case 'LEARN': return (
        <div className="flex gap-6 h-full w-full p-8 items-center justify-center">
          <div className="flex-1 h-full bg-slate-900/50 rounded-2xl border border-slate-700 p-6 overflow-y-auto"><DidacticModule /></div>
          <div className="w-1/3 h-full"><RobotSimulator state={robot.state} /></div>
        </div>
      );
      case 'SEQUENCE': return (
        <div className="flex gap-6 h-full w-full p-8 items-center justify-center">
          <div className="w-1/3 h-full bg-slate-900/50 rounded-2xl border border-slate-700 p-6"><Sequencer currentState={robot.state} onRunSequence={robot.runSequence} isExecuting={robot.isExecuting} /></div>
          <div className="flex-1 h-full"><RobotSimulator state={robot.state} /></div>
        </div>
      );
      case 'MANUAL': return (
        <div className="flex gap-6 h-full w-full p-8 items-center justify-center">
          <div className="w-1/3 h-full bg-slate-900/50 rounded-2xl border border-slate-700 p-6"><ControlPanel state={robot.state} onChange={robot.setManualState} disabled={robot.isExecuting} /></div>
          <div className="flex-1 h-full"><RobotSimulator state={robot.state} /></div>
        </div>
      );
      case 'FIRMWARE': return <div className="h-full w-full p-8 overflow-y-auto"><FirmwareView /></div>;
      default: return <DashboardView setMode={setViewMode} robotState={robot.state} />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#050a14] text-slate-200 overflow-hidden">
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between px-8 shrink-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('DASHBOARD')}>
          <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center"><Settings className="w-5 h-5 text-black" /></div>
          <span className="font-bold text-xl text-white uppercase tracking-tighter">DUM-E LAB</span>
        </div>
        <button onClick={serial.connect} className="bg-cyan-400/10 text-cyan-400 px-6 py-2 rounded-full border border-cyan-400/50 hover:bg-cyan-400 hover:text-black font-bold transition-all">
          {serial.isConnected ? 'SISTEMA ONLINE' : 'CONECTAR ROBOT'}
        </button>
      </header>
      <main className="flex-1 overflow-hidden relative flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;