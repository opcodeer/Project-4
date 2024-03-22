import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from './reducers/index';

// Uncomment and configure middleware if needed
// import { applyMiddleware } from 'redux';
// import thunk from "redux-thunk";

const store = configureStore({
    reducer: reducers,
    // Add middleware here if needed
    // middleware: [thunk]
});

const root = createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
