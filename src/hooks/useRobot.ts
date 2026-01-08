import { useState, useRef, useEffect, useCallback } from 'react';
import type { RobotState, SequenceStep } from '../../src/types';
import { INITIAL_ROBOT_STATE } from '../../src/constants';

// Interface segregation: UseRobot only needs to know how to write, not how to connect
interface SerialWriter {
  isConnected: boolean;
  write: (data: string) => Promise<void>;
}

export const useRobot = (serial: SerialWriter) => {
  const [state, setState] = useState<RobotState>(INITIAL_ROBOT_STATE);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const lastSentTime = useRef<number>(0);
  const pendingUpdate = useRef<RobotState | null>(null);

  useEffect(() => {
    console.log("[useRobot] Hook initialized. Initial state:", state);
  }, []);

  const serializeState = (s: RobotState) => 
    `B${s.base}S${s.shoulder}E${s.elbow}G${s.gripper}\n`;

  useEffect(() => {
    const loop = setInterval(() => {
      if (pendingUpdate.current && serial.isConnected) {
        const now = Date.now();
        if (now - lastSentTime.current > 50) { 
          serial.write(serializeState(pendingUpdate.current));
          lastSentTime.current = now;
          pendingUpdate.current = null;
        }
      }
    }, 20);
    return () => clearInterval(loop);
  }, [serial.isConnected, serial.write]);

  const setManualState = useCallback((key: keyof RobotState, value: number) => {
    if (isExecuting) return;
    setState(prev => {
      const next = { ...prev, [key]: value };
      if (serial.isConnected) {
        pendingUpdate.current = next;
      }
      return next;
    });
  }, [isExecuting, serial.isConnected]);

  const resetState = useCallback(() => {
    console.log("[useRobot] Reset state");
    setState(INITIAL_ROBOT_STATE);
    if (serial.isConnected) pendingUpdate.current = INITIAL_ROBOT_STATE;
  }, [serial.isConnected]);

  const runSequence = useCallback(async (steps: SequenceStep[]) => {
    if (isExecuting) return;
    console.log("[useRobot] Starting sequence:", steps.length, "steps");
    setIsExecuting(true);
    
    for (const step of steps) {
      console.log("[useRobot] Step:", step.name);
      setState(step.state);
      if (serial.isConnected) {
        await serial.write(serializeState(step.state));
      }
      await new Promise(r => setTimeout(r, step.duration));
    }
    
    setIsExecuting(false);
    console.log("[useRobot] Sequence complete");
  }, [isExecuting, serial.isConnected, serial.write]);

  return { state, setManualState, resetState, runSequence, isExecuting };
};