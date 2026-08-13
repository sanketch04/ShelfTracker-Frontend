const StatCard = ({
  title,
  value,
  description,
  icon,
  iconBg,
  iconColor,
}) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

      <div className="flex items-center gap-3">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

      </div>

      <p className="mt-3 truncate text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
};

export default StatCard;
