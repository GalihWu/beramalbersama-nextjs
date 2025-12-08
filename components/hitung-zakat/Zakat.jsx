/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

export const ZakatPenghasilan = ({ onZakatChange, onFrequencyChange }) => {
  const [penghasilan, setPenghasilan] = useState(10000);
  const [pendapatanLain, setPendapatanLain] = useState('');
  const [pengeluaran, setPengeluaran] = useState('');
  const [isMonthly, setIsMonthly] = useState(false);

  useEffect(() => {
    const total = calculateZakat();
    onZakatChange(total);
  }, [penghasilan, pendapatanLain, pengeluaran, isMonthly]);

  const calculateZakat = () => {
    const income = parseFloat(penghasilan) || 0;
    const otherIncome = parseFloat(pendapatanLain) || 0;
    const expenses = parseFloat(pengeluaran) || 0;

    const totalIncome = income + otherIncome - expenses;
    return totalIncome > 0 ? totalIncome * 0.025 : 0;
  };

  const handleFrequencyChange = (value) => {
    setIsMonthly(value);
    onFrequencyChange(value);
  };

  return (
    <div className="zakat - form" id="fHasil">
      <div className="mb-4">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            defaultValue="option1"
            checked={!isMonthly}
            onChange={() => handleFrequencyChange(false)}
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
            defaultValue="option2"
            checked={isMonthly}
            onChange={() => handleFrequencyChange(true)}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Bulanan
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Penghasilan
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Masukan penghasilan anda"
          value={penghasilan}
          onChange={(e) => setPenghasilan(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Pendapatan Lain (Bonus, THR)
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={pendapatanLain}
          onChange={(e) => setPendapatanLain(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Pengeluaran kebutuhan pokok (termasuk utang jatuh tempo)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={pengeluaran}
          onChange={(e) => setPengeluaran(e.target.value)}
        />
      </div>
    </div>
  );
};

export const ZakatTabungan = ({ onZakatChange }) => {
  const [tabungan, setTabungan] = useState('');
  const [bunga, setBunga] = useState('');

  useEffect(() => {
    const total = calculateZakat();
    onZakatChange(total);
  }, [tabungan, bunga]);

  const calculateZakat = () => {
    const savingsAmount = parseFloat(tabungan) || 0;
    const interestAmount = parseFloat(bunga) || 0;

    const netSavings = savingsAmount - interestAmount;
    return netSavings > 0 ? netSavings * 0.025 : 0;
  };
  return (
    <div className="zakat - form" id="fTabung">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Saldo Tabungan
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukan jumlah tabungan anda"
          value={tabungan}
          onChange={(e) => setTabungan(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Bunga (jika menabung di bank konvensional)
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={bunga}
          onChange={(e) => setBunga(e.target.value)}
        />
      </div>
    </div>
  );
};

export const ZakatDagang = ({ onZakatChange }) => {
  const [modal, setModal] = useState('');
  const [untung, setUntung] = useState('');
  const [piutang, setPiutang] = useState('');
  const [utang, setUtang] = useState('');
  const [rugi, setRugi] = useState('');

  useEffect(() => {
    const total = calculateZakat();
    onZakatChange(total);
  }, [modal, untung, piutang, utang, rugi]);

  const calculateZakat = () => {
    const initialCapital = parseFloat(modal) || 0;
    const profit = parseFloat(untung) || 0;
    const receivables = parseFloat(piutang) || 0;
    const liabilities = parseFloat(utang) || 0;
    const loss = parseFloat(rugi) || 0;

    const totalTrade =
      initialCapital + profit + receivables - liabilities - loss;
    return totalTrade > 0 ? totalTrade * 0.025 : 0;
  };
  return (
    <div className="zakat - form" id="fDagang">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Modal yang diputar selama 1 tahun
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukan jumlah modal usaha anda"
          value={modal}
          onChange={(e) => setModal(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Keuntungan selama 1 tahun
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukan jumlah keuntungan usaha anda"
          value={untung}
          onChange={(e) => setUntung(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Piutang Dagang
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={piutang}
          onChange={(e) => setPiutang(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Utang jatuh tempo
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={utang}
          onChange={(e) => setUtang(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Kerugian selama 1 tahun
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Opsional, jika ada"
          value={rugi}
          onChange={(e) => setRugi(e.target.value)}
        />
      </div>
    </div>
  );
};

export const ZakatEmas = ({ onZakatChange, nishabEmas }) => {
  const [emas, setEmas] = useState('');

  useEffect(() => {
    const total = calculateZakat();
    onZakatChange(total);
  }, [emas]);

  const calculateZakat = () => {
    const goldAmount = parseFloat(emas) || 0;

    const totalGoldAmount = goldAmount * nishabEmas;
    return totalGoldAmount > 0 ? totalGoldAmount * 0.025 : 0;
  };

  return (
    <div className="zakat - form" id="fEmas">
      <div className="mb-4">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Jumlah Emas (per gram)
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Masukan total berat emas anda"
          value={emas}
          onChange={(e) => setEmas(e.target.value)}
        />
      </div>
    </div>
  );
};
