import React, { useState, useEffect } from "react";
import "./index.css";
import PDFGenerator from './Pdf';

function App() {
  const [cheques, setCheques] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validating, setValidating] = useState(false); // State for tracking validity check

  useEffect(() => {
    const fetchCheques = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/');
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setCheques(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCheques();
  }, []);

  const checkValidity = () => {
    console.log("Checking cheque validity...");
    setValidating(true); // Set state to indicate validity check is in progress
    // Perform validity check here (dummy example)
    setTimeout(() => {
      setValidating(false); // Reset state after check is complete (dummy example)
    }, 2000);
  };

  const jsonData = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
    // Add more properties as needed
  };

  return (
    <>
      {cheques.map((cheque, index) => (
        
        <Details
          key={index}
          index = {index}
          Acc={cheque.Acc_No}
          Amnt={cheque.Amnt}
          url1={cheque.Sign}
          To={cheque.To}
          url2={cheque?.cheque_Img}
          Reason={cheque.reason}
          Status={cheque.status}
          validating={validating} // Pass validating state to Details component
          checkValidity={checkValidity} // Pass checkValidity function to Details component
        />
      )
      
      )}
      
    </>
  );

  function Details({ Acc, Amnt, url1, url2, To, Reason, Status, validating, checkValidity , index}) {

    console.log("this is the key" + index)
    return (
      <>
        <div className="container">
          <h1>Cheque Details</h1>
          <>
          <div>
              {validating && <div className="loader"></div>} {/* Show loader if validating */}
            </div>
            <img src={url1} alt="Cheque" className="image" />
            <p className="info">Account No: {Acc}</p>
            <p className="info">Amount: ${Amnt}</p>
            <p className="info">Sign: {url1}</p>
            <p className="info">To: {To}</p>
            <img src={url2} alt="Cheque" className="image" />
            <p className="info">Reason: {Reason}</p>
            <p className="info">Status: {Status ? "true" : "false"}</p>
            {
              Status && 
              (
                <PDFGenerator jsonData={cheques[index]} />
              )
            }
          
            <div className="flex flex-row">
              <button onClick={checkValidity} className="button" disabled={validating}>
             
                {validating ? (
                  <div className="loader"></div> 
                ) : (
                  'Check Validity'
                )}
              </button>
            </div>
          </>
        </div>
      </>
    );
  }
}

export default App;