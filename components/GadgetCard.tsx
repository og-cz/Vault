import type { Gadget } from '../App';
import { ImageWithFallback } from './figma_assets/ImageWithFallback';
import { Star, ShoppingCart } from 'lucide-react';

interface GadgetCardProps {
  gadget: Gadget;
}

export function GadgetCard({ gadget }: GadgetCardProps) {
  return (
    <div className="bg-zinc-900 border border-red-900/30 overflow-hidden hover:border-red-600/50 transition-all duration-300 group">
      <div className="aspect-square overflow-hidden bg-black relative">
        <ImageWithFallback
          src={gadget.image}
          alt={gadget.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-white mb-2 uppercase tracking-wide text-sm">{gadget.name}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{gadget.description}</p>
        
        <div className="flex items-center gap-1 mb-4">
          <Star className="w-4 h-4 text-red-600 fill-red-600" />
          <span className="text-sm text-gray-400">{gadget.rating}</span>
          <span className="text-sm text-gray-600">({gadget.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-red-600 tracking-wide">₱ ----</span>
          <button 
            className="bg-red-600 text-white p-2.5 hover:bg-red-700 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
