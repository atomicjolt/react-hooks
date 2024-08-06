import * as React from "react";

export type InitialState<S> = S | (() => S);
export type UpdateStateAction<S> = React.SetStateAction<S>;
export type StateDispatch<S> = React.Dispatch<UpdateStateAction<S>>;
