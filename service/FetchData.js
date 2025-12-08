'use client';

import axiosInstance from '../lib/axios';

// HOME
// Home hero banner
export const getHomeBanner = async () => {
  try {
    const response = await axiosInstance.get('/image/home-banner');
    return response.data;
  } catch (error) {
    console.error('Error fetching home banner:', error);
    throw error;
  }
};

// Home banners
export const getBerandaBanner = async () => {
  try {
    const response = await axiosInstance.get('/beranda/banner');
    return response.data;
  } catch (error) {
    console.error('Error fetching beranda banner:', error);
    throw error;
  }
};

// List program vertical
export const getProgramVertical = async () => {
  try {
    const response = await axiosInstance.get('/beranda/program-vertical');
    return response.data;
  } catch (error) {
    console.error('Error fetching program vertical:', error);
    throw error;
  }
};

// Program category
export const getProgramCategory = async () => {
  try {
    const response = await axiosInstance.get('/program-category');
    return response.data;
  } catch (error) {
    console.error('Error fetching program category:', error);
    throw error;
  }
};

// Program Setup
export const getProgramSetup = async ({ typeProgram }) => {
  try {
    const response = await axiosInstance.get(`/program-setup/${typeProgram}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching program setup:', error);
    throw error;
  }
};

// INFAQ
//  Qr code
export const getQrCodeInfaq = async () => {
  try {
    const response = await axiosInstance.get('/infaq/qr-code');
    return response.data;
  } catch (error) {
    console.error('Error fetching qr code:', error);
    throw error;
  }
};

// Infaq Donors
export const getDonors = async ({ limit, mode, page }) => {
  try {
    const response = await axiosInstance.get('/infaq/donors', {
      params: {
        limit,
        mode,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching donors:', error);
    throw error;
  }
};

// Prgram
// ALl program
export const getAllProgram = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/program', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all program:', error);
    throw error;
  }
};

// program byId
export const getProgramById = async (id) => {
  try {
    const response = await axiosInstance.get(`/program/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching program with ID ${id}:`, error);
    throw error;
  }
};
// program byLink
export const getProgramByLink = async (id) => {
  try {
    const response = await axiosInstance.get(`/program/link/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching program with Link ${id}:`, error);
    throw error;
  }
};

// program byId donors
export const getProgramIdDonors = async (id, { limit, mode, page }) => {
  try {
    const response = await axiosInstance.get(`/program/${id}/donors`, {
      params: {
        limit,
        mode,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching program donors with ID ${id}:`, error);
    throw error;
  }
};
// program byLink donors
export const getProgramLinkDonors = async (link, { limit, mode, page }) => {
  try {
    const response = await axiosInstance.get(`/program/link/${link}/donors`, {
      params: {
        limit,
        mode,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching program donors with ID ${id}:`, error);
    throw error;
  }
};

// fundraiser
export const getProgramIdFundraisers = async (id, { limit, mode, page }) => {
  try {
    const response = await axiosInstance.get(`/program/${id}/fundraisers`, {
      params: {
        limit,
        mode,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching program findraisers with ID ${id}:`, error);
    throw error;
  }
};
// fundraiser link
export const getProgramLinkFundraisers = async (
  link,
  { limit, mode, page }
) => {
  try {
    const response = await axiosInstance.get(
      `/program/link/${link}/fundraisers`,
      {
        params: {
          limit,
          mode,
          page,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching program findraisers with link ${id}:`, error);
    throw error;
  }
};

// payment method
export const getPaymentMethods = async ({
  status,
  usage,
  program_id,
  program_link,
}) => {
  try {
    const params = {};
    if (status) params.status = status;
    if (usage) params.usage = usage;
    if (program_id) params.program_id = program_id;
    if (program_link) params.program_link = program_link;

    const response = await axiosInstance.get('payment/payment-method', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

// nominal option
export const getPaymentNominalOption = async ({ program_id }) => {
  try {
    const response = await axiosInstance.get('payment/nominal-option', {
      params: {
        program_id,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

// Transaction
export const getTransactionInvoice = async ({ transaction }) => {
  try {
    const response = await axiosInstance.get(
      `/transactions/invoice/${transaction}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const getProgramShowOn = async (type) => {
  try {
    const response = await axiosInstance.get(`/program-show/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching program with Type ${type}:`, error);
    throw error;
  }
};
export const getProgramMitraSalur = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/program/mitra-salur`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching :`, error);
    throw error;
  }
};

// program report
export const getReport = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/report`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching report :`, error);
    throw error;
  }
};
// program project
export const getProjectSummary = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/project/summary`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching report :`, error);
    throw error;
  }
};
export const getProject = async (params = {}) => {
  try {
    const response = await axiosInstance.get(`/project`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching report :`, error);
    throw error;
  }
};

// ZAKAT
export const getZakatNishab = async () => {
  try {
    const response = await axiosInstance.get('/zakat/nishab');
    return response.data;
  } catch (error) {
    console.error('Error fetching zakat nisab :', error);
    throw error;
  }
};
export const getZakatPrograms = async () => {
  try {
    const response = await axiosInstance.get('/zakat/programs');
    return response.data;
  } catch (error) {
    console.error('Error fetching zakat programs :', error);
    throw error;
  }
};
export const getZakatNishabLive = async () => {
  try {
    const response = await fetch(
      'https://logam-mulia-api.vercel.app/prices/hargaemas-com'
    );
    if (response.ok) {
      const data = await response.json(); // Extract JSON data from the response
      return data.data[0];
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching zakat nisab :', error);
    throw error;
  }
};

export const getPayment = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/payment/payment-method', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error Get Settings:', error);
    throw error;
  }
};
export const getBlogs = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/blogs', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error Get Settings:', error);
    throw error;
  }
};
export const getBlogsByLink = async (link) => {
  try {
    const response = await axiosInstance.get(`/blogs/${link}`);
    return response.data;
  } catch (error) {
    console.error('Error Get Settings:', error);
    throw error;
  }
};
// Dashboard
export const getSettings = async () => {
  try {
    const response = await axiosInstance.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error Get Settings:', error);
    throw error;
  }
};
export const getMyAccount = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/my-account');
    return response.data;
  } catch (error) {
    console.error('Error Get My Account:', error);
    throw error;
  }
};

// Rutin Saya
export const getMyRutin = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/my-rutin');
    return response.data;
  } catch (error) {
    console.error('Error Get My Rutin:', error);
    throw error;
  }
};

// Donasi Saya
export const getMyDonation = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/dashboard/my-donation', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error Get My Donation:', error);
    throw error;
  }
};

// Event Saya
export const getMyEvent = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/my-transaction-event');
    return response.data;
  } catch (error) {
    console.error('Error Get My Event:', error);
    throw error;
  }
};

// salur saya
export const getMySalur = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/dashboard/my-salur', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error Get My Salur:', error);
    throw error;
  }
};

export const getIsTokenValid = async () => {
  try {
    const response = await axiosInstance.get('/validate-token');
    return response.data;
  } catch (error) {
    console.error('Error Get My Account:', error);
    throw error;
  }
};
// export const getFbPixels = async () => {
//   try {
//     const response = await axiosInstance.get('/facebook/pixels');
//     return response.data;
//   } catch (error) {
//     console.error('Error Get Pixels:', error);
//     throw error;
//   }
// };

// Rutin
// detail rutin
export const getRutinDetail = async (id) => {
  try {
    const response = await axiosInstance.get(`/rutin/detail/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching detail rutin with ID ${id}:`, error);
    throw error;
  }
};

// deatail rutin transaction
export const getRutinDetailTransaction = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/rutin/detail/list-transactions/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching detail rutin transaction with ID ${id}:`,
      error
    );
    throw error;
  }
};

// event
// ALl event
export const getAllEvent = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/event', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all event:', error);
    throw error;
  }
};

// detail event
export const getEventByLink = async (link) => {
  try {
    const response = await axiosInstance.get(`/event/link/${link}`);
    return response.data;
  } catch (error) {
    console.error(`error fetching event with link ${link}`, error);
    throw error;
  }
};

// discount by code
export const getDiscountByCode = async (code) => {
  try {
    const response = await axiosInstance.get(`/discount/code/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching discount with code ${code}:`, error);
    throw error;
  }
};

// ALl Grup
export const getAllGrup = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/group', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching all grup:', error);
    throw error;
  }
};

// my Grup
export const getMyGrup = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/dashboard/my-group', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching my grup:', error);
    throw error;
  }
};

// detail grup
export const getGrupData = async (link) => {
  try {
    const response = await axiosInstance.get(`/group/link/${link}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching detail grup with link ${link}:`, error);
    throw error;
  }
};

// my-wallet
export const getMyWallet = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/my-wallet');
    return response.data;
  } catch (error) {
    console.error('Error Get My Wallet:', error);
    throw error;
  }
};
