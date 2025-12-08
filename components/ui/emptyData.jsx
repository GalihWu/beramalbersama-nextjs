import Image from 'next/image';

export const EmptyData = ({ img, title, desc, component }) => (
  <div className="donate-body-content pb-0">
    <div className="donatur-empty">
      <div className="h-14 w-14 overflow-hidden">
        <Image
          src={img || '/img/icons/empty.png'}
          alt="Empty State"
          className="h-full w-full object-contain"
          width={300}
          height={300}
        />
      </div>
      <h5 className="font-semibold mt-2 text-base md:text-lg">{title}</h5>
      <div className="text-center font-light text-xs md:text-base max-w-[70%] text-gray">
        {desc}
      </div>
      <div className="mt-3">{component}</div>
    </div>
  </div>
);
