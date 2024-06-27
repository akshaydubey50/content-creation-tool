import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export const isUserLoggedInSlice = createAsyncThunk(
//     "user/fetchUserSession",
//     async () => {
//         const supabase = createClientComponentClient();
//         const {
//             data: { session },
//         } = await supabase.auth.getSession();
//         return session;
//     }
// );

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        isUserAuthenticated: false,
    },
    reducers: {
      
        setUserAuth: (state, action) => {
            state.isUserAuthenticated = action.payload;
        },
        
        
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(isUserLoggedInSlice.pending, (state, action) => {
    //             state.isUserAuthenticated = false;
    //             state.error = null;
    //         })
    //         .addCase(isUserLoggedInSlice.fulfilled, (state, action) => {
    //             state.isUserAuthenticated = true;
    //             state.userSession = action.payload;
    //         })
    //         .addCase(isUserLoggedInSlice.rejected, (state, action) => {
    //             state.isUserAuthenticated = false;
    //             state.error = action.error.message;
    //         });
    // },
});

export const { setUserSession, setUserAuth } = userSlice.actions;

export default userSlice.reducer;