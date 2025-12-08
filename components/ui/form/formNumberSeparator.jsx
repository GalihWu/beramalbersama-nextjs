import React from "react";

const FormNumberSeparator = ({ value, onChange, placeholder }) => {
  const handleInputChange = (event) => {
    const rawValue = event.target.value.replace(/\./g, ""); // Remove existing dots
    if (rawValue != "") {
      if (!isNaN(rawValue)) {
        const formattedValue = parseInt(rawValue, 10).toLocaleString("id-ID"); // Format with thousand separators
        onChange(formattedValue);
      } else {
        onChange(""); // Reset if invalid input
      }
    } else {
      onChange("");
    }
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default FormNumberSeparator;
