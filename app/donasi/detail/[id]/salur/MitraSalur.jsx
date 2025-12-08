import { getProgramMitraSalur } from '@/service/FetchData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

const DonaturBox = ({ logo, name, community }) => (
  <div className="donatur-row">
    <div className="donatur-box salur-box">
      <div className="image-wrap">
        <div className="image-box">
          <Image width={300} height={300} src={logo} alt={`${name}_salur`} />
        </div>
      </div>
      <div className="text-wrap">
        <h4>{name}</h4>
        <p>{community}</p>
      </div>
      <div className="text-nominal">
        <Image
          width={36}
          height={36}
          src="/img/icons/verif/Verifikasi II.png"
          className="ml-1 !w-6 h-auto"
          alt="verified"
        />
      </div>
    </div>
  </div>
);

export const MitraSalur = ({ programLink }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ['programMitraSalur', programLink],
    queryFn: () => getProgramMitraSalur({ program_link: programLink }),
    enabled: !!programLink,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
  if (isLoading) return <></>;
  if (error) return <div>An error occurred: {error.message}</div>;
  const mitraData = data?.data;

  return (
    <div className="donate-body-wrapper border-top">
      <div
        className="accordion accordion-flush accordion-patners"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <div
              className={`accordion-button cursor-pointer ${
                isExpanded ? '' : 'collapsed'
              }`}
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded={isExpanded}
              aria-controls="flush-collapseOne"
              onClick={handleToggle}
              style={{
                color: '#4d4d4d',
              }}
            >
              <div className="image-salur-profile">
                {mitraData.map((donatur, index) => (
                  <div
                    key={index} // Add a unique key for each item
                    className="salur-profile"
                    style={{ backgroundImage: `url(${donatur.image_url})` }} // Corrected template literal syntax
                  />
                ))}
              </div>
              <div className="text-salur-profile">Mitra Salur</div>
            </div>
          </h2>
          {isExpanded && (
            <div
              id="flush-collapseOne"
              className="accordion-collapse show"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body accordion-patners-image">
                {mitraData.map((donatur, index) => (
                  <DonaturBox
                    key={index}
                    logo={donatur.image_url}
                    name={donatur.name}
                    community={donatur.community}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
