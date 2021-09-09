import {FETCH_FAIL, FETCH_START, FETCH_SUCCESS, BEGIN } from './../actions/actions'

const initalState = {
    quoteObject: null,
    isFetching: false,
    err: '',
}

const reducer = (state=initalState, action) =>{
    switch (action.type) {
        case(FETCH_START):
          return({
            ...state,
            quoteObject: null,
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
          case(BEGIN):
          return({
              ...state,
              quoteObject: null,
              isFetching: false,
              err:''
          })
        default:
          return state;
      }
}

export default reducer;

