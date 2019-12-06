import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  let [chain, setChain] = useState([]);
  let [user, setUser] = useState("");
  let [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/chain")
      .then(res => {
        console.log(res.data.chain);
        return setChain(res.data.chain);
      })
      .catch(err => console.log("Oh no, couldn't get the data"));
  }, []);

  const handleInput = e => {
    setUser(e.target.value);
  };
  const findBalance = e => {
    e.preventDefault()
    for(let i=0; i < chain.length; i++){
      console.log(chain[i].index)
      if(chain[i].transactions.length > 0){
        console.log(chain[i].transactions.length)
        chain[i].transactions.map(item =>{
          if(item.sender === user){
            setBalance( balance - item.amount)
          } else if(item.recipient === user){
            setBalance( balance + item.amount)
          }
        }
        )
      }
    }
  };

  return (
    <div className="App">
      <h1>Lambda Coin Wallet</h1>
      <p>Current User:</p>
      <form onSubmit={findBalance}>
        <input value={user} onChange={handleInput} />
      </form>
      <h3>Balance: {balance}</h3>
      {chain.length > 0 ? (
        chain.map(item => {
          return <p>{item.previous_hash}</p>;
        })
      ) : (
        <p>Nothing Here!</p>
      )}
    </div>
  );
}

export default App;
