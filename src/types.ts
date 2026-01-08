export interface RobotState {
  base: number;     // 0-180
  shoulder: number; // 0-180
  elbow: number;    // 0-180
  gripper: number;  // 0-180 (0=closed, 180=open usually, depends on mechanics)
}

export interface SequenceStep {
  id: string;
  name: string;
  state: RobotState;
  duration: number; // ms to wait after moving
}

export type ViewMode = 'DASHBOARD' | 'LEARN' | 'MANUAL' | 'SEQUENCE' | 'FIRMWARE';

export interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  writable: WritableStream | null;
}

// Web Serial API Types (not fully included in all TS configs)
export interface SerialPort {
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  writable: WritableStream | null;
}
