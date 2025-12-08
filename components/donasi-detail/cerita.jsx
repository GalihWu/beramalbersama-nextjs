import React, { useState } from 'react';
import { TitleBorder } from '../ui/TitleBorder';
import { dateFormatter } from '@/lib/formater';
// import { stdin } from "process";

export const Cerita = ({ story, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandCerita = () => {
    setIsExpanded(true);
  };

  return (
    <div
      className="donate-body-wrapper block"
      id="donateStory"
      style={{
        maxHeight: isExpanded ? 'none' : '400px',
        overflow: isExpanded ? 'visible' : 'hidden',
      }}
    >
      <div className="black-card">
        <div className="donate-body-title">
          <TitleBorder title="Kenapa Perlu Membantu?" />

          <p className=" hidden" style={{ color: '#29a399' }}>
            {date && dateFormatter(date)}
          </p>
        </div>
        <div className="">
          <div dangerouslySetInnerHTML={{ __html: story }}></div>
          <br />
        </div>

        {/* Tombol hanya untuk menampilkan seluruh cerita, tanpa fungsi "lebih sedikit" */}
        {!isExpanded && (
          <div className="action-more" onClick={expandCerita}>
            <a
              id="cerita-selengkapnya"
              href="#"
              onClick={(e) => e.preventDefault()}
              className="btn-tosca"
            >
              Baca Selengkapnya
            </a>
          </div>
        )}

        <div className="box-disclaimer">
          <b>
            Disclaimer : Informasi, opini dan foto yang ada di halaman galang
            dana ini adalah milik dan tanggung jawab penggalang dana. Jika ada
            masalah/kecurigaan silakan{' '}
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?phone=6281912344745&text=Assalamu%27alaikum"
            >
              lapor kepada kami disini.
            </a>
          </b>
        </div>
      </div>
    </div>
  );
};
