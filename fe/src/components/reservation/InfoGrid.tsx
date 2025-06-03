type Props = {
  items: Array<{
    label: string;
    value: string | number | JSX.Element;
  }>;
};
export const InfoGrid = ({ items }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {items.map((item, idx) => (
      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
        <div className="text-xs text-gray-500 uppercase font-semibold mb-1">
          {item.label}
        </div>
        <div className="font-semibold text-gray-900">{item.value}</div>
      </div>
    ))}
  </div>
);
