import { Loader2 } from 'lucide-react';

export function Loading() {
  return (
    <main className="h-[64vh] flex justify-center items-center">
      <Loader2 size={70} className="animate-spin" />
    </main>
  );
}
