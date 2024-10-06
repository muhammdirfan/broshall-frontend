import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchAllProjects,
  CreateProject,
  DeleteProject,
  UpdateProject,
} from "../../services/projectAPIs";

export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const response = await FetchAllProjects(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// You can create additional thunks for other operations similarly
export const createProject = createAsyncThunk(
  "projects/create",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      const response = await CreateProject(token, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
