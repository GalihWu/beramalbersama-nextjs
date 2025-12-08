'use client';

import Header from '@/components/ui/header';
import {
  handleInputChange,
  numberFormatter,
  parseFormattedNumber,
} from '@/lib/formater';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import useFormStore from '@/stores/FormStore';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { sendAddPaymentInfoEvent } from '@/lib/pixels';
import { GTMAddEvent } from '@/components/global/GTMAddEvent';

const DonasiForm = ({ dataNominal, params }) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [nominal, setNominal] = useState('');
  const { updateFormData, formData } = useFormStore();

  useEffect(() => {
    if (formData) {
      if (formData.items.length === 0) {
        return router.push(`/donasi/detail/${params.id}`);
      }
    }
  }, [formData, params.id, router]);

  const handleChoiceChange = (choiceNominal) => {
    setNominal(choiceNominal);
    setShowAlert(false);
  };

  const handleNominalChange = (e) => {
    const value = Math.max(0, e.target.value);
    const formattedValue = handleInputChange(value); // Format with separators
    setNominal(formattedValue);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const isNominalValid = parseFormattedNumber(nominal) >= 10000;

  useEffect(() => {
    updateFormData({ total: [] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    if (isNominalValid) {
      if (
        Array.isArray(formData.total) &&
        typeof formData.total[0] === 'number' &&
        !isNaN(formData.total[0])
      ) {
      } else {
        await updateFormData({
          total: [parseFormattedNumber(nominal)],
        });
      }

      router.push(`/donasi/detail/${params.id}/payment`);
    }
  };
  useEffect(() => {
    sendAddPaymentInfoEvent();
    if (
      Array.isArray(formData.total) &&
      typeof formData.total[0] === 'number' &&
      !isNaN(formData.total[0])
    ) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.total]);

  useEffect(() => {
    if (dataNominal) {
      GTMAddEvent({ event: 'nominalinfo' });
    }
  }, [dataNominal]);

  return (
    <>
      <Header type="notshare" text="Nominal yang akan didonasikan" />
      {/* <GTMPageViewLoader /> */}
      <div className="content-wrapper bg-grey">
        <div className="container">
          <div className="donate-body-wrapper pb-80">
            {showAlert && (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Nominal donasi belum dipilih
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseAlert}
                  aria-label="Close"
                />
              </div>
            )}
            <h5 className="title-donate-form">Masukan Nominal Donasi</h5>
            {/* <div className="banner-donate-form">
              <Image
                width={500}
                height={500}
                src="/img/banner/bannerForm.webp"
                alt="Banner Donasi"
                className="rounded-md"
                loading="lazy"
              />
            </div> */}
            <div className="price-donate">
              {dataNominal.map((choice, index) => (
                <Link
                  id={`nominal-${index + 1}`}
                  key={choice.id}
                  href={`/donasi/detail/${params.id}/payment`}
                  onClick={() => {
                    handleChoiceChange(choice.nominal);
                    updateFormData({
                      total: [choice.nominal],
                    });
                  }}
                  className="btn button-price"
                >
                  <h5>
                    Rp {numberFormatter(choice.nominal)} <FaAngleRight />
                  </h5>
                  {choice.nama_pilihan && <p>{choice.nama_pilihan}</p>}
                </Link>
              ))}
              <div className="other-nominal">
                <h5>Nominal donasi lainnya</h5>
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
                      aria-label="Nominal"
                      aria-describedby="rupiahText"
                      placeholder="Masukkan Nominal"
                      value={nominal}
                      onChange={handleNominalChange}
                    />
                  </div>
                  <p className="text-note">Donasi minimal Rp 10.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="donate-sticky-total">
        <div className="container">
          <div className="donate-sticky-content donate-total shadow-sm">
            <button
              id="btn-submit-nominal"
              onClick={handleSubmit}
              className={`btn button-orange w-100 ${
                !isNominalValid ? 'disabled' : ''
              }`}
              aria-disabled={!isNominalValid}
            >
              Pilih Metode Pembayaran
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonasiForm;
