import {FETCH_FAIL, FETCH_START, FETCH_SUCCESS } from './../actions/actions'

const initalState = {
    quoteObject: {},
    isFetching: false,
    err: ''
}

const reducer = (state=initalState, action) =>{
    switch (action.type) {
        case(FETCH_START):
          return({
            ...state,
            quoteObject: {},
            isFetching: true,
            error:''
          });
        case(FETCH_SUCCESS):
          return({
            ...state,
            quoteObject: action.payload,
            isFetching: false,
            error: ''
          });
        case(FETCH_FAIL):
          return({
            ...state,
            quoteObject: {},
            isFetching: false,
            error: action.payload
          })
        default:
          return state;
      }
}

export default reducer;

