export interface RobotState {
  base: number;     // 0-180
  shoulder: number; // 0-180
  elbow: number;    // 0-180
  gripper: number;  // 0-180
}

export type ViewMode = 'DASHBOARD' | 'LEARN' | 'MANUAL' | 'SEQUENCE' | 'FIRMWARE';

export interface SequenceStep {
  id: string;
  name: string;
  state: RobotState;
  duration: number; // ms
}

export interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  writable: WritableStream | null;
}