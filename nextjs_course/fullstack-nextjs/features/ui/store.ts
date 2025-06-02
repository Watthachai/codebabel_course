import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

export interface UiState {
  toast: {
    type: 'Success' | 'Error';
    message: string;
  } | null;
  setToast: (toast: UiState['toast']) => void;
  clearToast: () => void;
}

export const useUiStore = create<UiState>()(
  immer(
    devtools((set, get) => {
      return {
        toast: null,
        setToast(toast) {
          set(
            (state) => {
              state.toast = toast;
            },
            false,
            { type: 'ui/setToast', toast },
          );

          setTimeout(() => {
            get().clearToast();
          }, 3_000);
        },
        clearToast() {
          set(
            (state) => {
              state.toast = null;
            },
            false,
            { type: 'ui/clearToast' },
          );
        },
      };
    }),
  ),
);
