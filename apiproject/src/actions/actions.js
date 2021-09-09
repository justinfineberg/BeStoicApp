import axios from 'axios'

export const FETCH_START = "FETCH_START"
export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_FAIL = "FETCH_FAIL"
export const BEGIN = "BEGIN"

export const beginAgain = ()=>{
    return ({type: BEGIN})
}

export const fetchStart = ()=> ({type: FETCH_START});

export const fetchSuccess = (quoteObj)=> {
    return({type: FETCH_SUCCESS, payload:quoteObj});
}

export const fetchFail = (quoteObj)=> {
    return({type: FETCH_FAIL, payload:quoteObj});
}

export const getQuote = () => dispatch => {
    dispatch(fetchStart());

    axios.get("https://stoic-quotes.com/api/quote")
        .then(resp=> {
            
            dispatch(fetchSuccess(resp.data));
            // dispatch({type: FETCH_SUCCESS, payload:resp.data.results[0] });
        })
        .catch(err=>{

            dispatch(fetchFail(err));
            // dispatch({type: FETCH_FAIL, payload: err});
        });
}