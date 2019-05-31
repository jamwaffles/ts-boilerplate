import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { createStore } from "./store";

const stateEl: any = document.getElementById("initial_state");

const initialState = stateEl ? JSON.parse(stateEl.dataset.state) : {};

const store = createStore(initialState);

const container = document.getElementById("app");

const basePath = process.env.BASE_PATH || "";

const _render = process.env.NODE_ENV === "production" ? ReactDOM.hydrate : ReactDOM.render;

_render(
  <BrowserRouter basename={basePath}>
    <App store={store} />
  </BrowserRouter>,
  container,
);

import "./styles/style.scss";
