import { createSlice } from '@reduxjs/toolkit'

import { AIResposne, TranscriptionAPI, AddComment } from './Apis'

const initialState = {
  AIResposneState: {
    laoding: false,
    data: [],
    error: null
  },
  transcriptionData: {
    laoding: false,
    data: [],
    error: null
  },
  addCommentState: {
    laoding: false,
    data: [],
    error: null
  }
}


// voice slices
export const GeneralSlice = createSlice({
  name: 'GeneralSlice',
  initialState,
  reducers: {
    Update_transcriptionData(state, action) {
      let { response_id, comment } = action.payload
      let stateData = JSON.parse(JSON.stringify(state.transcriptionData.data))
      const itemToUpdate = stateData.filter(item => item.response_id === response_id);

      itemToUpdate[0].comment = comment
      let udpateAry = []
      stateData.forEach((item) => {
        if (item.response_id === response_id) {
          udpateAry.push(itemToUpdate[0])
        } else {
          udpateAry.push(item)
        }
      })
      state.transcriptionData.data = udpateAry
    }
  },
  extraReducers: builder => {
    builder
      .addCase(AIResposne.pending, state => {
        state.AIResposneState.loading = true
        state.AIResposneState.data = []
        state.AIResposneState.error = null
      })
      .addCase(AIResposne.fulfilled, (state, action) => {
        state.AIResposneState.loading = false
        state.AIResposneState.data = action.payload
        state.AIResposneState.error = null
      })
      .addCase(AIResposne.rejected, (state, action) => {
        state.AIResposneState.loading = false
        state.AIResposneState.data = []
        state.AIResposneState.error = action.payload
      })

      // call TranscriptionAPI api
      .addCase(TranscriptionAPI.pending, state => {
        state.transcriptionData.loading = true
        state.transcriptionData.data = []
        state.transcriptionData.error = null
      })
      .addCase(TranscriptionAPI.fulfilled, (state, action) => {
        state.transcriptionData.loading = false
        state.transcriptionData.data = action.payload
        state.transcriptionData.error = null
      })
      .addCase(TranscriptionAPI.rejected, (state, action) => {
        state.transcriptionData.loading = false
        state.transcriptionData.data = []
        state.transcriptionData.error = action.payload
      })

      // AddComment
      .addCase(AddComment.pending, (state, action) => {
        state.addCommentState.loading = false
        state.addCommentState.data = []
        state.addCommentState.error = action.payload
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.addCommentState.loading = false
        state.addCommentState.data = []
        state.addCommentState.error = action.payload
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.addCommentState.loading = false
        state.addCommentState.data = []
        state.addCommentState.error = action.payload
      })

  }
})



export const { Update_transcriptionData } = GeneralSlice.actions
export default GeneralSlice.reducer
