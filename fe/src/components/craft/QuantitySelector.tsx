interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  min = 1,
  max = 999,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 12H4"
          />
        </svg>
      </button>

      <input
        type="text"
        value={quantity}
        onChange={handleInputChange}
        className="w-16 h-10 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center border border-gray-300 text-gray-600 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};
