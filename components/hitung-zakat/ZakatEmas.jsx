import React from "react";
import FormNumberSeparator from "../ui/form/formNumberSeparator";

export const ZakatEmas = ({
  // isYear,
  // setIsYear,
  formValues,
  handleInputChange,
}) => {
  return (
    <div className="zakat - form" id="fEmas">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Jumlah Emas (per gram)
        </label>
        <FormNumberSeparator
          value={formValues.emas}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("emas", value)}
        />
      </div>
    </div>
  );
};
