import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFormStore = create(
  persist(
    (set) => ({
      formData: {
        type: '',
        program_type: '',
        items: [],
        projects: [],
        total: [],
        doa: null,
        payment_method_id: '',
        status: 'Pending',
        name: '',
        phone: '',
      },
      updateFormData: (newData) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...newData,
          },
        })),
      clearFormData: () => {
        set({
          formData: {
            type: '',
            program_type: '',
            items: [],
            projects: [],
            total: [],
            doa: null,
            payment_method_id: '',
            status: 'Pending',
            name: '',
            phone: '',
          },
        });
        localStorage.removeItem('zustand:persist:formData');
      },
    }),
    {
      name: 'form-data-storage',
    }
  )
);

export default useFormStore;
