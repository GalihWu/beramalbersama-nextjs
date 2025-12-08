import React from "react";
import FormNumberSeparator from "../ui/form/formNumberSeparator";

export const ZakatDagang = ({
  // isYear,
  // setIsYear,
  formValues,
  handleInputChange,
}) => {
  return (
    <div className="zakat-form" id="fDagang">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Modal yang diputar selama 1 tahun
        </label>
        <FormNumberSeparator
          value={formValues.other}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("other", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Keuntungan selama 1 tahun
        </label>
        <FormNumberSeparator
          value={formValues.income}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("income", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Piutang Dagang
        </label>
        <FormNumberSeparator
          value={formValues.piutang}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("piutang", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Utang jatuh tempo
        </label>
        <FormNumberSeparator
          value={formValues.utang}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("utang", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Kerugian selama 1 tahun
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
