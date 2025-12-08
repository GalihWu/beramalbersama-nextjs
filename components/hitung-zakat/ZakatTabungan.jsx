import React from "react";
import FormNumberSeparator from "../ui/form/formNumberSeparator";

export const ZakatTabungan = ({
  // isYear,
  // setIsYear,
  formValues,
  handleInputChange,
}) => {
  return (
    <div className="zakat - form" id="fTabung">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Saldo Tabungan
        </label>
        <FormNumberSeparator
          value={formValues.income}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("income", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Bunga (jika menabung di bank konvensional)
        </label>
        <FormNumberSeparator
          value={formValues.expense}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("expense", value)}
        />
      </div>
    </div>
  );
};
