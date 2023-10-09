import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.min.js"
import reportWebVitals from "./reportWebVitals"
import store from "./store"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {console.table(store)}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
