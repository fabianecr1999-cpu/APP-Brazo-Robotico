import { useState, useCallback, useEffect } from 'react';
import type { SerialPort } from '../../src/types';

export const useSerial = () => {
  const [port, setPort] = useState<SerialPort | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[useSerial] Hook initialized");
  }, []);

  const connect = useCallback(async () => {
    console.log("[useSerial] Connect requested");
    try {
      if (!('serial' in navigator)) {
        throw new Error("Web Serial API no soportada en este navegador. Usa Chrome o Edge.");
      }
      // @ts-ignore: Navigator.serial is experimental
      const p = await navigator.serial.requestPort();
      console.log("[useSerial] Port selected by user");
      await p.open({ baudRate: 9600 });
      console.log("[useSerial] Port opened successfully");
      setPort(p);
      setIsConnected(true);
      setError(null);
    } catch (err: any) {
      console.error("[useSerial] Connection error:", err);
      setError(err.message || "Error conectando al dispositivo");
      setIsConnected(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    console.log("[useSerial] Disconnect requested");
    if (port) {
      try {
        await port.close();
        console.log("[useSerial] Port closed");
      } catch (e) {
        console.error("[useSerial] Error closing port:", e);
      }
    }
    setPort(null);
    setIsConnected(false);
  }, [port]);

  const write = useCallback(async (data: string) => {
    if (!port || !port.writable) {
      console.warn("[useSerial] Write attempted but port not writable");
      return;
    }
    try {
      const encoder = new TextEncoder();
      const writer = port.writable.getWriter();
      await writer.write(encoder.encode(data));
      writer.releaseLock();
    } catch (err) {
      console.error("[useSerial] Write error:", err);
      setError("Error enviando datos");
    }
  }, [port]);

  return { isConnected, connect, disconnect, write, error };
};