import { ProjectModel } from "@/models/airtable.model";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ProjectsState {
    isLoading: boolean;
    error: string | null;
    projectList: ProjectModel[];
    filter: {
        groupFilter: ProjectModel[];
    };
}

const initialState: ProjectsState = {
    isLoading: false,
    error: null,
    projectList: [],
    filter: {
        groupFilter: []
    }
};

export const fetchProjectsList = createAsyncThunk<
    ProjectModel[],
    void
>("fetch/projectList", async () => {
   try{
       const response = await fetch("/api/projects");
       const responseBody = await response?.json();
       return responseBody.data;
   }catch{
    return []
   }
});

const projectsSlice = createSlice({
    name: "projectList",
    initialState,
    reducers: {
        setGroupFilter: (state, action: PayloadAction<{ groupFilter: ProjectModel[] }>) => {
            state.filter.groupFilter = action.payload.groupFilter;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjectsList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProjectsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projectList = action.payload;
                state.filter.groupFilter = action.payload; // Initialize with all projects
            })
            .addCase(fetchProjectsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? "Something went wrong";
            });
    },
});

export const { setGroupFilter } = projectsSlice.actions;
export default projectsSlice.reducer;