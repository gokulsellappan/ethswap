import "./App.css";
import Web3 from "web3";
import Wrapper from "./Wrapper";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import style from "styled-components";
import Token from "../abis/Token.json";
import EthSwap from "../abis/EthSwap.json";


function App() {
  const [isLoading, setLoading] = useState(false);
  const [account, setAccount] = useState(0);
  let tokenData;
  let ethSwapData;
  let token;
  let ethSwap;
  let networkId;
 

  async function web3() {
    window.web3 = new Web3(window.ethereum);
    const web3 = window.web3;
    const address = await window.web3.eth.getAccounts();
    setAccount(address[0]);
    console.log(account);
    if (address == undefined) {
      setAccount(0);
    }
    networkId =  await web3.eth.net.getId()
    
    tokenData = Token.networks[networkId]
    if(tokenData) {
      token = new web3.eth.Contract(Token.abi, tokenData.address)
    } else {
      window.alert('Token contract not deployed to detected network.')
    }

    // Load EthSwap
    ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {
      ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }

    // if (account > 0) {
    //   const balance = await web3.eth.getBalance(account);
    //   console.log(web3.utils.fromWei(balance.toString(), "ether"));
    //   web3.eth.getTransactionCount(account).then(console.log);
    //   let block = await web3.eth.getBlock("latest");
    //   console.log(block);
    //   let number = block.number;
    //   console.log(number);
    //   let transactions = block.transactions;
    //   console.log(transactions);
    // }
  }
      async function buyToken(etherAmount,secondoutput){
        if (account > 0 && etherAmount>0 && secondoutput>0) {
          window.web3 = new Web3(window.ethereum);
          const web3 = window.web3;
          let tokenBalance = await token.methods.balanceOf(ethSwapData.address).call();
          console.log("Balance"+tokenBalance);
          const ethAmount=web3.utils.toWei(etherAmount, 'Ether')
          ethSwap.methods.buyTokens().send({ value: ethAmount, from: account }).on('transactionHash', (hash) => {
            alert("Transaction completed Successfully");
          })
        }else{
          alert("Token value should more than 0 !!!")
        }
      }
  function LoadingStatus(e) {
    setLoading(e);
  }
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log("web3first");
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("web3");
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
          <Home
          buyToken={buyToken}
           />
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
