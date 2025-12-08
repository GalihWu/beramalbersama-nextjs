'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import { FaChevronDown, FaClock, FaGlobe, FaTicketAlt } from 'react-icons/fa';
import Image from 'next/image';
import useEventFormStore from '@/stores/EventFormStore';
import {
  getIsTokenValid,
  getMyAccount,
  getPaymentMethods,
} from '@/service/FetchData';
import { useMutation, useQueries } from '@tanstack/react-query';
import { postTransaction } from '@/service/PostData';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import PaymentModalInfaq from '@/components/ui/ModalPaymentMethod';
import {
  currencyFormatter,
  formatRupiah,
  numberFormatter,
} from '@/lib/formater';
import SpinLoading from '@/components/ui/SpinLoading';
// import { PiWarningCircle } from 'react-icons/pi';
import { HiCheckCircle } from 'react-icons/hi';
import Cookies from 'js-cookie';

import { UserProfileCard } from '@/components/ui/userProfileCard';

interface FormData {
  type: string;
  items: string[];
  qty: string[];
  total: string[];
  doa: string;
  payment_method_id: string;
  phone: string;
  email: string;
  source: string;
  name: string;
  status: string;
  discount_code: string;
  discount_id: string;
}

interface DiscountData {
  id: string;
  name: string;
  discount: string;
  type: 'nominal' | 'percentage';
  max_discount?: string;
  min_purchase?: string;
}

