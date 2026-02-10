import type { Category } from '../App';
import { Headphones, Watch, Laptop, Camera, Gamepad2, Plane } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { id: 'all' as Category, label: 'All Products', icon: null },
  { id: 'audio' as Category, label: 'Audio', icon: Headphones },
  { id: 'wearables' as Category, label: 'Wearables', icon: Watch },
  { id: 'computing' as Category, label: 'Computing', icon: Laptop },
  { id: 'photography' as Category, label: 'Photography', icon: Camera },
  { id: 'gaming' as Category, label: 'Gaming', icon: Gamepad2 },
  { id: 'drones' as Category, label: 'Drones', icon: Plane },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-12">
      <h3 className="text-white mb-6 uppercase tracking-wide">Filter by Category</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 transition-all flex items-center gap-2 uppercase text-sm tracking-wide ${
                isSelected
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-transparent text-gray-400 border border-red-900/30 hover:border-red-600/50 hover:text-white'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
