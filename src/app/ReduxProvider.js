"use client"; // required in Next.js App Router

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
