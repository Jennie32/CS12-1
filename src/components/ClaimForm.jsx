import React from 'react';
import axios from 'axios';

export default function LoginForm() {
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState("");
  
    const handleSubmit = event => {
      event.preventDefault();
      const data = {
        "id": "573cf6e7-8caf-46f2-9805-bab6771066f2",
        "claim_title": "claim title test",
        "submitted_by": name,
        "amount": amount,
        "contract_id": "f8511f21-9d77-45c9-b0c3-fd0b2697c747",
        "principal_id": "3d48d94c-9b1f-451a-b6cb-690f87789c60",
        "superintendent_id": "9e8c8da9-4e47-4f7f-b32e-1628eddc5b8c"
      };
      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
      axios.post('https://b8l77g698i.execute-api.eu-central-1.amazonaws.com/Stage/execution', { data }, headers)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="text">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="amount">Amount: </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }

