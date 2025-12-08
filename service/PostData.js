'use client';

import axiosInstance from '../lib/axios';

import Cookies from 'js-cookie';

// login
export const postLogin = async ({ email, phone, password }) => {
  try {
    const response = await axiosInstance.post('/login', {
      email,
      phone,
      password,
    });

    // Assuming the API returns the token and user data on success
    return response.data;
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Login API error:', error);

    // Extract meaningful error messages
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';

    // Throw a new error with a user-friendly message
    throw new Error(errorMessage);
  }
};

// register
export const postRegister = async (params = {}) => {
  try {
    const response = await axiosInstance.post('/request-otp', params);
    return response.data;
  } catch (error) {
    console.error('Register API error:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

// otp
export const postOtp = async ({ phone, otp }) => {
  try {
    const response = await axiosInstance.post('/otp', {
      phone,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('OTP API error:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

// setpassword
export const postSetPassword = async ({
  phone,
  password,
  password_confirmation,
}) => {
  try {
    const response = await axiosInstance.post('/set-password', {
      phone,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    console.error('Set Password API error:', error);
    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(errorMessage);
  }
};

// logout
export const logout = async () => {
  try {
    // localStorage.removeItem('authToken');
    Cookies.remove('authToken');
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('An unexpected error occurred during logout');
  }
};

// transaction
export const postTransaction = async (formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      '/transactions/store',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// rutin
export const postRoutineStore = async (formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post('/rutin/store', formData, config);
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

export const postRoutineStop = async (id) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(`/rutin/stop/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// edit profile
export const postChangePersonalData = async (formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axiosInstance.post(
      '/dashboard/change-personal-data',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error edit profile:', error);
    throw error;
  }
};

// change password
export const postChangePassword = async (formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axiosInstance.post(
      '/dashboard/change-password',
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error change password:', error);
    throw error;
  }
};

// fb Event
export const postFbEvent = async (event, formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/facebook/pixel/${event}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error change password:', error);
    throw error;
  }
};

// create grup
export const postCreateGrup = async (formData) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  try {
    const response = await axiosInstance.post('/group/store', formData, config);
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// join grup
export const postJoinGrup = async (id) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(`/group/joining/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// like
export const postLike = async (transactionId) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/amin/${transactionId}/like`,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// exit grup
export const postExitGrup = async (idGrup) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/group/exiting/${idGrup}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// donate grup
export const postDonateGrup = async (idGrup) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/group/donating/${idGrup}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// edit grup
export const postEditGrup = async (id, formData) => {
  const config = {
    headers: {
      accept: 'multipart/form-data',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/group/edit/${id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};

// add reminder
export const postAddReminder = async (id, formData) => {
  const config = {
    headers: {
      accept: 'multipart/form-data',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.post(
      `/group/reminder/${id}`,
      formData,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error transaction:', error);
    throw error;
  }
};
