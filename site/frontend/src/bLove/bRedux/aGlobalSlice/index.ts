import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type GlobalSliceType = {
  message: "Broo... Inside GlobalSliceState...",
  receivedObject: object,
  extraObject: object,
}

const initialState: GlobalSliceType = {
  message: "Broo... Inside GlobalSliceState...",
  receivedObject: {},
  extraObject: {},
}

const globalSlice = createSlice({
  name: "globalSlice",
  initialState: initialState,
  reducers: {
    receivedObjectAction: (state, action: PayloadAction<object>) => {
      state.receivedObject = action.payload
    },
    extraObjectAction: (state, action: PayloadAction<object>) => {
      state.extraObject = action.payload
    },
  }
})

export default globalSlice;
