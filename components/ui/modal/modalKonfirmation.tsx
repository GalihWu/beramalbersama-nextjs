import React from 'react';
import { CiWarning } from 'react-icons/ci';
interface ConfirmationModalProps {
  type: 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  onConfirm: () => void; // Aksi ketika tombol "Ya" diklik
  onClose: () => void; // Aksi ketika modal ditutup (baik dari tombol "Tidak" atau klik di luar modal)
  isOpen: boolean;
  textConfirm?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  type,
  title,
  message,
  onConfirm,
  onClose,
  isOpen,
  textConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose} // Tutup modal ketika klik di luar area modal
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()} // Mencegah event bubbling ke parent
      >
        {/* Icon */}
        <div className="flex justify-center">
          {type === 'success' ? (
            <CiWarning size={50} className="text-4xl text-primary-500" />
          ) : type === 'warning' ? (
            <CiWarning className="text-4xl text-yellow-500" />
          ) : (
            <CiWarning className="text-4xl text-red-500" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 text-center mt-4">
          {title}
        </h3>

        {/* Message */}
        <p className="text-gray-500 text-center mt-2">{message}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            onClick={onClose} // Tutup modal ketika tombol "Tidak" diklik
          >
            Batal
          </button>
          <button
            className={` text-white px-4 py-2 rounded-md  ${
              type === 'success'
                ? 'bg-primary-200 hover:bg-primary-500'
                : type === 'warning'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : 'bg-red-500 hover:bg-red-600'
            }`}
            onClick={() => {
              onConfirm(); // Jalankan aksi konfirmasi
              onClose(); // Tutup modal setelah konfirmasi
            }}
          >
            {textConfirm || 'Ya'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
