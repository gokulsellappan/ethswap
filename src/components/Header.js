import React, { useEffect, useState } from "react";
import style from "styled-components";
import Identicon from "identicon.js";
import Web3 from "web3";

function Header(props) {
  function loadStatus(status) {
    props.parentCallback(status);
  }

  return (
    <Container>
      <Title>IND Exchange</Title>
      <Swap>
        <SwapButton>Swap</SwapButton>
        <YieldButton>Farm</YieldButton>
      </Swap>

      {props.account !== (undefined && 0) ? (
        <Address>
          {props.account}
          <img width="30" height="30" src="./images/creed.jpg" alt="" />
        </Address>
      ) : (
        <ConnectWallet
          onClick={async () => {
            loadStatus(true);
            await props.loadWeb3();
            await props.loadBlockChainData();
            loadStatus(false);
          }}
        >
          <span>Connect Wallet</span>
        </ConnectWallet>
      )}
    </Container>
  );
}

export default Header;

const Container = style.div`
  width:auto;
  height:72px;
  padding: 16px 16px 16px 16px;
  justify-content:space-between;
  display:flex;
  overflow:hidden;
`;

const Title = style.div`
padding-left:16px;
font-size:16px;
font-weight:600;
align-items:center;
height:40px;
display:flex;
`;

const Address = style.div`
padding-right:16px;
font-size:12px;
font-weight:500;
align-items:center;
height:40px;
display:flex;
img{
  border-radius:50%;
}
`;

const Swap = style.div`
  height:30px;
  width:170px;
  background-color:white;
  display:flex;
  justify-content:space-between;
  padding:5px 5px 5px 5px;
  border-radius:50px;
  opacity:1;
`;

const SwapButton = style.button`
  align-items:center;
  width:80px;
  border-radius:50px;
  font-weight:600;
  font-size:16px;
  border:none;
  cursor:pointer;
  background-color:white;
  &:hover{
    background-color:#e6e8f3;
  }
  `;

const YieldButton = style(SwapButton)``;

const ConnectWallet = style.button`
  align-items:center;
  border-radius:50px;
  font-weight:600;
  font-size:16px;
  border:none;
  cursor:pointer;
  background-color:white;
  height:40px;
  width:170px;
  justify-content:space-between;
  padding:5px 5px 5px 5px;
  margin-right:20px;
  border-radius:50px;
  &:hover{
    background-color:#e6e8f3;
  }
`;