const FormEvent = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const showToast = useToast();
  const { eventData } = useEventFormStore();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(false);
  const [payment, setPayment] = useState({ name: '', image: '' });
  const [voucherActive, setVoucherActive] = useState<boolean>(false);

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
  const [isDiscountLoading, setIsDiscountLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    type: 'event',
    items: [],
    qty: [],
    total: [],
    doa: '',
    payment_method_id: '',
    phone: '',
    email: '',
    source: 'direct',
    name: '',
    status: 'Pending',
    discount_code: '',
    discount_id: '',
  });
  const [nominalInfaq, setNominalInfaq] = useState<number>(0);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setAuthToken(token ?? null);

    const validateToken = async () => {
      if (!token) {
        setIsCheckingToken(false);
        return;
      }

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
  }, []);

  useEffect(() => {
    if (!eventData) {
      router.push(`/event/${params.slug}`);
    }
    if (eventData.reg_only !== 0) {
      setFormData((prev) => ({
        ...prev,
        payment_method_id: '1',
      }));
    }
  }, [eventData, params.slug, router]);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['myAccount'],
        queryFn: getMyAccount,
        enabled: isTokenValid,
        staleTime: 60 * 1000,
      },
      {
        queryKey: ['paymentMethodsInfaq', params.slug],
        queryFn: () =>
          getPaymentMethods({
            status: '',
            usage: 'penerima',
            program_id: '',
            program_link: params.slug,
          }),
        staleTime: 60 * 1000,
      },
    ],
  });

  const [accountQuery, paymentMethodsQuery] = queries;

  useEffect(() => {
    if (authToken && isTokenValid && accountQuery.isSuccess) {
      setFormData((prev) => ({
        ...prev,
        name: accountQuery.data.data.name,
        phone: accountQuery.data.data.phone,
      }));
    }
  }, [authToken, isTokenValid, accountQuery.isSuccess, accountQuery.data]);

  const mutationEvent = useMutation({
    mutationFn: postTransaction,
    onSuccess: (data) => {
      router.push(`/invoice/${data.data.invoice}`);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
      showToast('Transaction failed, please try again later');
    },
  });

  const handlePaymentId = useCallback(
    (paymentMethod: { id: string; name: string; image_url: string }) => {
      setFormData((prev) => ({ ...prev, payment_method_id: paymentMethod.id }));
      setPayment({ name: paymentMethod.name, image: paymentMethod.image_url });
      setPaymentMethodSelected(true);
      setOpenModal(false);
    },
    []
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { name, phone } = formData;

      if (!name || !phone) {
        showToast('Name and Phone number are required');
        return;
      }

      if (!paymentMethodSelected && eventData.reg_only === 0) {
        showToast('Silakan pilih metode pembayaran terlebih dahulu', 'error');
        return;
      }

      if (discountData) {
        if (discountData?.discount > eventData.totalPrice) {
          showToast('Maaf code diskon melampaui total harga', 'error');
          return;
        }
      }
      const updatedFormData = {
        ...formData,
        items: [eventData.id],
        qty: [eventData.qty],
        total: [eventData.price],
        ...(nominalInfaq > 0 && { infaq: nominalInfaq }),
      };
      setIsProcessing(true);
      mutationEvent.mutate(updatedFormData);
    },
    [
      formData,
      paymentMethodSelected,
      eventData,
      mutationEvent,
      showToast,
      nominalInfaq,
      discountData,
    ]
  );

  const handleChangeNominal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = parseFloat(value.replace(/[^0-9]/g, ''));
    setNominalInfaq(numberValue ? numberValue : 0);
  };

  const handleAmountClick = (amount: number) => {
    setNominalInfaq(amount);
  };

  const handleRemoveDiscount = useCallback(() => {
    setDiscountData(null);
    setDiscountCode('');
    setFormData((prev) => ({
      ...prev,
      discount_code: '',
      discount_id: '',
    }));
  }, []);

  const handleVoucherActive = () => {
    setVoucherActive(!voucherActive);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      showToast('Masukkan kode voucher');
      return;
    }

    if (formData.discount_code === discountCode) {
      return;
    }

    setIsDiscountLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discount/code/${discountCode}`
      );

      if (!res.ok) {
        throw new Error('Kode diskon tidak valid');
      }

      const discountData = await res.json();
      if (discountData && discountData.data?.discount) {
        setDiscountData(discountData.data);
        setFormData((prev) => ({
          ...prev,
          discount_code: discountCode,
          discount_id: discountData.data.id,
        }));
        showToast('Diskon berhasil ditambahkan');
      } else {
        handleRemoveDiscount();
        showToast('Kode diskon tidak valid');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      handleRemoveDiscount();
      showToast(
        'Failed to apply discount. Please check the code and try again.'
      );
    } finally {
      setIsDiscountLoading(false);
    }
  };

  const calculateFinalPrice = useCallback(() => {
    if (!discountData) return eventData.totalPrice + nominalInfaq;

    if (discountData.type === 'percentage') {
      const discountAmount =
        (eventData.totalPrice * Number(discountData.discount)) / 100;
      const maxDiscount = discountData.max_discount
        ? Number(discountData.max_discount)
        : Infinity;
      return eventData.totalPrice - Math.min(discountAmount, maxDiscount);
    }

    return eventData.totalPrice - Number(discountData.discount) + nominalInfaq;
  }, [discountData, eventData.totalPrice, nominalInfaq]);

  const finalPrice = calculateFinalPrice();

  if (
    paymentMethodsQuery.isLoading ||
    accountQuery.isLoading ||
    isCheckingToken
  )
    return (
      <React.Fragment>
        <Header type="notshare" text="Selesaikan Pembayaran Anda" />
        <div className="container content-wrapper content-sm text-gray h-screen justify-center items-center flex">
          <SpinLoading />
        </div>
      </React.Fragment>
    );
  if (paymentMethodsQuery.error || accountQuery.error)
    return <div>An error occurred</div>;

  return (
    <>
      {eventData.reg_only === 0 ? (
        <Header type="notshare" text="Selesaikan Pembayaran Anda" />
      ) : (
        <Header type="notshare" text="Selesaikan Pendaftaran Anda" />
      )}

      <div className="container content-wrapper content-sm text-gray pb-32">
        <form
          id="event-form"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          {/* User Info Section */}
          {!(authToken && isTokenValid) ? (
            <div className="bg-white rounded border border-gray-100 p-6 animate-fade-in">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Silahkan{' '}
                  <a
                    className="text-primary-500 font-semibold hover:underline"
                    href="/login"
                  >
                    Login
                  </a>{' '}
                  atau lengkapi data berikut
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nama Pengguna
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    name="name"
                    placeholder="Masukkan nama lengkap"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nomor WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    name="phone"
                    placeholder="08xxx"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </div>
                {eventData.reg_only === 0 && (
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      name="email"
                      placeholder="email@example.com"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <UserProfileCard
              name={accountQuery?.data.data.name}
              phone={accountQuery?.data.data.phone}
            />

            // <div className="bg-gradient-to-br from-primary-500/10 to-white rounded shadow border border-primary-500/20 p-6 animate-fade-in mt-4">
            //   <div className="flex gap-4 items-center">
            //     <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-[#5FC0AE] text-white shadow-lg">
            //       <h4 className="font-bold text-xl">
            //         {initialName(accountQuery?.data.data.name)}
            //       </h4>
            //     </div>
            //     <div>
            //       <h6 className="font-bold text-lg text-gray-900">
            //         {accountQuery?.data.data.name}
            //       </h6>
            //       <p className="text-gray-600">
            //         {accountQuery?.data.data.phone}
            //       </p>
            //     </div>
            //   </div>
            // </div>
          )}

          {/* Payment Section */}
          {eventData.reg_only === 0 && (
            <>
              {/* Ticket Summary */}
              <div className="bg-white rounded border border-gray-100 p-6 animate-fade-in">
                <div className="bg-gradient-to-br from-primary-500/5 to-transparent p-6 rounded-xl border-2 border-dashed border-primary-500/30">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-primary-500/20">
                    <FaTicketAlt className="text-primary-500" size={20} />
                    <h3 className="font-bold text-lg text-gray-900">
                      {eventData.totalPrice === 0
                        ? 'Tiket Pendaftaran Gratis'
                        : 'Pembayaran Tiket Pendaftaran'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b-2 border-primary-500/20">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Tiket</p>
                      <h5 className="text-base md:text-xl font-bold text-gray-900">
                        {eventData.qty}
                      </h5>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Tipe</p>
                      <h5 className="text-base md:text-xl font-bold text-gray-900">
                        {eventData.type}
                      </h5>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-1">Harga</p>
                      <h5 className="text-base md:text-xl font-bold text-gray-900">
                        {formatRupiah(eventData.price)}
                      </h5>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <h5 className="text-lg font-semibold text-gray-700">
                      Total Bayar:
                    </h5>
                    <h5 className="text-2xl font-bold text-primary-500">
                      {formatRupiah(eventData.totalPrice)}
                    </h5>
                  </div>
                </div>
              </div>

              {/* Infaq Section */}
              <div className="bg-white rounded border border-gray-100 p-6 animate-fade-in">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  Tambah Infaq Seikhlasnya 💝
                </label>
                <div className="relative mb-4">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    Rp
                  </span>
                  <input
                    id="nominalRupiah"
                    type="text"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-lg"
                    onChange={handleChangeNominal}
                    name="total"
                    value={
                      nominalInfaq !== 0 ? numberFormatter(nominalInfaq) : ''
                    }
                    placeholder="Masukan Nominal"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[10000, 25000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      className="py-3 px-4 rounded-xl border-2 border-primary-500/30 bg-gradient-to-r from-primary-500/5 to-transparent hover:from-primary-500/20 hover:to-primary-500/10 hover:border-primary-500 font-bold text-gray-700 hover:text-primary-500 transition-all duration-200"
                      type="button"
                      onClick={() => handleAmountClick(amount)}
                    >
                      {formatRupiah(amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded border border-gray-100 p-6 animate-fade-in">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  Metode Pembayaran
                </h3>
                <button
                  type="button"
                  onClick={() => setOpenModal(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 bg-gray-50 hover:bg-primary-500/5 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    {payment.image && (
                      <Image
                        width={500}
                        height={500}
                        className="h-10 w-auto"
                        src={payment.image}
                        alt=""
                      />
                    )}
                    <span className="font-medium text-gray-700">
                      {payment.name ? payment?.name : 'Pilih Metode Pembayaran'}
                    </span>
                  </div>
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                    Pilih <FaChevronDown size={14} />
                  </div>
                </button>

                {/* Voucher Section */}
                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        id="voucher-checkbox"
                        type="checkbox"
                        checked={voucherActive}
                        onChange={handleVoucherActive}
                        className="w-5 h-5 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                      />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-primary-500 transition-colors">
                      Punya Kode Voucher? 🎫
                    </span>
                  </label>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      voucherActive
                        ? 'opacity-100 max-h-48 mt-4'
                        : 'opacity-0 max-h-0'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <input
                          id="discount"
                          type="text"
                          className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          name="discount"
                          placeholder="Masukan Kode Voucher"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-[#5FC0AE] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isDiscountLoading}
                        >
                          {isDiscountLoading ? <SpinLoading /> : 'Pakai'}
                        </button>
                      </div>

                      {discountData && (
                        <div className="flex gap-3 p-4 bg-gradient-to-r from-green-50 to-primary-500/5 border border-green-200 rounded-xl animate-fade-in">
                          <HiCheckCircle
                            className="text-green-500 flex-shrink-0 mt-0.5"
                            size={20}
                          />
                          <div className="text-sm text-gray-700">
                            <span className="font-semibold">
                              {discountData?.name}
                            </span>{' '}
                            sebesar{' '}
                            {discountData?.type === 'percentage'
                              ? `${Number(
                                  discountData.discount
                                )}% sampai ${currencyFormatter(
                                  Number(discountData.max_discount)
                                )} dengan minimal pembelian ${currencyFormatter(
                                  Number(discountData.min_purchase)
                                )}`
                              : currencyFormatter(
                                  Number(discountData?.discount)
                                )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded border border-gray-100 p-6 animate-fade-in mb-32">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Konfirmasi Pemesanan
                </h3>
                <p className="text-gray-600 mb-6">
                  Silahkan periksa kembali ringkasan pemesanan anda
                </p>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      width={300}
                      height={300}
                      src={eventData.image}
                      alt="event_img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-3">
                      {eventData.title}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaClock className="text-primary-500" />
                        <span>{eventData.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaGlobe className="text-primary-500" />
                        <span>{eventData.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 py-4 border-y-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-semibold text-gray-900">
                      {currencyFormatter(eventData.totalPrice)}
                    </p>
                  </div>
                  {discountData && (
                    <div className="flex justify-between items-center text-green-600">
                      <p className="font-medium">Diskon</p>
                      <p className="font-semibold">
                        -
                        {discountData?.type === 'percentage'
                          ? `${Number(discountData.discount)}%`
                          : currencyFormatter(Number(discountData?.discount))}
                      </p>
                    </div>
                  )}
                  {nominalInfaq !== 0 && (
                    <div className="flex justify-between items-center">
                      <p className="text-gray-600">Infaq Seikhlasnya</p>
                      <p className="font-semibold text-gray-900">
                        {currencyFormatter(nominalInfaq)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-gray-900">Total Bayar</p>
                  <p className="text-2xl font-bold text-primary-500">
                    {currencyFormatter(finalPrice)}
                  </p>
                </div>
              </div>
            </>
          )}
        </form>

        <PaymentModalInfaq
          open={openModal}
          onClose={() => setOpenModal(false)}
          paymentMethods={paymentMethodsQuery?.data.data}
          onSelectPayment={handlePaymentId}
          includePaymentMethod={['VA', 'bank']}
          dompetKebaikan={false}
          myBalance={''}
          custom={''}
        />
      </div>

      {/* Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="backdrop-blur-lg bg-white/95 border-t border-gray-200 shadow-2xl">
          <div className="container px-4 py-4 max-w-2xl mx-auto">
            <button
              type="submit"
              form="event-form"
              className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-300 shadow-lg ${
                isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-[#5FC0AE] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
              }`}
              disabled={isProcessing}
            >
              {isProcessing
                ? 'Processing...'
                : eventData.reg_only === 0
                ? 'Lanjutkan Pembayaran'
                : 'Lanjutkan Pendaftaran'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormEvent;
