import {type ProductVariant } from '@/data/craft';
import React from 'react';

interface ColorVariantSelectorProps {
  variants?: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}

export const ColorVariantSelector: React.FC<ColorVariantSelectorProps> = ({
  variants,
  selectedVariantId,
  onSelect,
}) => {
  return (
    <div className="flex gap-2">
      {variants?.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant.id)}
          className={`w-10 h-10 rounded-full border-2 ${
            selectedVariantId === variant.id
              ? 'border-blue-500'
              : 'border-gray-200'
          } ${!variant.isAvailable && 'opacity-50 cursor-not-allowed'}`}
          disabled={!variant.isAvailable}
          style={{ backgroundColor: variant.color }}
          title={variant.name}
        />
      ))}
    </div>
  );
};