import "./App.css";
import Web3 from "web3";
import Wrapper from "./Wrapper";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import style from "styled-components";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [account, setAccount] = useState(0);

  async function web3() {
    window.web3 = new Web3(window.ethereum);
    const address = await window.web3.eth.getAccounts();
    setAccount(address[0]);
    if (address == undefined) {
      setAccount(0);
    }
  }

  function LoadingStatus(e) {
    setLoading(e);
  }
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockChainData() {
    const web3 = window.web3;
    const store = await web3.eth.getAccounts();
    setAccount(store[0]);
  }
  function loading() {
    return (
      <Container>
        <Loading></Loading>;
      </Container>
    );
  }

  if (isLoading) {
    return loading(isLoading);
  } else {
    web3();
    return (
      <div className="App">
        <Wrap>
          <Header
            loadWeb3={loadWeb3}
            loadBlockChainData={loadBlockChainData}
            account={account}
            parentCallback={LoadingStatus}
            web3={web3}
          />
          <Home />
        </Wrap>
      </div>
    );
  }
}

export default App;

const Wrap = style.div`
    height:100%;
    width:100%;
    background-size: auto;
    background-position:center;
    background-repeat:no-repeat;
    background-image:url("./images/NightVision.jpg");
    overflow:hidden;
`;

const Container = style.div`
    width: 100%;
    height: 500px;
    justify-content:center;
    align-items:center;
    display:flex;
`;

const Loading = style.div`
    width: 48px;
    height: 48px;
    border: 5px solid #262121;
    border-bottom-color: transparent;
    border-radius: 50%;
    
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    display:flex;
    justify-content:center;
    
@keyframes rotation {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`;
