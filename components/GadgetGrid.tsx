import type { Gadget } from '../App';
import { GadgetCard } from './GadgetCard';

interface GadgetGridProps {
  gadgets: Gadget[];
}

export function GadgetGrid({ gadgets }: GadgetGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-500 uppercase text-sm tracking-wide">
          {gadgets.length} {gadgets.length === 1 ? 'product' : 'products'} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gadgets.map((gadget) => (
          <GadgetCard key={gadget.id} gadget={gadget} />
        ))}
      </div>
    </div>
  );
}
