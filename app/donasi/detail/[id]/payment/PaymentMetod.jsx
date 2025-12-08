'use client';

import { GTMAddEvent } from '@/components/global/GTMAddEvent';
import Header from '@/components/ui/header';
import { numberFormatter } from '@/lib/formater';
import { getMyAccount } from '@/service/FetchData';
import useFormStore from '@/stores/FormStore';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import Cookies from 'js-cookie';

// Memisahkan komponen untuk setiap jenis pembayaran
const PaymentMethodItem = ({
  paymentMethod,
  onClick,
  isDisabled = false,
  disabledMessage = null,
  children,
}) => (
  <div className="w-full">
    <div
      className={`payment-type-item ${
        isDisabled
          ? 'opacity-60 cursor-not-allowed'
          : 'cursor-pointer hover:bg-gray-50'
      }`}
      onClick={!isDisabled ? onClick : undefined}
    >
      <div className="w-[100px] min-h-[30px] flex justify-center items-center mr-2">
        <Image
          width={500}
          height={500}
          src={paymentMethod.image_url}
          alt={paymentMethod.name}
          className={`object-contain ${
            paymentMethod.name == 'Dompet Kebaikan'
              ? 'h-[30px] w-auto'
              : 'w-[100px]'
          }`}
        />
      </div>
      <div className="w-full">
        <div className=" w-full">{paymentMethod.name}</div>
        {isDisabled && disabledMessage && (
          <div className="m-0 text-xs text-danger font-semibold">
            {disabledMessage}
          </div>
        )}
      </div>
      <FaChevronRight className="text-gray-500" />
    </div>
    {children}
  </div>
);

const DonasiPayment = ({ id, paymentMethod }) => {
  const router = useRouter();
  const { updateFormData, formData } = useFormStore();

  const authToken = Cookies.get('authToken');
  const isLogin = !!authToken;
  const amount = formData?.total[0] || '';

  // Query data hanya jika login
  const { data, error, isLoading } = useQuery({
    queryKey: ['HomeAccount'],
    queryFn: getMyAccount,
    enabled: isLogin,
    staleTime: 1000 * 60 * 5,
  });

  // Memoized values untuk menghindari perhitungan ulang
  const myBalance = useMemo(
    () => data?.data.dompet_kebaikan?.saldo || 0,
    [data]
  );
  const isBalanceSufficient = useMemo(
    () => parseFloat(amount) <= myBalance,
    [amount, myBalance]
  );
  const userData = data?.data;

  // Memfilter metode pembayaran sekali saja
  const activePaymentMethods = useMemo(
    () => paymentMethod.data.filter((payment) => payment.is_active === '1'),
    [paymentMethod.data]
  );

  // Mengelompokkan metode pembayaran berdasarkan type
  const paymentMethodsByType = useMemo(() => {
    const grouped = { dompet_kebaikan: [], e_wallet: [], bank: [], tunai: [] };
    activePaymentMethods.forEach((method) => {
      if (grouped.hasOwnProperty(method.type)) {
        grouped[method.type].push(method);
      }
    });
    return grouped;
  }, [activePaymentMethods]);

  // Validasi form data
  useEffect(() => {
    if (!formData?.items?.length) {
      router.push(`/donasi/detail/${id}`);
    } else if (!formData?.total?.length) {
      router.push(`/donasi/detail/${id}/form`);
    }
  }, [formData, id, router]);

  // Event tracking
  useEffect(() => {
    if (paymentMethod) GTMAddEvent({ event: 'paymentinfo' });
  }, [paymentMethod]);

  // Handler untuk pemilihan metode pembayaran
  const handlePaymentSelect = useCallback(
    async (value) => {
      if (value.type === 'dompet_kebaikan' && !isBalanceSufficient) return;

      await updateFormData({
        payment_method_id: value.id,
        name: userData?.name || '',
        phone: userData?.phone || '',
      });

      const paymentData = {
        name: value.name,
        img: value.image_url,
        behalf: value.account_behalf,
      };

      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      localStorage.setItem('konfirmProgramLink', id);

      router.push(`/donasi/detail/${id}/konfirmasi`);
    },
    [isBalanceSufficient, updateFormData, userData, id, router]
  );

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Header type="notshare" text="Pilih Metode Pembayaran" />

      <div className="content-wrapper bg-grey">
        <div className="container">
          {/* Bank Transfer Section */}
          <div className="title-payment-wrapper mt-6">
            <p>
              Transfer bank (verifikasi manual 1x24 jam, minimal nominal Rp.
              10,000)
            </p>
          </div>
          <div className="donate-body-wrapper">
            <div className="payment-type-group">
              {paymentMethodsByType.bank.map((paymentMethod) => (
                <PaymentMethodItem
                  key={paymentMethod.id}
                  paymentMethod={paymentMethod}
                  onClick={() => handlePaymentSelect(paymentMethod)}
                />
              ))}
            </div>
          </div>
          {/* Dompet Kebaikan Section */}
          <div className="title-payment-wrapper">
            <p>
              Pembayaran instan (verifikasi otomatis, minimal nominal Rp.10,000)
            </p>
          </div>
          <div className="donate-body-wrapper">
            <div className="payment-type-group">
              {isLogin &&
                !isLoading &&
                paymentMethodsByType.dompet_kebaikan.map((paymentMethod) => (
                  <PaymentMethodItem
                    key={paymentMethod.id}
                    paymentMethod={paymentMethod}
                    onClick={() => handlePaymentSelect(paymentMethod)}
                    isDisabled={!isBalanceSufficient}
                    disabledMessage="Saldo tidak mencukupi"
                  >
                    <div className="payment-balance-info mt-2 pl-4">
                      <p className="m-0 text-sm">
                        Saldo tersedia:{' '}
                        <span
                          className={`font-semibold ${
                            isBalanceSufficient ? 'text-green' : 'text-danger'
                          }`}
                        >
                          Rp {numberFormatter(myBalance)}
                        </span>
                      </p>
                      <p className="m-0 text-sm">
                        Donasi yang perlu dibayarkan:{' '}
                        <span className="font-semibold text-danger">
                          Rp {numberFormatter(amount)}
                        </span>
                      </p>
                      {!isBalanceSufficient && (
                        <p className="m-0 text-xs text-danger mt-1">
                          Topup saldo terlebih dahulu atau pilih metode
                          pembayaran lain
                        </p>
                      )}
                    </div>
                  </PaymentMethodItem>
                ))}

              {/* E-Wallet Section */}
              {paymentMethodsByType.e_wallet.map((paymentMethod) => (
                <PaymentMethodItem
                  key={paymentMethod.id}
                  paymentMethod={paymentMethod}
                  onClick={() => handlePaymentSelect(paymentMethod)}
                />
              ))}
            </div>
          </div>

          {/* Tunai Transfer Section */}
          {paymentMethodsByType.tunai.length > 0 && (
            <>
              <div className="title-payment-wrapper mt-6">
                <p>Bayar Tunai (Konfirmasi Pembayaran ke CS)</p>
              </div>
              <div className="donate-body-wrapper">
                <div className="payment-type-group">
                  {paymentMethodsByType.tunai.map((paymentMethod) => (
                    <PaymentMethodItem
                      key={paymentMethod.id}
                      paymentMethod={paymentMethod}
                      onClick={() => handlePaymentSelect(paymentMethod)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DonasiPayment;
