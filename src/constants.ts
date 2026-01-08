export const INITIAL_ROBOT_STATE = {
  base: 90,
  shoulder: 90,
  elbow: 90,
  gripper: 45
};

export const ARDUINO_SKETCH = `
/*
 * DUM-E Robot Arm Controller
 * Optimized for Smooth Motion (Easing)
 * 
 * Hardware: 
 * - Arduino Nano / ESP32
 * - 4x Servos (SG90/MG90S)
 * - Power: External 5V 2A Power Supply (Common Ground with Arduino)
 * 
 * Protocol:
 * Recieves JSON-like string: "B90S45E120G0" 
 * (Base, Shoulder, Elbow, Gripper) ending with newline.
 */

#include <Servo.h>

// PIN CONFIGURATION (Adjust as needed)
const int PIN_BASE = 3;
const int PIN_SHOULDER = 5;
const int PIN_ELBOW = 6;
const int PIN_GRIPPER = 9;

Servo baseServo;
Servo shoulderServo;
Servo elbowServo;
Servo gripperServo;

// Current positions
float curBase = 90;
float curShoulder = 90;
float curElbow = 90;
float curGripper = 45;

// Target positions
int targetBase = 90;
int targetShoulder = 90;
int targetElbow = 90;
int targetGripper = 45;

// Smoothing factor (Lower = Slower/Smoother)
// 0.05 is very smooth, 0.5 is fast
const float EASING = 0.08; 

void setup() {
  Serial.begin(9600);
  
  baseServo.attach(PIN_BASE);
  shoulderServo.attach(PIN_SHOULDER);
  elbowServo.attach(PIN_ELBOW);
  gripperServo.attach(PIN_GRIPPER);

  // Initial Move
  baseServo.write(curBase);
  shoulderServo.write(curShoulder);
  elbowServo.write(curElbow);
  gripperServo.write(curGripper);
  
  Serial.println("DUM-E READY");
}

void loop() {
  readSerialCommand();
  updateServos();
  delay(15); // Small delay for servo stability
}

void readSerialCommand() {
  if (Serial.available() > 0) {
    char c = Serial.read();
    
    // Simple parsing protocol: Letter followed by Number
    // B90 S45 E120 G0
    
    if (c == 'B') targetBase = Serial.parseInt();
    else if (c == 'S') targetShoulder = Serial.parseInt();
    else if (c == 'E') targetElbow = Serial.parseInt();
    else if (c == 'G') targetGripper = Serial.parseInt();
    
    // Consume newline if present
    if (Serial.peek() == '\\n') Serial.read();
  }
}

void updateServos() {
  // Smoothly interpolate current towards target
  
  if (abs(curBase - targetBase) > 0.5) {
    curBase += (targetBase - curBase) * EASING;
    baseServo.write((int)curBase);
  }
  
  if (abs(curShoulder - targetShoulder) > 0.5) {
    curShoulder += (targetShoulder - curShoulder) * EASING;
    shoulderServo.write((int)curShoulder);
  }
  
  if (abs(curElbow - targetElbow) > 0.5) {
    curElbow += (targetElbow - curElbow) * EASING;
    elbowServo.write((int)curElbow);
  }
  
  if (abs(curGripper - targetGripper) > 0.5) {
    curGripper += (targetGripper - curGripper) * EASING;
    gripperServo.write((int)curGripper);
  }
}
`;
