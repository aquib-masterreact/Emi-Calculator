import "./styles.css";
import { useState } from "react";
import { tenureData } from "./data/tenuredata";
export default function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);
  const updateEmi = (event) => {
    if (!cost) return;
    const dp = Number(event.target.value);
    setDownPayment(dp.toFixed(0));
    const emi = calculateEmi(dp);
    setEmi(emi);
  };
  const updateDownPayment = (event) => {
    if (!cost) return;
    const emi = Number(event.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDownPayment(emi);
    setDownPayment(dp);
  };
  const calculateEmi = (event) => {
    if (!cost) return;
    const loanAmount = cost - downPayment;
    const roi = interest / 100;
    const noy = tenure / 12;

    const EMI = (loanAmount * roi * (1 + roi) ** noy) / ((1 + roi) ** noy - 1);
    return Number(EMI / 12).toFixed(0);
  };
  const calculateDownPayment = (emi) => {
    if (!cost) return;
    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };
  return (
    <div className="App">
      <h1>EMI Calculator</h1>
      <div className="total-asset">
        <label className="label1">Total Cost Of Asset</label>
        <br />
        <input
          type="number"
          min={0}
          max={cost}
          value={cost}
          onChange={(event) => setCost(event.target.value)}
        />
      </div>
      <div className="interest-rate">
        <label className="label1">Interest Rate</label>
        <br />
        <input
          type="number"
          min={0}
          max={interest}
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
        />
      </div>
      <div className="processing-fee">
        <label className="label1">Processing Fee</label>
        <br />
        <input
          type="number"
          onChange={(event) => setFee(event.target.value)}
          value={fee}
        />
      </div>
      <div className="downPaymnet">
        <h2>Down Payment</h2>
        <div className="lable">
          <label>0%</label>
          <label>{downPayment}</label>
          <label>100%</label>
        </div>
        <input
          type="range"
          min={0}
          max={cost}
          value={downPayment}
          onChange={updateEmi}
        />
      </div>
      <div className="downPaymnet">
        <h2>Loan per Month</h2>
        <div className="lable">
          <label>0</label>
          <label>{calculateEmi(downPayment)}</label>
          <label>{calculateEmi(0)}</label>
        </div>
        <input
          type="range"
          min={calculateEmi(cost)}
          max={calculateEmi(0)}
          value={calculateEmi(downPayment)}
          onChange={updateDownPayment}
        />
      </div>
      <h2>Tenure</h2>
      <div className="tenure">
        {tenureData.map((t, index) => {
          return (
            <button
              key={index}
              className={`tenure${t === tenure ? "selected" : ""}`}
              onClick={() => setTenure(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
