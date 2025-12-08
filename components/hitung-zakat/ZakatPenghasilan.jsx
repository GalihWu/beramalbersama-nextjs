import React from "react";
import FormNumberSeparator from "@/components/ui/form/formNumberSeparator";
export const ZakatPenghasilan = ({
  isYear,
  setIsYear,
  formValues,
  handleInputChange,
}) => {
  return (
    <div className="zakat-form" id="fHasil">
      <div className="mb-4">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="yearly"
            checked={isYear}
            onChange={() => setIsYear(true)}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Tahunan
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="monthly"
            checked={!isYear}
            onChange={() => setIsYear(false)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Bulanan
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="income" className="form-label">
          Penghasilan
        </label>
        <FormNumberSeparator
          value={formValues.income}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("income", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="other" className="form-label">
          Pendapatan Lain (Bonus, THR)
        </label>
        <FormNumberSeparator
          value={formValues.other}
          placeholder="Masukan penghasilan anda"
          onChange={(value) => handleInputChange("other", value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expense" className="form-label">
          Pengeluaran kebutuhan pokok (termasuk utang jatuh tempo)
        </label>
        <FormNumberSeparator
          value={formValues.expense}
          placeholder="Masukan pengeluaran anda"
          onChange={(value) => handleInputChange("expense", value)}
        />
      </div>
    </div>
  );
};
