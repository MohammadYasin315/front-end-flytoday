import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  children: number;
  location: string;
  checkIn: string; 
  checkOut: string; 
  guests: number;
  rooms: number;
}

const initialState: SearchState = {
  location: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  rooms: 1,
  children: 0
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<{
      location: string;
      checkIn: Date | null;
      checkOut: Date | null;
      guests: number;
      rooms: number;
    }>) => {
      const formatDate = (date: Date | null): string => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      return {
        ...state,
        location: action.payload.location,
        checkIn: formatDate(action.payload.checkIn),
        checkOut: formatDate(action.payload.checkOut),
        guests: action.payload.guests,
        rooms: action.payload.rooms,
      };
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;