import React, { useState } from 'react';
import { Cpu, Zap, Activity, BookOpen, Layers } from 'lucide-react';

const DidacticModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const modules = [
    {
      title: "1. ¿Qué es un Robot?",
      icon: <Activity className="w-5 h-5" />,
      content: (
        <div className="space-y-4 animate-fadeIn">
          <p className="text-lg text-white">
            Un robot no es magia, es una máquina que sigue el ciclo <span className="text-stark-blue font-bold">S-P-A</span>:
          </p>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <div className="bg-blue-500/20 p-2 rounded text-blue-400"><Activity size={18}/></div>
              <div>
                <strong className="text-blue-400 block">SENSE (Sentir)</strong>
                Sensores que captan el mundo (cámaras, botones, ultrasonido). En DUM-E, ¡tú eres el sensor controlando la app!
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <div className="bg-purple-500/20 p-2 rounded text-purple-400"><Cpu size={18}/></div>
              <div>
                <strong className="text-purple-400 block">PLAN (Pensar)</strong>
                El controlador (Arduino). Recibe datos y decide qué hacer basándose en tu código.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <div className="bg-green-500/20 p-2 rounded text-green-400"><Zap size={18}/></div>
              <div>
                <strong className="text-green-400 block">ACT (Actuar)</strong>
                Motores o luces que ejecutan la acción. DUM-E usa servomotores para moverse.
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      title: "2. Anatomía DUM-E",
      icon: <Layers className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            El brazo DUM-E imita la estructura biológica humana para lograr movimientos complejos.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-slate-800 p-3 rounded border-l-2 border-stark-blue">
              <h4 className="font-bold text-white">La Base (Cintura)</h4>
              <p className="text-sm text-slate-400 mt-1">Gira 180° horizontalmente. Permite al robot orientarse hacia cualquier dirección.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border-l-2 border-stark-blue">
              <h4 className="font-bold text-white">Hombro y Codo</h4>
              <p className="text-sm text-slate-400 mt-1">Proporcionan la altura y el alcance (extensión). Trabajan juntos para posicionar la mano.</p>
            </div>
            <div className="bg-slate-800 p-3 rounded border-l-2 border-stark-blue col-span-2">
              <h4 className="font-bold text-white">Pinza (Gripper)</h4>
              <p className="text-sm text-slate-400 mt-1">El "Efector Final". Es la herramienta que interactúa con el objeto. ¡Cuidado con apretar demasiado!</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Los Músculos (Servos)",
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">
            Usamos motores <span className="text-yellow-400 font-mono">SG90 / MG90S</span>. A diferencia de un motor de juguete que gira sin parar, estos son inteligentes.
          </p>
          <div className="relative h-32 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center border border-slate-700 mt-4">
             <div className="absolute inset-0 bg-blue-500/5"></div>
             <div className="text-center">
                <div className="text-4xl font-mono font-bold text-white">PWM</div>
                <div className="text-xs text-stark-blue">Pulse Width Modulation</div>
             </div>
          </div>
          <p className="text-sm text-slate-400">
            Enviamos pulsos eléctricos. Si el pulso dura <strong>1ms</strong>, el servo va a <strong>0°</strong>. Si dura <strong>2ms</strong>, va a <strong>180°</strong>. El Arduino se encarga de cronometrar esto con precisión de microsegundos.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-slate-700 mb-4 overflow-x-auto">
        {modules.map((m, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === idx 
                ? 'text-stark-blue border-b-2 border-stark-blue bg-slate-800/50' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
            }`}
          >
            {m.icon}
            {m.title}
          </button>
        ))}
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="text-stark-blue"/> 
          {modules[activeTab].title}
        </h2>
        {modules[activeTab].content}
      </div>
    </div>
  );
};

export default DidacticModule;