/* eslint-disable react-hooks/exhaustive-deps */
// FormInfaq.js
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useMutation, useQueries } from '@tanstack/react-query';
import {
  getIsTokenValid,
  getMyAccount,
  getPaymentMethods,
} from '@/service/FetchData';
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
import { UserProfileCard } from '@/components/ui/userProfileCard';

import Cookies from 'js-cookie';

export const FormInfaq = () => {
  const router = useRouter();
  const showToast = useToast();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'donation',
    program_type: 'infaq',
    items: [399],
    total: [],
    doa: '',
    payment_method_id: '',
    phone: '',
    name: '',
    status: 'Pending',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [payment, setPayment] = useState({ name: '', image: '' });

  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    const token = Cookies.get('authToken');

    setAuthToken(token);

    if (token) {
      // Validate the token
      const validateToken = async () => {
        try {
          await getIsTokenValid();
          setIsTokenValid(true);
        } catch {
          setIsTokenValid(false);
        } finally {
          setIsCheckingToken(false);
        }
      };

      validateToken();
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['paymentMethodsInfaq', 'infaq'],
        queryFn: () => getPaymentMethods({ program_link: 'infaq' }),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
      {
        queryKey: ['myAccount'],
        queryFn: getMyAccount,
        enabled: isTokenValid,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    ],
  });

  const [paymentMethodsQuery, accountQuery] = queries;
  const myBalance = accountQuery?.data?.data.dompet_kebaikan?.saldo || 0;

  const mutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: (data) => {
      console.log('Transaction successful:', data);
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

  useEffect(() => {
    if (authToken && isTokenValid && accountQuery.isSuccess) {
      setFormData((prev) => ({
        ...prev,
        name: accountQuery.data.data.name,
        phone: accountQuery.data.data.phone,
      }));
    }
  }, [authToken, isTokenValid, accountQuery.isSuccess]);

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
    if (!name || !phone) {
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
    const updatedData = cleanUpdatedData({ ...formData });
    mutation.mutate(updatedData, {
      onSuccess: () => setIsProcessing(false),
      onError: () => setIsProcessing(false),
    });
  };

  useEffect(() => {
    const nominalInfaq = localStorage.getItem('nominalInfaq');
    if (nominalInfaq) {
      setFormData((prev) => ({ ...prev, total: [nominalInfaq] }));
      localStorage.removeItem('nominalInfaq');
    }
  }, []);

  if (paymentMethodsQuery.error || accountQuery.error)
    return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
                formData.total.length ? numberFormatter(formData.total[0]) : ''
              }
              placeholder="Masukan Nominal"
            />
          </div>
        </div>
        <div className="nominal-infaq gap-3">
          {[10000, 25000, 50000, 100000].map((amount) => (
            <button
              key={amount}
              className="btn button-border-cyan"
              style={{ fontWeight: 'bold' }}
              type="button"
              onClick={() => handleAmountClick(amount)}
            >
              {formatRupiah(amount)}
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
          {!(authToken && isTokenValid) && (
            <div className="col-12">
              <div className="-mb-4 mt-2 w-100 text-center">
                <p>
                  Silahkan{' '}
                  <a className="auth-link" href="/login">
                    Login
                  </a>{' '}
                  atau lengkapi data berikut
                </p>
              </div>
            </div>
          )}
        </div>

        {/* input data */}
        {!(authToken && isTokenValid) ||
        accountQuery.isLoading ||
        isCheckingToken ? (
          <>
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
                defaultValue={accountQuery?.data?.data?.name || ''}
              />
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
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
                defaultValue={accountQuery?.data?.data?.phone || ''}
              />
            </div>
          </>
        ) : (
          <UserProfileCard
            name={accountQuery?.data.data.name}
            phone={accountQuery?.data.data.phone}
          />
        )}
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
            className="btn button-cyan w-full !font-medium !text-base md:!text-lg"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Lanjutkan Pembayaran Infaq'}
          </button>
        </div>
      </form>

      {paymentMethodsQuery.isLoading ? null : (
        <PaymentModalInfaq
          open={openModal}
          onClose={() => setOpenModal(false)}
          paymentMethods={paymentMethodsQuery?.data.data}
          onSelectPayment={handlePaymentId}
          includePaymentMethod={['wallet', 'VA', 'bank']}
          dompetKebaikan={isTokenValid ? true : false}
          myBalance={myBalance}
        />
      )}
    </div>
  );
};
