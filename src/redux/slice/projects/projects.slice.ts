import { ProjectModel, ResourceModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the initial state
interface ProjectsState {
    isLoading: boolean;
    error: string | null;
    projectList: ProjectModel[];
    filter: ProjectFilter;
    searchQuery: string;

}
interface ProjectFilter{
    category: string[],
    search: string[],
    projectType: string[]
}

// Define the initial state
const initialState: ProjectsState = {
    isLoading: false,
    error: null,
    projectList: [],
    filter: {
        category: [],
        search: [],
        projectType: []
    },
    searchQuery: "",
};

// Async thunk to fetch data from the Airtable list
export const fetchProjectsList = createAsyncThunk<
    ProjectsState["projectList"],
    void
>("fetch/projectList", async () => {
    const response = await fetch("/api/projects");
    const responseBody = await response.json();
    return responseBody.data;
});

// Create the slice
const projectsSlice = createSlice({
    name: "projectList",
    initialState,
    reducers: {


        setSearchQuery: (state, action) => {
            console.log("action", action.payload)
            state.searchQuery = action.payload;
        },
        
        setFilter: (state, action) => {
            console.log("action", action.payload)
            state.filter = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchProjectsList.fulfilled,
            (state, action: PayloadAction<ProjectsState["projectList"]>) => {
                state.isLoading = false;
                state.projectList = action.payload;
            }
        );
        builder.addCase(fetchProjectsList.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProjectsList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message ?? "Something went wrong";
        });
    },
});

// Export the actions (if you have defined ProjectModel in reducers)
export const { } = projectsSlice.actions;

// Export the reducer
export default projectsSlice.reducer;
