const Widget = ({ icon, title, subtitle }) => {
  return (
    <div className="items-cente flex flex-grow rounded-[20px] bg-white px-3 py-2 dark:!bg-navy-700">
      <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex w-auto flex-col justify-center">
        <p className="font-dm text-sm font-medium text-gray-600 dark:text-white">
          {title}
        </p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
      </div>
    </div>
  );
};

export default Widget;
