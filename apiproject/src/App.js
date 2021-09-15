import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import React, { useState } from "react";
import { getQuote, beginAgain } from "./actions/actions";
import {
  ShareButtons,
  ShareCount,
  generateShareIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

const initialForm = {
  rephrase: "",
  name: "",
};

function App(props) {
  const [form, setForm] = useState(initialForm);
  const [submit, setSubmit] = useState(false);

  const handleClick = () => {
    props.dispatch(getQuote());
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(!submit);
    props.dispatch(beginAgain());
  };


  return (
    <div>
      {submit && (
        <div className="flex flex-col gap-6">
          <div className="lg:w-3/6 w-11/12 rounded-lg shadow-xl mt-20 border bg-gray-100 flex flex-col p-10 hover:bg-gray-200 m-auto mt-20">
            <h3 className="text-3xl font-bold text-center">
              "{form.rephrase}"
            </h3>

            <h6 className=" text-xl text-center md:text-right md:w-2/3 w-full mt-10 m-auto ">
              -{form.name}
            </h6>
            <h6 className=" text-md text-right md:w-2/3 m-auto italic ">
              A Stoic Philosopher
            </h6>
          </div>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-auto"
            onClick={onSubmit}
          >
            Go Again?
          </button>
          <div className="text-center">
            <TwitterShareButton
              url="
        www.BeStoic.xyz"
              title={`${form.rephrase}
        -${form.name} (A Stoic Philosopher)`}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div className="absolute inset-x-0 bottom-3 text-xs text-center"> <a href="https://twitter.com/JustinFineberg">@JustinFineberg</a> </div>
        </div>
      )}
      {!submit && (
        <div className="flex flex-col justify-center gap-2 md:gap-4 lg:w-3/6 mb-10 m-auto w-10/12">
          <h1 className="font-bold text-4xl mb-2 mt-6 md:mt-14">A Stoic Reflection</h1>

          <h3 className="text-lg ">
            Take a Stoic Quote and turn it into your own words.
          </h3>
          <div className="border border-black"></div>
          <h2 className="text-xl text-center text-gray-500 md:mt-7 italic">
            Real Impact begins when you make it personal.
          </h2>
          <h2 className="animate-bounce text-center">↓</h2>
          <button
            onClick={handleClick}
            className="bg-white m-auto hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 mb-1 border border-gray-400 rounded shadow"
          >
            Get Quote
          </button>
          {props.quoteObj && (
            <div>
              <div className=" border bg-gray-100 shadow-lg hover:bg-gray-200 flex flex-col p-4 md:p-6 md:m-5 mb1 text-center gap-5 rounded-lg ">
                <h3 className="md:text-2xl text-xl">"{props.quoteObj.text}"</h3>
                <h5 className="text-right md:text-lg text-md w-2/3">
                  -{props.quoteObj.author}
                </h5>
              </div>
              <div className="flex flex-col items-center gap-3">
                <h3 className="mt-3 text-sm md:text-base ">
                  Now, rephrase this quote and put it into your own words.
                </h3>
                <h5 className="md:text-base text-sm">(It's much easier to take your own advice.)</h5>
                <h2 className="animate-bounce text-center">↓</h2>
              </div>
              <form className="flex flex-col items-center border-box rounded-lg p-1 md:p-5">
                <textarea
                  onChange={onChange}
                  name="rephrase"
                  placeholder="Enter Your Words"
                  className="md:w-2/3 w-full mb-5 h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                ></textarea>
                <div className="relative md:w-3/6 w-full text-gray-700">
                  <input
                    onChange={onChange}
                    name="name"
                    className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text"
                    placeholder="Enter Name"
                  />
                  <button
                    onClick={onSubmit}
                    className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-500 focus:bg-indigo-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
          {props.isFetching && (
            <svg className="spinner" viewBox="0 0 50 50">
              <circle
                className="path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="5"
              ></circle>
            </svg>
          )}
          {props.err && <h2>There is an error!</h2>}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quoteObj: state.quoteObject,
    isFetching: state.isFetching,
    err: state.err,
  };
};

export default connect(mapStateToProps)(App);
