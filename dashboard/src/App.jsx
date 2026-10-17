import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";

import Dashboard from "./Components/Dashboard";
import Orders from "./Components/Orders";
import Holdings from "./Components/Holdings";
import Positions from "./Components/Positions";
import Funds from "./Components/Funds";


function App() {

  return (

    <Routes>

      <Route element={<Layout />}>

        <Route 
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/holdings"
          element={<Holdings />}
        />

        <Route
          path="/positions"
          element={<Positions />}
        />

        <Route
          path="/funds"
          element={<Funds />}
        />

      </Route>


    </Routes>

  );

}


export default App;