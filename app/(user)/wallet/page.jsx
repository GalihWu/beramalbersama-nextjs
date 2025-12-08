'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/header';
import PaymentModal from '@/components/ui/ModalPaymentMethod';
import Image from 'next/image';
import { useToast } from '@/context/ToastContext';
import { postTransaction } from '@/service/PostData';
import { getPaymentMethods } from '@/service/FetchData';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cleanUpdatedData } from '@/lib/utlis';
import { currencyFormatter, numberFormatter } from '@/lib/formater';

const Wallet = () => {
  const showToast = useToast();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [formData, setFormData] = useState({
    total: [],
    payment_method_id: '',
    type: 'dompet_kebaikan',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [payment, setPayment] = useState({ name: '', image: '' });

  const { data, error, isLoading } = useQuery({
    queryKey: ['paymentMethodsInfaq', 'infaq'],
    queryFn: () => getPaymentMethods({ program_link: 'infaq' }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: (data) => {
      // console.log('Transaction successful:', data);
      router.push(`/invoice/${data.data.invoice}`);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
      showToast('Transaction failed. Please try again.');
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
    const { total } = formData;

    if (total.length === 0 || total[0] < 1000) {
      showToast('Minimum TopUp is ' + currencyFormatter(1000), 'error');
      return;
    }

    if (!paymentMethodSelected) {
      showToast('Silakan pilih metode pembayaran terlebih dahulu', 'error');
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    const updatedData = cleanUpdatedData({ ...formData });
    // console.log(updatedData);
    mutation.mutate(updatedData, {
      onSuccess: () => setIsProcessing(false),
      onError: () => setIsProcessing(false),
    });
  };

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Header type="notshare" text="Top Up Saku Berbagi" />
      <div className="container content-wrapper bg-grey px-4 bg-white mih-h-dvh animate-fade-in">
        <form onSubmit={handleSubmit} className="mt-11">
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
          <div className="nominal-topup">
            {[10000, 50000, 100000, 200000, 500000, 1000000].map((amount) => (
              <button
                key={amount}
                className="btn button-border-cyan mt-3"
                style={{ fontWeight: 'bold' }}
                type="button"
                onClick={() => handleAmountClick(amount)}
              >
                Rp{amount.toLocaleString()}
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
          </div>

          <div className="donate-sticky-content donate-total shadow-sm">
            <button
              type="submit"
              className="btn button-orange w-100"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Top Up Sekarang'}
            </button>
          </div>
        </form>

        {isLoading ? (
          <></>
        ) : (
          <PaymentModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            paymentMethods={data?.data}
            onSelectPayment={handlePaymentId}
            includePaymentMethod={['wallet', 'VA', 'bank']}
            custom={'GoPay'}
          />
        )}
      </div>
    </>
  );
};

export default Wallet;
