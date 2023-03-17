import axios from "axios";
import { useEffect, useReducer } from "react";

interface IinitialState {
  loading: boolean;
  error: boolean;
  advice: {
    slip: {
      id: number;
      advice: string;
    };
  };
}

interface IAction {
  type: string;
  payload?: string;
}

const INITIAL_STATE: IinitialState = {
  loading: false,
  error: false,
  advice: { slip: { id: 0, advice: "" } },
};

function quoteReducer(state: any, action: IAction) {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: false,
        advice: action.payload,
      };
    case "FETCH_ERROR":
      return {
        loading: false,
        error: true,
        advice: {},
      };
    default:
      return state;
  }
}

export const useFetch = (url: string) => {
  const [state, dispatch] = useReducer(quoteReducer, INITIAL_STATE);

  const fetchData = async (url: string) => {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await axios.get(url);
      const data = await res.data;

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR" });
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { ...state, state, fetchData };
};
