import React from 'react';
import { Terminal, Download } from 'lucide-react';
import { ARDUINO_SKETCH } from '../constants';

export const FirmwareView: React.FC = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ARDUINO_SKETCH);
    alert("Código copiado.");
  };

  return (
    <div className="p-6 h-full flex flex-col gap-4 bg-[#050a14]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Terminal className="text-cyan-400" /> ARDUINO FIRMWARE
        </h2>
        <button onClick={copyToClipboard} className="bg-cyan-400 text-black px-4 py-2 rounded font-bold hover:bg-cyan-300">
          COPY CODE
        </button>
      </div>
      <pre className="flex-1 bg-black/50 p-4 rounded-lg border border-slate-700 overflow-auto font-mono text-xs text-green-400">
        {ARDUINO_SKETCH}
      </pre>
    </div>
  );
};

export default FirmwareView; // Esto arregla el error "Property default is missing"