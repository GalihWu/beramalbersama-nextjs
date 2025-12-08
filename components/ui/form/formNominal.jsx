'use client';

import { numberFormatter } from '@/lib/formater';
import React, { useEffect, useState } from 'react';

export default function FormNominal({ nominal, onChange }) {
  const [inputValue, setInputValue] = useState(nominal);
  useEffect(() => {
    setInputValue(nominal ? numberFormatter(nominal) : '');
  }, [nominal]);
  const handleNominalChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const newNominal = rawValue ? parseFloat(rawValue) : '';
    setInputValue(numberFormatter(newNominal));
    onChange({ target: { name: 'nominal', value: newNominal } });
  };

  return (
    <div className="form-group w-100">
      <div className="input-group nominal-input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="rupiahText">
            Rp.
          </span>
        </div>
        <input
          id="nominalRupiah"
          type="text"
          className="form-control !text-base md:!text-lg"
          aria-label="Nominal"
          aria-describedby="rupiahText"
          placeholder="Masukan Nominal"
          value={inputValue}
          onChange={handleNominalChange}
        />
      </div>
    </div>
  );
}
