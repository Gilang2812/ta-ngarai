import React, { useTransition } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-white p-4 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}