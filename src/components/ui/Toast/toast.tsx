export const ToastPositive = ({
  title,
  description,
}: {
    title: string;
    description?: string;
}) => {
  return (
    <div className="font-outfit bg-green-primary border border-white rounded-2xl p-6">
      <p className="font-bold leading-6 text-white">{title}</p>
      {description && <p className="text-white text-sm">{description}</p>}
    </div>
  );
};

export const ToastNegative = ({
  title,
  description,
}: {
    title: string;
    description?: string;
}) => {
  return (
    <div className="font-outfit bg-orange-primary border border-white rounded-2xl p-6">
      <p className="font-bold leading-6 text-white">{title}</p>
      {description && <p className="text-white text-sm">{description}</p>}
    </div>
  );
};