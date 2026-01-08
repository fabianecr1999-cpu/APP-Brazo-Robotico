import React from 'react';

interface SidebarContainerProps {
  children: React.ReactNode;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({ children }) => {
  return (
    /* pointer-events-none permite rotar el robot de fondo aunque el panel esté ahí */
    <aside className="absolute left-8 top-24 bottom-8 w-96 z-40 pointer-events-none flex flex-col gap-6">
      <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-8 shadow-2xl pointer-events-auto overflow-y-auto max-h-full scrollbar-hide text-white">
        {children}
      </div>
    </aside>
  );
};

export default SidebarContainer;