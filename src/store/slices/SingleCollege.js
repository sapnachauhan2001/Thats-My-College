import axiosInstance from "@/config/AxiosIntercepter";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Api = process.env.SERVICE_BASE_URL;

export const fetchSingleCollege = createAsyncThunk("SingleCollegeCollege/fetchSingleCollege", async (apiPost) => {
    try {
        const response = await axiosInstance.get(`${Api}${apiPost}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const SingleCollege = createSlice({
    name: 'singleCollege',
    initialState: {
        college: [],
        loading: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleCollege.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleCollege.fulfilled, (state, action) => {
                state.loading = false;
                state.college = action.payload;
            })
            .addCase(fetchSingleCollege.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});