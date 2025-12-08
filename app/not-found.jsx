import { BiSolidErrorAlt } from 'react-icons/bi';

export default function NotFound() {
  return (
    <div className="min-h-screen max-w-[640px] mx-auto flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-5">
      <div className="max-w-md text-center">
        {/* Icon dengan animasi */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary-500/20 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative bg-white rounded-full p-6 shadow-lg inline-block">
            <BiSolidErrorAlt size={50} className="text-yellow-400 mx-auto" />
          </div>
        </div>

        {/* Heading */}

        <h1 className="!text-4xl font-bold text-gray-900 mb-3">
          404 | Not found
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Maaf, halaman yang Anda cari tidak ditemukan. Mungkin telah dihapus
          atau Anda mengetik alamat yang salah.
        </p>

        {/* Divider */}
        <div className="w-16 h-1 bg-primary-500 rounded-full mx-auto mb-8"></div>

        {/* Button */}
        <a
          href="/"
          className="inline-block px-8 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-toscatext-primary-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Kembali ke Beranda
        </a>

        {/* Additional help text */}
        <p className="text-gray-500 text-sm mt-8">
          Butuh bantuan?{' '}
          <a
            href="/contact"
            className="text-primary-500 hover:text-primary-200 underline"
          >
            Hubungi kami
          </a>
        </p>
      </div>
    </div>
  );
}
