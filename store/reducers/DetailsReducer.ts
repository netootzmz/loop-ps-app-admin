import { iReducer } from "../../@types/store";
import { iDetailsState } from "../../@types/store/states";

const initialState = {
  results: null,
};

const DetailsReducer: iReducer<iDetailsState> = (
  state = initialState,
  { type }
) => {
  switch (type) {
    // case detailTypes.tableData:
    //     return { ...state, ...payload };

    default:
      return state;
  }
};

export default DetailsReducer;
