import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

// get all voices
export const AIResposne = createAsyncThunk('AIResposne', async (_, thunkAPI) => {
  try {
    // Making GET request with axios
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/call_data/`);
    if (response.status === 200) {
      return response.data; // Assuming the data is inside the 'data' property in the response
    } else {
      let message = 'Network error';
      return thunkAPI.rejectWithValue(message); // Return the error message for rejection
    }
  } catch (error) {
    let errorMessage = error.response ? error.response.data : error.message;
    return thunkAPI.rejectWithValue(errorMessage); // Return the error message for rejection
  }
});


// Transcription API
export const TranscriptionAPI = createAsyncThunk('TranscriptionAPI', async ({ uuid }, thunkAPI) => {
  try {

    // Making GET request with axios
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API}/responses/${uuid}/`);
    if (response.status === 200) {
      return response.data; // Assuming the data is inside the 'data' property in the response
    } else {
      let message = 'Network error';
      return thunkAPI.rejectWithValue(message); // Return the error message for rejection
    }
  } catch (error) {
    let errorMessage = error.response ? error.response.data : error.message;
    return thunkAPI.rejectWithValue(errorMessage); // Return the error message for rejection
  }
});



export const AddComment = createAsyncThunk('AddComment', async ({ response_id, comment }, thunkAPI) => {
  try {

    // Making GET request with axios
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API}/response/update/${response_id}`, // The API endpoint with dynamic response_id
      {
        "comment": comment, // The request body with updated comment
      }
    );
    if (response.status === 200) {
      return response.data; // Assuming the data is inside the 'data' property in the response
    } else {
      let message = 'Network error';
      return thunkAPI.rejectWithValue(message); // Return the error message for rejection
    }
  } catch (error) {
    let errorMessage = error.response ? error.response.data : error.message;
    return thunkAPI.rejectWithValue(errorMessage); // Return the error message for rejection
  }
});