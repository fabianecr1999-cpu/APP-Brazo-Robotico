import React from 'react';
import { Terminal, Download, Copy, CheckCircle } from 'lucide-react';
import { ARDUINO_SKETCH } from '../constants';

export const FirmwareView: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ARDUINO_SKETCH);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Terminal className="text-cyan-400" /> ROBOT FIRMWARE
          </h2>
          <p className="text-slate-400 text-sm font-mono mt-1">Carga este código en tu Arduino Nano/Uno via USB.</p>
        </div>
        
        <button 
          onClick={copyToClipboard}
          className={`flex items-center gap-2 px-6 py-2 rounded font-bold transition-all ${
            copied ? 'bg-green-500 text-white' : 'bg-cyan-400 text-black hover:bg-cyan-300'
          }`}
        >
          {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          {copied ? '¡COPIADO!' : 'COPIAR CÓDIGO'}
        </button>
      </div>

      {/* Visor de Código */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-slate-700 overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-500 font-mono ml-2">DUM_E_Controller.ino</span>
        </div>
        <pre className="flex-1 overflow-auto font-mono text-[10px] md:text-xs text-green-400/90 leading-relaxed custom-scrollbar">
          {ARDUINO_SKETCH}
        </pre>
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
        <p className="text-xs text-blue-400 font-mono">
          <span className="font-bold">CONSEJO:</span> Asegúrate de tener instalada la librería <code className="bg-blue-500/20 px-1 rounded text-white">Servo.h</code> en tu Arduino IDE antes de compilar.
        </p>
      </div>
    </div>
  );
};

export default FirmwareView;