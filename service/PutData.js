// delete reminder
export const putDeleteReminder = async (id) => {
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await axiosInstance.put(`/group/reminder/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error delete reminder:', error);
    throw error;
  }
};
