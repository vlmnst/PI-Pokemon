import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/landing.jsx";
import Home from "./components/home/home.jsx";
import Detail from './components/detail/detail.jsx';
import Form from "./components/Form/Form.jsx";

function App() {
  return (
    <>
      <Route exact path={"/"} component={Landing} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/detail/:id"} component={Detail} />
      <Route exact path={"/createPokemon"} component={Form} />
    </>
  );
}

export default App;
