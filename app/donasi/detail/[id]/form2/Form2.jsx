// components/Form2.js
'use client'; // Karena menggunakan hooks dan state, harus client component

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { postTransaction } from '@/service/PostData';
import { cleanUpdatedData } from '@/lib/utlis';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import {
  currencyFormatter,
  formatRupiah,
  numberFormatter,
} from '@/lib/formater';
import PaymentModalInfaq from '@/components/ui/ModalPaymentMethod';
import Header from '@/components/ui/header';

import { sendPurchaseEvent } from '@/components/global/sendPurchaseEvent';
import { sendAddToCartInfoEvent } from '@/lib/pixels';
import { GTMAddEvent } from '@/components/global/GTMAddEvent';
import { sendPageViewEvent } from '@/lib/pixels';

const Form2 = ({ paymentMethods, nominalOptions, programId, programLink }) => {
  const router = useRouter();
  const showToast = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'donation',
    program_type: 'infaq',
    items: [programId],
    total: [],
    doa: '',
    payment_method_id: '',
    phone: '',
    name: '',
    status: 'Pending',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [payment, setPayment] = useState({ name: '', image: '' });

  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [hideName, setHideName] = useState(false);

  useEffect(() => {
    GTMAddEvent({ event: 'formdonation' });
    sendPageViewEvent();
  }, []);

  const mutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: (data) => {
      const { phone } = formData;
      const { invoice, total, programs } = data.data;
      sendAddToCartInfoEvent(phone, total, programs, invoice);
      sendPurchaseEvent(total, programs[0], data.invoice);
      router.push(`/invoice/${data.data.invoice}`);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
      showToast('Transaction failed, please try again later');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'total') {
      const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));
      setFormData((prev) => ({
        ...prev,
        total: numberValue ? [numberValue] : [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAmountClick = (amount) => {
    setFormData((prev) => ({ ...prev, total: [amount] }));
  };

  const handlePaymentId = (paymentMethod) => {
    setFormData((prev) => ({ ...prev, payment_method_id: paymentMethod.id }));
    setOpenModal(false);
    setPayment({ name: paymentMethod.name, image: paymentMethod.image_url });
    setPaymentMethodSelected(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, total } = formData;

    // Jika toggle "Sembunyikan Nama" aktif, ganti nama dengan "Hamba Allah"
    const submittedName = hideName ? 'Hamba Allah' : name;

    if (!submittedName || !phone) {
      showToast('Name and Phone number are required');
      return;
    }

    if (total.length === 0 || total[0] < 1000) {
      showToast('Minimum donation is ' + currencyFormatter(1000), 'error');
      return;
    }
    if (!paymentMethodSelected) {
      showToast('Silakan pilih metode pembayaran terlebih dahulu', 'error');
      setIsProcessing(false);
      return;
    }

    if (formData.payment_method_id === 3000 && myBalance < formData.total) {
      showToast('Maaf saldo anda tidak cukup', 'error');
      return;
    }

    setIsProcessing(true);
    const updatedData = cleanUpdatedData({ ...formData, name: submittedName });
    mutation.mutate(updatedData, {
      onSuccess: () => setIsProcessing(false),
      onError: () => setIsProcessing(false),
    });
  };

  return (
    <>
      <Header
        type="title"
        text="Form Pembayaran"
        link={`/donasi/detail2/${programLink}`}
      />
      <div className=" content-wrapper bg-grey">
        <div className="container bg-white p-4">
          <form onSubmit={handleSubmit}>
            <div className="form-group w-100">
              <h5 className="font-semibold my-3">Masukkan Nominal</h5>
              <div className="input-group nominal-input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="rupiahText">
                    Rp.
                  </span>
                </div>
                <input
                  id="nominalRupiah"
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="total"
                  value={
                    formData.total.length
                      ? numberFormatter(formData.total[0])
                      : ''
                  }
                  placeholder="Masukan Nominal"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {nominalOptions.data.map((amount) => (
                <button
                  key={amount.nominal}
                  className="btn button-border-cyan !flex flex-col gap-1 justify-center items-center !font-bold"
                  type="button"
                  onClick={() => handleAmountClick(amount.nominal)}
                >
                  {formatRupiah(amount.nominal)}
                  <spann className="font-normal text-sm md:text-base">{`"${amount.nama_pilihan}"`}</spann>
                </button>
              ))}
            </div>
            <div className="payment-infaq">
              <div className="input-payment">
                {payment.image && (
                  <Image
                    width={500}
                    height={500}
                    className="h-12 w-auto"
                    src={payment.image}
                    alt=""
                  />
                )}
                <div className="payment-text">
                  {payment.name ? payment?.name : 'Pilih Metode Pembayaran'}
                </div>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className={`btn button-cyan px-3 ${
                    formData.total.length ? '' : 'disabled'
                  }`}
                >
                  Pilih
                </button>
              </div>
              {/* <div className="col-12">
              <div className="-mb-4 mt-2 w-100 text-center">
                <p>
                  Silahkan{' '}
                  <a className="auth-link" href="/login">
                    Login
                  </a>{' '}
                  atau lengkapi data berikut
                </p>
              </div>
            </div> */}
            </div>

            {/* input data */}
            <div className="mb-2">
              <label htmlFor="fullName" className="form-label">
                Nama Lengkap
              </label>
              <input
                id="fullName"
                type="text"
                className="form-control"
                name="name"
                placeholder="Nama Lengkap"
                onChange={handleChange}
                value={formData.name}
              />
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={hideName}
                  onChange={() => setHideName(!hideName)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Sembunyikan nama <i>(Sebagai Hamba Allah)</i>
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="noWa" className="form-label">
                Nomor Whatsapp
              </label>
              <input
                id="noWa"
                type="tel"
                className="form-control"
                name="phone"
                placeholder="No. Whatsapp"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="form-label">
                Pesan dan Doa <span>(Opsional)</span>
              </label>
              <textarea
                id="message"
                name="doa"
                rows={3}
                className="form-control"
                placeholder="Do'a atau Pesan"
                onChange={handleChange}
                value={formData.doa}
                style={{ height: '100px' }}
              />
            </div>
            <div className="donate-sticky-content donate-total shadow-sm">
              <button
                type="submit"
                className="btn button-cyan w-100"
                id="btn-konfirmasi"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Konfirmasi'}
              </button>
            </div>
          </form>

          <PaymentModalInfaq
            open={openModal}
            onClose={() => setOpenModal(false)}
            paymentMethods={paymentMethods.data}
            onSelectPayment={handlePaymentId}
            includePaymentMethod={['wallet', 'VA', 'bank']}
            dompetKebaikan={false}
          />
        </div>
      </div>
    </>
  );
};

export default Form2;
