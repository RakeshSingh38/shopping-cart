import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Cart from "./context/Cart";
import Productdata from "./context/Productdata";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
 
    <Cart>
      <Productdata>
        <App />
      </Productdata>
    </Cart>
  </React.StrictMode>
);
