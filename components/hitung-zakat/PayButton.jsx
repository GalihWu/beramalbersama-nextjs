import { currencyFormatter } from '@/lib/formater';
import { getProgramSetup } from '@/service/FetchData';
import useFormStore from '@/stores/FormStore';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const PayButton = ({
  isZakat,
  isZakatEmas,
  activeMenu,
  zakatEmas,
  zakat,
  zakatType,
}) => {
  const router = useRouter();
  const { updateFormData, clearFormData } = useFormStore();

  const { data, error, isLoading } = useQuery({
    queryKey: ['zakatPrograms', 'zakat'],
    queryFn: () => getProgramSetup({ typeProgram: 'zakat' }),
  });

  useEffect(() => {
    clearFormData();
  }, [clearFormData]);

  if (isLoading) return <div></div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const programZakat = data?.data[0];
  const parsedValue = JSON.parse(programZakat.value);

  const idzakat = parsedValue.id;
  const linkzakat = parsedValue.link;

  const totalZakat = activeMenu === 'zEmas' ? zakatEmas : zakat;

  const handleChange = (id, link) => {
    updateFormData({
      type: 'zakat',
      program_type: 'zakat',
      items: [id],
      zakat_type: [zakatType],
      total: [totalZakat],
    });
    // console.log('id', id, 'link', link);
    router.push(`/donasi/detail/${link}/payment`);
    // router.push(`/donasi/detail/${link}/form`);
  };

  const handleNominalInfaq = (nominal) => {
    localStorage.setItem('nominalInfaq', nominal);
  };

  return (
    <div className="donate-sticky-total">
      <div className="container">
        <div className="donate-sticky-content donate-total shadow-sm">
          <div className="donate-total-text">
            {isZakat || isZakatEmas ? (
              <span>Total Zakat</span>
            ) : (
              <span>Infaq</span>
            )}

            <div className="font-semibold text-base md:text-lg">
              {activeMenu === 'zEmas'
                ? currencyFormatter(zakatEmas)
                : currencyFormatter(zakat)}
            </div>
          </div>
          {isZakat || isZakatEmas ? (
            <button
              className="btn button-orange"
              onClick={() => handleChange(idzakat, linkzakat)}
            >
              Bayar Zakat
            </button>
          ) : (
            <Link
              href="/infaq"
              className="btn button-orange"
              onClick={() => handleNominalInfaq(zakat || zakatEmas)}
            >
              Bayar Infaq
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
