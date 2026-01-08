import React from 'react';
import { RobotState } from '../../src/types';
import { Sliders, Maximize2, MoveVertical, Grab } from 'lucide-react';

interface Props {
  state: RobotState;
  onChange: (key: keyof RobotState, value: number) => void;
  disabled?: boolean;
}

const SliderControl: React.FC<{
  label: string;
  value: number;
  icon: React.ReactNode;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}> = ({ label, value, icon, min = 0, max = 180, onChange, disabled }) => (
  <div className="mb-6 group">
    <div className="flex justify-between items-center mb-2 text-stark-blue font-mono text-sm">
      <div className="flex items-center gap-2">
        {icon}
        <span className="tracking-widest uppercase">{label}</span>
      </div>
      <span className="bg-slate-800 px-2 py-1 rounded text-white">{value}°</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-stark-blue hover:accent-cyan-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const ControlPanel: React.FC<Props> = ({ state, onChange, disabled }) => {
  return (
    <div className="h-full flex flex-col justify-center p-6">
      <h3 className="text-xl text-white font-bold mb-6 border-b border-slate-700 pb-2 flex items-center gap-2">
        <Sliders className="w-5 h-5 text-stark-blue" />
        MANUAL OVERRIDE
      </h3>
      
      <SliderControl 
        label="Base (Rotation)" 
        value={state.base} 
        icon={<Maximize2 className="w-4 h-4" />}
        onChange={(v) => onChange('base', v)} 
        disabled={disabled}
      />
      
      <SliderControl 
        label="Shoulder (Lift)" 
        value={state.shoulder} 
        icon={<MoveVertical className="w-4 h-4" />}
        onChange={(v) => onChange('shoulder', v)} 
        disabled={disabled}
      />
      
      <SliderControl 
        label="Elbow (Reach)" 
        value={state.elbow} 
        icon={<MoveVertical className="w-4 h-4" />}
        onChange={(v) => onChange('elbow', v)} 
        disabled={disabled}
      />
      
      <SliderControl 
        label="Gripper (Claw)" 
        value={state.gripper} 
        icon={<Grab className="w-4 h-4" />}
        onChange={(v) => onChange('gripper', v)} 
        disabled={disabled}
      />

      <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded text-xs text-yellow-500 font-mono">
        ⚠ WARNING: Watch for physical collisions. The simulator does not detect self-collision.
      </div>
    </div>
  );
};

export default ControlPanel;