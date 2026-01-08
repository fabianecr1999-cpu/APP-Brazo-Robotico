import React, { useState } from 'react';
import { LayoutDashboard, Layers } from 'lucide-react';
import { ViewMode } from './types';
import { useSerial } from './hooks/useSerial';
import { useRobot } from './hooks/useRobot';

import DashboardView from './views/DashboardView';
import FirmwareView from './views/FirmwareView';
import RobotSimulator3D from './components/RobotSimulator3D';
import ControlPanel from './components/ControlPanel';
import DidacticModule from './components/DidacticModule';
import Sequencer from './components/Sequencer';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('DASHBOARD');
  const [isExploded, setIsExploded] = useState(false);
  const serial = useSerial();
  const robot = useRobot(serial);

  return (
    <div className="w-screen h-screen relative bg-[#050a14] overflow-hidden">
      {/* CAPA 0: EL ROBOT (Fondo fijo centrado) */}
      <RobotSimulator3D state={robot.state} isExploded={isExploded} />

      {/* CAPA 1: INTERFAZ DE USUARIO (Sobre el robot) */}
      <div className="absolute inset-0 z-50 pointer-events-none flex flex-col">
        
        {/* HEADER */}
        {viewMode !== 'DASHBOARD' && (
          <header className="h-16 border-b border-white/5 bg-slate-900/40 backdrop-blur-md flex items-center justify-between px-8 pointer-events-auto">
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => setViewMode('DASHBOARD')}>
              <div className="w-9 h-9 bg-cyan-400 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <LayoutDashboard className="w-5 h-5 text-black" />
              </div>
              <span className="font-black text-2xl text-white italic">DUM-E 3D</span>
            </div>
            <div className="flex gap-2">
              {['MANUAL', 'SEQUENCE', 'LEARN', 'FIRMWARE'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as ViewMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    viewMode === mode ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
              <button onClick={serial.connect} className="bg-cyan-400 text-black px-6 py-2 rounded-full font-bold ml-4 hover:scale-105 transition-all">
                {serial.isConnected ? 'ONLINE' : 'CONNECT'}
              </button>
            </div>
          </header>
        )}

        {/* CONTENIDO INTERACTIVO */}
        <main className="flex-1 relative">
          {viewMode === 'DASHBOARD' ? (
            <div className="h-full w-full pointer-events-auto">
              <DashboardView setMode={setViewMode} />
            </div>
          ) : (
            <aside className="absolute left-10 top-10 bottom-10 w-[420px] pointer-events-auto">
              <div className="glass-panel h-full rounded-[2.5rem] p-10 overflow-y-auto scrollbar-hide flex flex-col">
                <div className="flex-1">
                  {viewMode === 'MANUAL' && <ControlPanel state={robot.state} onChange={robot.setManualState} disabled={robot.isExecuting} />}
                  {viewMode === 'LEARN' && <DidacticModule />}
                  {viewMode === 'SEQUENCE' && <Sequencer currentState={robot.state} onRunSequence={robot.runSequence} isExecuting={robot.isExecuting} />}
                  {viewMode === 'FIRMWARE' && <FirmwareView />}
                </div>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <button 
                    onClick={() => setIsExploded(!isExploded)} 
                    className={`w-full flex items-center justify-center gap-3 p-5 rounded-3xl font-bold transition-all ${isExploded ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    <Layers size={22} /> {isExploded ? 'ENSAMBLAR' : 'DESARMAR ROBOT'}
                  </button>
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;