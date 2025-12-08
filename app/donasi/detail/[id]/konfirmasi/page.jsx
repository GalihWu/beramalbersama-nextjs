'use client';

import Header from '@/components/ui/header';
import { postTransaction } from '@/service/PostData';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import useFormStore from '@/stores/FormStore';
import { useRouter } from 'next/navigation';
import { cleanUpdatedData } from '@/lib/utlis';
import { numberFormatter } from '@/lib/formater';
import { useToast } from '@/context/ToastContext';
import { sendAddToCartInfoEvent } from '@/lib/pixels';
// import { sendAddToCartEvent } from "@/components/global/sendAddToCartEvent";
import { sendPurchaseEvent } from '@/components/global/sendPurchaseEvent';
import { UserProfileCard } from '@/components/ui/userProfileCard';

// import GTMPageViewLoader from "@/components/global/GTMPageViewLoader";

const DonasiKonfirmasi = ({ params }) => {
  const showToast = useToast();
  const router = useRouter();
  const { formData, updateFormData } = useFormStore();
  const [hideName, setHideName] = useState(false);

  useEffect(() => {
    if (formData.items.length === 0) {
      return router.push(`/donasi/detail/${params.id}`);
    } else if (formData.total.length === 0) {
      return router.push(`/donasi/detail/${params.id}/form`);
    } else if (formData.payment_method_id === '') {
      return router.push(`/donasi/detail/${params.id}/payment`);
    }
  }, [formData, params.id, router]);

  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    phone: '',
    doa: '',
    source: 'WEB',
    reff_code: '',
    leads: '',
  });

  const [nominalValue, setNominalValue] = useState(formData.total[0] || 0);
  const [paymentData, setPaymentData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [konfirmProgramLink, setKonfirmProgramLink] = useState('');

  const mutation = useMutation({
    mutationFn: postTransaction,
    onSuccess: (response) => {
      const { phone } = formInputs;
      const { data } = response;
      const { invoice, total, programs } = data;
      sendAddToCartInfoEvent(phone, total, programs, invoice);
      // sendAddToCartEvent(total, programs[0], response.data.invoice);
      sendPurchaseEvent(total, programs[0], response.data.invoice);
      // if (response.data.payment_url) {
      //   router.push(response.data.payment_url);
      // } else {
      //   router.push(`/invoice/${response.data.invoice}`);
      // }
      router.push(`/invoice/${response.data.invoice}`);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Handle nominal input change
  const handleNominalChange = useCallback((e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = rawValue ? parseInt(rawValue, 10) : 0;
    setNominalValue(numericValue);
  }, []);

  useEffect(() => {
    if (formData.name !== '') {
      const { name, phone } = formData;
      setFormInputs((prev) => ({
        ...prev,
        name,
        phone,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone } = formInputs;

    if (!name || !phone) {
      showToast('Nama dan Nomor Telepon harus diisi', 'error');
      return;
    }
    if (nominalValue <= 1000) {
      showToast('Mohon memasukan nominal lebih dari 1000', 'error');
      return;
    }
    const displayName = hideName ? 'Hamba Allah' : name;

    setIsProcessing(true);
    const updatedData = cleanUpdatedData({
      ...formData,
      ...formInputs,
      name: displayName,
      total: [nominalValue],
    });

    // console.log(updatedData);
    updateFormData(updatedData);
    // mutation.mutate(updatedData);

    mutation.mutate(updatedData, {
      onSuccess: () => {
        setIsProcessing(false);
      },
      onError: () => setIsProcessing(false),
    });
  };

  useEffect(() => {
    const data = localStorage.getItem('paymentData');
    const konfirmProgramLink = localStorage.getItem('konfirmProgramLink');
    const reffCode = localStorage.getItem('reffCode');
    const leads = localStorage.getItem('leads');
    const source = localStorage.getItem('user_source') || 'unknown';
    setKonfirmProgramLink(konfirmProgramLink);

    if (data) {
      setPaymentData(JSON.parse(data));
    }

    if (reffCode) {
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        reffCode,
      }));
    }

    if (leads) {
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        leads,
      }));
    }
    if (source) {
      setFormInputs((prevInputs) => ({
        ...prevInputs,
        source,
      }));
    }
  }, []);

  return (
    <>
      <Header type="notshare" text="Konfirmasi Pembayaran" />
      {/* <GTMPageViewLoader /> */}
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="donate-body-wrapper full-height">
            <form onSubmit={handleSubmit} className="form-donate">
              <div className="form-row" style={{ flexDirection: 'column' }}>
                <div className="col-12">
                  <div className="form-group">
                    <div className="input-group nominal-input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="rupiahText">
                          Rp.
                        </span>
                      </div>
                      <input
                        id="nominalRupiah"
                        type="text"
                        className="form-control !mb-2"
                        aria-label="Nominal"
                        aria-describedby="rupiahText"
                        placeholder="Masukan Nominal"
                        value={numberFormatter(nominalValue)}
                        onChange={handleNominalChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="payment-infaq !w-full !pb-0">
                  <div className="input-payment">
                    {paymentData.img && (
                      <Image
                        width={500}
                        height={500}
                        className="h-12 w-auto"
                        src={paymentData.img}
                        alt=""
                      />
                    )}
                    <div className="payment-text">{paymentData.name}</div>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/donasi/detail/${konfirmProgramLink}/payment`
                        )
                      }
                      className={`btn button-cyan px-3 !flex gap-1 items-center justify-center`}
                    >
                      Ganti <FaChevronDown className="ml-1" />
                    </button>
                  </div>
                </div>

                {formData.name === '' && (
                  <div className="col-12">
                    <div className="mb-4 mt-2 w-100 text-center">
                      <p>
                        Silahkan{' '}
                        <a
                          id="login-page-konfirmasi"
                          className="auth-link"
                          href="/login"
                        >
                          Login
                        </a>{' '}
                        atau lengkapi data berikut
                      </p>
                    </div>
                  </div>
                )}
                {formData.name === '' ? (
                  <>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          id="fullName"
                          type="text"
                          className="form-control"
                          name="name"
                          value={formInputs.name}
                          onChange={handleChange}
                          placeholder="Nama Lengkap"
                        />
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            name="hideName"
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
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <div className="input-group input-wa">
                          <input
                            id="noWa"
                            type="tel"
                            className="form-control"
                            name="phone"
                            value={formInputs.phone}
                            onChange={handleChange}
                            placeholder="No. Whatsapp"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          value={formInputs.email}
                          onChange={handleChange}
                          placeholder="Email (Optional)"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <UserProfileCard
                    name={formData.name}
                    phone={formData.phone}
                  />
                )}

                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      id="message"
                      name="doa"
                      rows={3}
                      className="form-control"
                      placeholder="Do'a atau Pesan"
                      value={formInputs.doa}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="alert alert-success" role="alert">
                    Pembayaran donasi ditujukan ke rekening atas nama{' '}
                    <span className="font-bold">{paymentData.behalf}</span>.
                    Untuk nominal donasi yang tidak sesuai dengan angka unik
                    yang tertera, akan kami catat di kategori akad infak.
                  </div>
                </div>
              </div>
              <div className="donate-sticky-total">
                <div className="container">
                  <div className="donate-sticky-content donate-total shadow-sm">
                    <button
                      id="btn-konfirmasi"
                      type="submit"
                      className="btn button-orange w-100"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Konfirmasi'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiKonfirmasi;
