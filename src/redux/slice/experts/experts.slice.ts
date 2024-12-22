import { ExpertModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { set } from "mongoose";

// Define the state interface

interface ExpertsFilter{
    category: ExpertModel[],
    search: ExpertModel[],
    verified: ExpertModel[]
}
interface ExpertsState {
    isLoading: boolean;
    isError: boolean;
    expertsList: ExpertModel[];
    filter: ExpertsFilter;
    searchQuery: string;
    isVerifiedChecked: boolean;
}

const initialState: ExpertsState = {
    isLoading: true,
    isError: false,
    expertsList: [],
    filter:{
        category:[],
        search:[],
        verified:[]
    },
    searchQuery:"",
    isVerifiedChecked:false,
};

export const fetchExpertsList = createAsyncThunk<
    ExpertModel[],
    void
>("fetch/expertsList", async () => {
    const response = await fetch("/api/experts");
    if (!response.ok) {
        throw new Error("Failed to fetch experts");
    }
    const responseBody = await response.json();
    return responseBody.data;
});

const expertsSlice = createSlice({
    name: "expertsList",
    initialState,
    reducers: {

      
        setSearchQuery: (state, action) => {
            console.log("action", action.payload)
            state.searchQuery = action.payload;
        },
        setVerifiedChecked: (state, action) => {
            state.isVerifiedChecked = action.payload;
        },
        setFilter: (state, action) => {
            console.log("action", action.payload)
            state.filter = action.payload;
        },  
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpertsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.expertsList = action.payload;
            })
            .addCase(fetchExpertsList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchExpertsList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                console.error(action.error.message);
            });
    },
});

// Selector to get the experts list
export const selectExpertsList = (state: {
    expertsList: ExpertsState;
}) => state.expertsList.expertsList;

// Selector to get loading state
export const selectIsLoading = (state: {
    expertsList: ExpertsState;
}) => state.expertsList.isLoading;

// Selector to get error state
export const selectIsError = (state: {
    expertsList: ExpertsState;
}) => state.expertsList.isError;

// Export actions (if you have any in the reducers, otherwise this can be omitted)
export const { setFilter,setSearchQuery,setVerifiedChecked } = expertsSlice.actions;

// Export the reducer
export default expertsSlice.reducer;
