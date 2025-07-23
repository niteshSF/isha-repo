import { create } from "zustand"

interface State {
  sutra_no: number
}

interface Actions {
  setSutraNo: (sutraNo: number) => void
  incrementSutra: () => void
  decrementSutra: () => void
}

const MAX_SUTRA = 18

const useSutraStore = create<State & Actions>((set) => ({
  sutra_no: 0,

  setSutraNo: (sutraNo) => set(() => ({ sutra_no: sutraNo })),

  incrementSutra: () =>
    set((state) => {
      let newSutraNo = state.sutra_no + 1
      if (newSutraNo > MAX_SUTRA) newSutraNo = -1
      return { sutra_no: newSutraNo }
    }),

  decrementSutra: () =>
    set((state) => {
      let newSutraNo = state.sutra_no - 1
      if (newSutraNo < -1) newSutraNo = MAX_SUTRA
      return { sutra_no: newSutraNo }
    }),
}))

export default useSutraStore
