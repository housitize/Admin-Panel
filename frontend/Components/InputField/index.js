const InputField = ({ label, type, value, onChange, onEnter }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === "Enter" && onEnter()}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition text-black"
    />
  </div>
);

export default InputField;
