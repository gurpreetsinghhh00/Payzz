const Appbar = () => {
  return (
    <div className="shadow font-bold h-16 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        Payments Bank
      </div>
      <div className="flex flex-row items-center justify-center mr-6 gap-2">
        <div className="">Hello</div>
        <div className="rounded-full h-9 w-9 bg-slate-200 flex justify-center">
          <div className="flex flex-col justify-center h-full text-lg">U</div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
