import React from "react";
import Header from "./Header.js";
import style from "styled-components";
import Home from "./Home.js";

function Wrapper() {
  return (
    <Wrap src="./images/Farm.gif">
      <Header />
      <Home />
    </Wrap>
  );
}

export default Wrapper;

const Wrap = style.div`
    height: 100%;
    width:100vw;
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
    background-image:url("./images/NightVision.jpg");
    overflow-x:hidden;
`;
