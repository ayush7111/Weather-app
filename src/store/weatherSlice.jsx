import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "cc0c1b560e4a249a69189c20b37eff0b";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const response = await axios.get(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: null,
    loading: false,
    error: null,
    unit: "C",
  },
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === "C" ? "F" : "C";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { toggleUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
