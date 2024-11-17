export const SetStatus = ({
  s,
  c,
  r,
}: {
  s: number;
  c?: number;
  r?: number | null;
}) => {
  switch (s) {
    case 1:
      return r == 1 ? (
        <p className="status-negatif-success "> refund success!</p>
      ) : c == 1 ? (
        <p className="status-cancel "> cancel!</p>
      ) : (
        <p className="status-pay  "> pay deposit!{r}</p>
      );
    case 2:
      return <p className="status-pay"> pay deposit</p>;
    case 3:
      return <p className="status-pay"> pay deposit</p>;
    default:
      return <p className="status-waiting">waiting</p>;
  }
};
