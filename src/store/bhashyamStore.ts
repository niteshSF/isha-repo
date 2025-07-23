import { create } from "zustand";

interface State {
    bhashyam_no: number;
}

interface Actions {
    setBhashyamNo: (bhashyamNo: number) => void;
    incrementBhashyam: () => void;
    decrementBhashyam: () => void;
}

const MAX_BHASHYAM = 18;

const useBhashyamStore = create<State & Actions>((set) => ({
    bhashyam_no: 0,

    setBhashyamNo: (bhashyamNo) => set(() => ({ bhashyam_no: bhashyamNo })),

    incrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no + 1;
            if (newBhashyamNo > MAX_BHASHYAM) newBhashyamNo = MAX_BHASHYAM;
            return { bhashyam_no: newBhashyamNo };
        }),

    decrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no - 1;
            if (newBhashyamNo < 0) newBhashyamNo = 0; // Prevent going below 0
            return { bhashyam_no: newBhashyamNo };
        }),
}));

export default useBhashyamStore;
