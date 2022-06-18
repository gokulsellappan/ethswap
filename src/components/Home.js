import React, { useState } from "react";
import style from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";

function Home() {
  const [Value, setValue] = useState("0"); //    "1" is the default value in this scenario. Replace it with the default value that suits your needs.
  const [firstoutput, setFirstOutput] = useState("");
  const [secondoutput, setSecondOutput] = useState("");
  const [ethAAmount, setEthAmount] = useState("");
  console.log(ethAAmount);

  function handleValueChange(event) {
    setValue(event.target.value);
    console.log(Value);
  }

  function outPutFirstSet(ethAmount) {
    console.log(Value);
    if (Value == 1) {
      setSecondOutput(ethAmount * 100);
    } else if (Value == 2) {
      setSecondOutput(ethAmount * 10);
    } else if (Value == 3) {
      setSecondOutput(ethAmount * 50);
    } else if (Value == 0) {
      setSecondOutput(ethAmount * 0);
    }
  }

  function outPutSecondSet(ethAmount) {
    if (Value == 1) {
      setFirstOutput(ethAmount / 100);
    } else if (Value == 2) {
      setFirstOutput(ethAmount / 10);
    } else if (Value == 3) {
      setFirstOutput(ethAmount / 50);
    } else if (Value == 0) {
      setFirstOutput(ethAmount);
    }
  }

  return (
    <Container>
      <Swap>
        <SwapBox>
          <SwapTitle>Swap</SwapTitle>
          <InputOne
            type="number"
            placeholder="0.0"
            value={secondoutput >= 0 ? firstoutput : ""}
            onChange={(event) => {
              const ethAmount = event.target.value;
              setEthAmount(ethAmount);
              setFirstOutput(ethAmount);
              outPutFirstSet(ethAmount);
            }}
          ></InputOne>
          <Select
            sx={{
              "&:hover": {
                backgroundColor: "#eaebf3",
                fontWeight: 600,
              },
              ":focus-within": {
                fontWeight: 600,
              },
              width: "130px",
              position: "absolute",
              marginLeft: "-150px",
              marginTop: "20px",
              borderRadius: "30px",
              fontWeight: 600,
              backgroundColor: "#eaebf3",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #484850",
              },
            }}
            defaultValue={Value}
            onChange={(event) => {
              handleValueChange(event);
              outPutFirstSet(ethAAmount);
            }}
            backgroundColor="#e9dbdb"
          >
            <MenuItem value={0}>Select a token</MenuItem>
            <MenuItem value={1}>ETH</MenuItem>
            <MenuItem value={2}>BNB</MenuItem>
            <MenuItem value={3}>MATIC</MenuItem>
          </Select>
          <InputTwo
            placeholder="0.0"
            value={firstoutput >= 0 ? secondoutput : ""}
            onChange={(event) => {
              const ethAmount = event.target.value;
              setSecondOutput(ethAmount);
              outPutSecondSet(ethAmount);

              //setFirstOutput(ethAmount / 100);
            }}
          />
          <Select
            sx={{
              "&:hover": {
                backgroundColor: "#eaebf3",
                opacity: 0.9,
                fontWeight: 600,
              },
              ":focus-within": {
                fontWeight: 600,
              },
              width: "130px",
              position: "absolute",
              marginLeft: "-150px",
              marginTop: "20px",
              borderRadius: "30px",
              fontWeight: 600,
              backgroundColor: "#eaebf3",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #484850",
              },
            }}
            defaultValue={Value}
            onChange={handleValueChange}
            backgroundColor="#e9dbdb"
          >
            <MenuItem value={0}>IND</MenuItem>
          </Select>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "white",
                fontWeight: 600,
              },
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "center",
              display: "flex",
              marginLeft: "200px",
              borderRadius: "20px",
            }}
            variant="contained"
          >
            SWAP
          </Button>
        </SwapBox>
      </Swap>
    </Container>
  );
}

export default Home;

const Container = style.div`
    height:100vh;
    width:100vw;
    padding:30px 100px 0px 100px;
    overflow:hidden;
`;

const Swap = style.div`
    justify-content:center;
    display:flex;
    margin:20px 150px 20px 0;   
`;

const SwapBox = style.div`
    flex-direction:column;
    background-color:#eaebf3;
    border-radius:30px;
    padding:16px 20px 8px 20px;
    width:480px;
    height:250px;
    color:black;
`;

const SwapTitle = style.div`
    font-Weight:600;
    font-size:16px

`;

const InputOne = style.input`
    font-size: 2em;
  border-radius: 20px;
  background-color:#d7d9eb;
  width:462px;
  height:70px;
  border: none;
  margin:8px 0 8px 0;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
}
::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
}    
  `;

const InputTwo = style(InputOne)``;
