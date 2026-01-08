import React, { useState } from 'react';
import { Settings, Usb } from 'lucide-react';
import { ViewMode } from './types'; 
import { useSerial } from './hooks/useSerial';
import { useRobot } from './hooks/useRobot';

// Importaciones corregidas
import { DashboardView } from './views/DashboardView';
import { FirmwareView } from './views/FirmwareView';
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
      case 'DASHBOARD':
        return <DashboardView setMode={setViewMode} robotState={robot.state} />;
      case 'LEARN':
        return (
          <div className="flex flex-col md:flex-row gap-6 h-full p-6 overflow-hidden bg-[#050a14]">
            <div className="flex-1 bg-slate-900/50 rounded-xl p-6 border border-slate-700 overflow-y-auto">
              <DidacticModule />
            </div>
            <div className="w-full md:w-80"><RobotSimulator state={robot.state} /></div>
          </div>
        );
      case 'SEQUENCE':
        return (
          <div className="flex flex-col md:flex-row gap-6 h-full p-6 overflow-hidden bg-[#050a14]">
            <div className="w-full md:w-96 bg-slate-900/50 rounded-xl border border-slate-700 p-6">
              <Sequencer currentState={robot.state} onRunSequence={robot.runSequence} isExecuting={robot.isExecuting} />
            </div>
            <div className="flex-1"><RobotSimulator state={robot.state} /></div>
          </div>
        );
      case 'MANUAL':
        return (
          <div className="flex flex-col md:flex-row gap-6 h-full p-6 bg-[#050a14]">
            <div className="w-full md:w-96 bg-slate-900/50 rounded-xl border border-slate-700 shadow-2xl">
              <ControlPanel state={robot.state} onChange={robot.setManualState} disabled={robot.isExecuting} />
            </div>
            <div className="flex-1 relative"><RobotSimulator state={robot.state} /></div>
          </div>
        );
      case 'FIRMWARE':
        return <FirmwareView />;
      default:
        return <DashboardView setMode={setViewMode} robotState={robot.state} />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#050a14] text-slate-200 overflow-hidden font-sans">
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between px-6 backdrop-blur-md z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('DASHBOARD')}>
          <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <Settings className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold text-xl tracking-widest text-white uppercase">DUM-E LAB</span>
        </div>
        <button onClick={serial.connect} className="bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded border border-cyan-400/50 hover:bg-cyan-400 hover:text-black font-bold transition-all">
          {serial.isConnected ? 'SISTEMA ONLINE' : 'CONECTAR ROBOT'}
        </button>
      </header>
      <main className="flex-1 overflow-hidden">{renderContent()}</main>
    </div>
  );
};

export default App;