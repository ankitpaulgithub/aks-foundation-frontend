import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Auth headers - in production, this should come from auth state
const getAuthHeaders = () => ({
  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM5NTMzNzE2Y2VjZTBjNTZmZTZhZSIsImVtYWlsIjoiYW5raXQucGF1bDk5NTVAZ21haWwuY28iLCJpYXQiOjE3NjQ2ODM5ODIsImV4cCI6MTc2NTI4Mzk4Mn0.9zYeRr4mgpaxaYcAecC0kg5sty6zmBbAwhF1JRg2d7Q`
});

/**
 * Fetch students list with pagination
 */
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async ({ page = 1, limit = 10, query = {} }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/userapp/students/list`,
        {
          query: { isDeleted: false, ...query },
          options: {
            page,
            limit,
            pagination: true
          }
        },
        { headers: getAuthHeaders() }
      );

      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      }
      return rejectWithValue('Failed to fetch students');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Fetch single student by ID
 */
export const fetchStudentById = createAsyncThunk(
  'students/fetchStudentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/userapp/students/get/${id}`,
        { headers: getAuthHeaders() }
      );

      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      }
      return rejectWithValue('Failed to fetch student');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Create new student
 */
export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (formData, { rejectWithValue }) => {
    try {
      const headers = { ...getAuthHeaders() };
      // Don't set Content-Type for FormData - axios will set it automatically
      
      const response = await axios.post(
        `${API_URL}/userapp/students/create`,
        formData,
        { headers }
      );

      if (response.data.status === 'SUCCESS') {
        return response.data.data;
      }
      return rejectWithValue('Failed to create student');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/**
 * Validate field (mobile, email, aadhaar, registrationNo)
 */
export const validateField = createAsyncThunk(
  'students/validateField',
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/userapp/students/validate-field`,
        { field, value },
        { headers: getAuthHeaders() }
      );

      if (response.data.status === 'SUCCESS') {
        return { field, ...response.data.data };
      }
      return rejectWithValue('Validation failed');
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  // List state
  students: [],
  pagination: {
    currentPage: 1,
    pageCount: 1,
    itemCount: 0,
    perPage: 10
  },
  listLoading: false,
  listError: null,
  lastFetched: null,

  // Single student state
  currentStudent: null,
  studentLoading: false,
  studentError: null,

  // Create state
  createLoading: false,
  createError: null,
  createSuccess: false,

  // Validation state
  validationResults: {},
  validatingFields: {}
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // Clear current student
    clearCurrentStudent: (state) => {
      state.currentStudent = null;
      state.studentError = null;
    },
    // Clear create state
    clearCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
    },
    // Clear validation results
    clearValidation: (state) => {
      state.validationResults = {};
      state.validatingFields = {};
    },
    // Clear specific field validation
    clearFieldValidation: (state, action) => {
      delete state.validationResults[action.payload];
    },
    // Invalidate cache (force refetch)
    invalidateCache: (state) => {
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch students list
      .addCase(fetchStudents.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.listLoading = false;
        state.students = action.payload.data || [];
        if (action.payload.paginator) {
          state.pagination = {
            currentPage: action.payload.paginator.currentPage || 1,
            pageCount: action.payload.paginator.pageCount || 1,
            itemCount: action.payload.paginator.itemCount || 0,
            perPage: action.payload.paginator.perPage || 10
          };
        }
        state.lastFetched = Date.now();
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
        state.students = [];
      })

      // Fetch single student
      .addCase(fetchStudentById.pending, (state) => {
        state.studentLoading = true;
        state.studentError = null;
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
        state.studentLoading = false;
        state.currentStudent = action.payload;
      })
      .addCase(fetchStudentById.rejected, (state, action) => {
        state.studentLoading = false;
        state.studentError = action.payload;
      })

      // Create student
      .addCase(createStudent.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.createLoading = false;
        state.createSuccess = true;
        // Invalidate cache so list refetches
        state.lastFetched = null;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      })

      // Validate field
      .addCase(validateField.pending, (state, action) => {
        const field = action.meta.arg.field;
        state.validatingFields[field] = true;
      })
      .addCase(validateField.fulfilled, (state, action) => {
        const { field, exists, message } = action.payload;
        state.validatingFields[field] = false;
        state.validationResults[field] = { exists, message };
      })
      .addCase(validateField.rejected, (state, action) => {
        const field = action.meta.arg.field;
        state.validatingFields[field] = false;
        state.validationResults[field] = { exists: false, message: 'Validation failed' };
      });
  }
});

export const {
  clearCurrentStudent,
  clearCreateState,
  clearValidation,
  clearFieldValidation,
  invalidateCache
} = studentSlice.actions;

// Selectors
export const selectStudents = (state) => state.students.students;
export const selectPagination = (state) => state.students.pagination;
export const selectListLoading = (state) => state.students.listLoading;
export const selectListError = (state) => state.students.listError;
export const selectCurrentStudent = (state) => state.students.currentStudent;
export const selectStudentLoading = (state) => state.students.studentLoading;
export const selectStudentError = (state) => state.students.studentError;
export const selectValidationResults = (state) => state.students.validationResults;
export const selectValidatingFields = (state) => state.students.validatingFields;

export default studentSlice.reducer;
