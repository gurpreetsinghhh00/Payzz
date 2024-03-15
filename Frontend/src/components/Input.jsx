const Input = ({ placeholder, title, onChange, type }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      <input
        className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
