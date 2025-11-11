import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({ label, type, value, onChange, onEnter }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const isPassword = type === "password";

  return (
    <div className="relative mb-4">
      {/* Label with required star */}
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Input field */}
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          required
          onKeyPress={(e) => e.key === "Enter" && onEnter()}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-700 focus:border-transparent outline-none transition text-black pr-10"
        />

        {/* Password toggle icon */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-slate-700"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
