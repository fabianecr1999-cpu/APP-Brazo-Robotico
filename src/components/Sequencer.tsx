import React, { useState, useEffect } from 'react';
import { RobotState, SequenceStep } from '../../src/types';
import { Plus, Play, Trash2, Save, RotateCcw } from 'lucide-react';

interface Props {
  currentState: RobotState;
  onRunSequence: (steps: SequenceStep[]) => void;
  isExecuting: boolean;
}

const Sequencer: React.FC<Props> = ({ currentState, onRunSequence, isExecuting }) => {
  const [steps, setSteps] = useState<SequenceStep[]>([]);

  const addStep = () => {
    const newStep: SequenceStep = {
      id: Date.now().toString(),
      name: `Step ${steps.length + 1}`,
      state: { ...currentState },
      duration: 1000,
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const clearSequence = () => {
    setSteps([]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">MOTION SEQUENCER</h3>
        <div className="flex gap-2">
          <button 
            onClick={clearSequence}
            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            title="Clear All"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg overflow-y-auto p-2 space-y-2 mb-4">
        {steps.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
            <Save size={40} className="mb-2"/>
            <p>No steps recorded.</p>
            <p className="text-xs">Move robot manually, then click "Add Step"</p>
          </div>
        ) : (
          steps.map((step, index) => (
            <div key={step.id} className="flex items-center justify-between bg-slate-800 p-3 rounded border border-slate-700 animate-fadeIn">
              <div className="flex items-center gap-3">
                <span className="bg-stark-blue/20 text-stark-blue text-xs font-mono w-6 h-6 flex items-center justify-center rounded-full">
                  {index + 1}
                </span>
                <div>
                  <div className="text-sm font-bold text-white">{step.name}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    B{step.state.base} S{step.state.shoulder} E{step.state.elbow} G{step.state.gripper}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => removeStep(step.id)}
                className="text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={addStep}
          disabled={isExecuting}
          className="flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          <Plus size={20} />
          ADD CURRENT POS
        </button>
        <button
          onClick={() => onRunSequence(steps)}
          disabled={steps.length === 0 || isExecuting}
          className={`flex items-center justify-center gap-2 p-3 rounded-lg font-bold text-black transition-all ${
            isExecuting 
              ? 'bg-yellow-500 cursor-wait' 
              : 'bg-stark-blue hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
          } disabled:opacity-50 disabled:shadow-none`}
        >
          <Play size={20} className={isExecuting ? "animate-pulse" : ""} />
          {isExecuting ? 'EXECUTING...' : 'RUN SEQUENCE'}
        </button>
      </div>
    </div>
  );
};

export default Sequencer;