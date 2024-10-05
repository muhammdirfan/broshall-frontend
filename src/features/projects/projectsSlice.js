import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProject, FetchAllProjects } from "../../services/projectAPIs";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await FetchAllProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await CreateProject(data);
      return response;
    } catch (error) {
      const errorMessage =
        error.response?.data || "An unexpected error occurred";
      return rejectWithValue(errorMessage);
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearProjectsState: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.reverse(); // Assuming you still want them reversed
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    // Handle other async actions similarly
  },
});

export const { clearProjectsState } = projectsSlice.actions;

export default projectsSlice.reducer;
