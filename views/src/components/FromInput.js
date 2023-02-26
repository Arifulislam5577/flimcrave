import React from "react";

const FormInput = ({
  type,
  name,
  label,
  errorMessage,
  placeholder,
  register,
  defaultValue,
}) => {
  return (
    <div className="text-white">
      <label htmlFor={name} className="block mb-2 text-sm">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register}
        className="w-full text-sm px-3 py-2 placeholder:text-sm border rounded-md bg-slate-600"
      />
      <span className="text-sm mt-1 text-red-500 capitalize">
        {errorMessage}
      </span>
    </div>
  );
};

export default FormInput;
