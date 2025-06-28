type Props = {
  status: string;
  text: string;
};

export const StatusBadge = ({ status, text }: Props) => (
  <span
    className={`px-3 py-1 text-nowrap text-white rounded-full text-xs   uppercase ${status}`}
  >
    {text}
  </span>
);
