import React from 'react';
import Image from 'next/image';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { numberFormatter } from '@/lib/formater';

const PaymentModal = ({
  open,
  onClose,
  paymentMethods,
  onSelectPayment,
  includePaymentMethod,
  custom,
  dompetKebaikan,
  myBalance,
}) => {
  if (!open) return null;

  return (
    <div className="fixed h-[70%] my-auto inset-0 flex items-center justify-center z-[999] transition-opacity duration-300">
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 opacity-50"
        onClick={onClose}
      ></div>
      <div className="modal-dialog modal-dialog-scrollable transform transition-transform duration-300 translate-y-0">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Pilih Metode Pembayaran</h5>
            <FaTimes
              size={24}
              color="red"
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            {includePaymentMethod.includes('bank') && (
              <>
                <div className="title-payment-wrapper">
                  <p>
                    Transfer bank (verifikasi manual 1x24 jam, minimal nominal
                    Rp. 10,000)
                  </p>
                </div>
                <div className="donate-body-wrapper">
                  <div className="payment-type-group">
                    {paymentMethods
                      .filter((payment) => payment.is_active === '1')
                      .filter((paymentMethod) => paymentMethod.type === 'bank')
                      .map((paymentMethod) => (
                        <div
                          key={paymentMethod.id}
                          className="payment-type-item cursor-pointer"
                          onClick={() => onSelectPayment(paymentMethod)}
                        >
                          <Image
                            width={500}
                            height={500}
                            src={paymentMethod.image_url}
                            alt=""
                          />
                          <p className="m-0">{paymentMethod.name}</p>
                          <FaChevronRight className="text-gray-500" />
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
            {includePaymentMethod.includes('wallet') && (
              <>
                <div className="title-payment-wrapper">
                  <p>
                    Pembayaran instan (verifikasi otomatis, minimal nominal
                    Rp.10,000)
                  </p>
                </div>
                <div className="donate-body-wrapper">
                  <div className="payment-type-group">
                    {dompetKebaikan &&
                      paymentMethods
                        .filter((payment) => payment.is_active === '1')
                        .filter(
                          (paymentMethod) =>
                            paymentMethod.type === 'dompet_kebaikan'
                        )
                        .map((paymentMethod) => (
                          <div
                            key={paymentMethod.id}
                            id="payment-wallet"
                            className="payment-type-item cursor-pointer"
                            onClick={() => onSelectPayment(paymentMethod)}
                          >
                            <div className="w-[65px] h-auto flex justify-center items-center">
                              <Image
                                width={500}
                                height={500}
                                src={paymentMethod.image_url}
                                alt=""
                                className="max-h-[30px] w-auto"
                              />
                            </div>
                            <p className="m-0">
                              {paymentMethod.name}
                              <br /> &nbsp;
                              <span className="text-green font-semibold">
                                Rp {numberFormatter(myBalance)}
                              </span>
                            </p>
                            <FaChevronRight className="text-gray-500" />
                          </div>
                        ))}
                    {custom
                      ? includePaymentMethod.includes('wallet') &&
                        paymentMethods
                          .filter((payment) => payment.is_active === '1')
                          .filter(
                            (paymentMethod) => paymentMethod.name === 'GoPay'
                          )
                          .map((paymentMethod) => (
                            <div
                              key={paymentMethod.id}
                              className="payment-type-item cursor-pointer"
                              onClick={() => onSelectPayment(paymentMethod)}
                            >
                              <Image
                                width={500}
                                height={500}
                                src={paymentMethod.image_url}
                                alt=""
                              />
                              <p>{paymentMethod.name}</p>
                              <FaChevronRight className="text-gray-500" />
                            </div>
                          ))
                      : paymentMethods
                          .filter(
                            (paymentMethod) => paymentMethod.type === 'e_wallet'
                          )
                          .map((paymentMethod) => (
                            <div
                              key={paymentMethod.id}
                              className="payment-type-item cursor-pointer"
                              onClick={() => onSelectPayment(paymentMethod)}
                            >
                              <Image
                                width={500}
                                height={500}
                                src={paymentMethod.image_url}
                                alt=""
                              />
                              <p className="" m-0>
                                {paymentMethod.name}
                              </p>
                              <FaChevronRight className="text-gray-500" />
                            </div>
                          ))}
                  </div>
                </div>
              </>
            )}

            {/* VA */}
            {includePaymentMethod.includes('VA') && (
              <>
                <div className="hidden">
                  <div className="title-payment-wrapper">
                    <p>
                      Virtual account (verifikasi otomatis, minimal nominal Rp.
                      10,000)
                    </p>
                  </div>
                  <div className="donate-body-wrapper">
                    <div className="payment-type-group">
                      {paymentMethods
                        .filter((payment) => payment.is_active === '1')
                        .filter(
                          (paymentMethod) =>
                            paymentMethod.type === 'virtual_account'
                        )
                        .map((paymentMethod) => (
                          <div
                            key={paymentMethod.id}
                            className="payment-type-item cursor-pointer"
                            onClick={() => onSelectPayment(paymentMethod)}
                          >
                            <Image
                              width={500}
                              height={500}
                              src={paymentMethod.image_url}
                              alt=""
                            />
                            <p className="m-0">{paymentMethod.name}</p>
                            <FaChevronRight className="text-gray-500" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {includePaymentMethod.includes('bank') && (
              <>
                <div className="title-payment-wrapper">
                  <p>Bayar Tunai (Konfirmasi Pembayaran ke CS)</p>
                </div>
                <div className="donate-body-wrapper">
                  <div className="payment-type-group">
                    {paymentMethods
                      .filter((payment) => payment.is_active === '1')
                      .filter((paymentMethod) => paymentMethod.type === 'tunai')
                      .map((paymentMethod) => (
                        <div
                          key={paymentMethod.id}
                          className="payment-type-item cursor-pointer"
                          onClick={() => onSelectPayment(paymentMethod)}
                        >
                          <Image
                            width={500}
                            height={500}
                            src={paymentMethod.image_url}
                            alt=""
                          />
                          <p className="m-0">{paymentMethod.name}</p>
                          <FaChevronRight className="text-gray-500" />
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
            <div className="d-none">
              <div className="title-payment-wrapper">
                <p>
                  Kartu kredit (verifikasi otomatis, minimal nominal Rp. 10,000)
                </p>
              </div>
              <div className="donate-body-wrapper">
                <div className="payment-type-group">
                  <Link href="/donasi/konfirmasi" className="payment-type-item">
                    <Image
                      width={500}
                      height={500}
                      src="/img/payment-logo/visa-mastercard.png"
                      alt=""
                    />
                    <p>Kartu Kredit</p>
                    <FaChevronRight className="text-gray-500" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
