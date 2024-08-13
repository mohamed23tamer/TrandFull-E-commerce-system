import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
  toReg: false,
  PopInfo: false,
  Check: false,
  shipping: 0,
  credit: "hidden",
  discount: 0,
});

export { setGlobalState, useGlobalState };
