function InputBox({ title, inputEx, onChange }) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        onChange={onChange}
        type="text"
        placeholder={inputEx}
        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
    </div>
  );
}

export default InputBox;
