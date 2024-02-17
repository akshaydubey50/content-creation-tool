const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const fetchVerified = createAsyncThunk("", () => {});

const verifiedSlice = createSlice({
  name: "verfied",
  initialState: {},
  extraReducers: (builder) => {},
});

export default verifiedSlice.reducer;
