// format Rupiah
const currencyFormatter = (amount) => {
  if (typeof amount !== 'number') return '0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const numberFormatter = (rawValue) => {
  const formattedValue = parseInt(rawValue, 10).toLocaleString('id-ID');
  return formattedValue;
};
const parseFormattedNumber = (formattedValue) => {
  if (!formattedValue) return 0;
  // Ensure the value is treated as a string
  return parseFloat(
    String(formattedValue).replace(/\./g, '').replace(/,/g, '')
  );
};

// inisial nama
const initialName = (fullName) => {
  const names = fullName.trim().split(' ');
  const initials = names.map((name) => name.charAt(0).toUpperCase()).join('');

  return initials;
};

// Format Date in Indonesian (e.g., 15 November 2023)
const dateFormatter = (date, type = 'short') => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: type,
    year: 'numeric',
  }).format(new Date(date));
};

const dayFormatter = (date, type = 'long') => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: type, // Use "short" or "long" for weekday format
  }).format(new Date(date));
};
const fullDayFormatter = (date) => {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

  // Remove 'pukul' using replace method if it exists
  return formattedDate.replace('pukul ', '').replace('.', ':') + ' WIB';
};

const handleInputChange = (rawValue) => {
  rawValue = event.target.value.replace(/\./g, '');
  if (rawValue !== '') {
    if (!isNaN(rawValue)) {
      const formattedValue = parseInt(rawValue, 10).toLocaleString('id-ID');
      return formattedValue;
    }
  }
  return '';
};

function formatTimeToWIB(timeString) {
  const regex = /^\d{2}:\d{2}:\d{2}$/;
  if (!regex.test(timeString)) {
    throw new Error('Format waktu tidak valid. Gunakan HH:MM:SS.');
  }

  return timeString.slice(0, 5) + ' WIB';
}

function capitalizeFirstLetter(string) {
  if (string.length === 0) return string; // Jika string kosong, kembalikan string kosong
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const formatCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Menambahkan nol di depan detik jika kurang dari 10
};

function formatRupiah(amount) {
  if (amount >= 1000000) {
    const juta = amount / 1000000;
    return `Rp${juta}jt`;
  }
  if (amount >= 1000) {
    const ribu = amount / 1000;
    return `Rp${ribu}rb`;
  }
  return `Rp${amount}`;
}

function donationTime(time, date) {
  const klikDate = new Date(`${date}T${time}`);
  const sekarang = new Date();

  const detik = Math.floor((sekarang - klikDate) / 1000);
  const menit = Math.floor(detik / 60);
  const jam = Math.floor(menit / 60);
  const hari = Math.floor(jam / 24);
  const minggu = Math.floor(hari / 7);

  if (detik < 60) return 'baru saja';
  if (menit < 60) return `${menit} menit yang lalu`;
  if (jam < 24) return `${jam} jam yang lalu`;
  if (hari < 7) return `${hari} hari yang lalu`;
  if (minggu < 4) return `${minggu} minggu yang lalu`;

  return klikDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTimeAgo(timestamp) {
  const waktuDonasi = new Date(timestamp);
  const sekarang = new Date();

  const detik = Math.floor((sekarang - waktuDonasi) / 1000);

  // Jika waktuDonasi di masa depan, kembalikan format tanggal biasa
  if (detik < 0) {
    return waktuDonasi.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const menit = Math.floor(detik / 60);
  const jam = Math.floor(menit / 60);
  const hari = Math.floor(jam / 24);
  const minggu = Math.floor(hari / 7);

  if (detik < 60) return 'baru saja';
  if (menit < 60) return `${menit} menit yang lalu`;
  if (jam < 24) return `${jam} jam yang lalu`;
  if (hari < 7) return `${hari} hari yang lalu`;
  if (minggu < 4) return `${minggu} minggu yang lalu`;

  return waktuDonasi.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export {
  currencyFormatter,
  initialName,
  dateFormatter,
  dayFormatter,
  fullDayFormatter,
  parseFormattedNumber,
  handleInputChange,
  numberFormatter,
  formatTimeToWIB,
  capitalizeFirstLetter,
  formatCountdown,
  formatRupiah,
  donationTime,
  formatTimeAgo,
};
