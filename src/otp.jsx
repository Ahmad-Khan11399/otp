import { useState } from 'react';

function Otp() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isPinMatched, setIsPinMatched] = useState(false);
  const [randomPin, setRandomPin] = useState(Math.floor(100000 + Math.random() * 900000));
  
  console.log(randomPin);
  
  function handlePinChange(event) {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPin(value);
      setError(false);
    }
  }
  
  function handlePaste(event) {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text/plain').slice(0, 6);
    const otpArray = pasteData.split('').map((digit) => parseInt(digit));
    otpArray.forEach((digit, index) => {
      if (index < 6) {
        const inputRef = refs[index];
        inputRef.current.value = digit;
        setOtpValues((otpValues) => {
          const updatedValues = [...otpValues];
          updatedValues[index] = digit;
          return updatedValues;
        });
        if (index < 5) {
          const nextInputRef = refs[index + 1];
          nextInputRef.current.focus();
        }
      }
    });
  }
  
  function handleSubmit() {
    if (pin.length === 6) {
      if (parseInt(pin) === randomPin) {
        setIsPinMatched(true);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }
  
  function handleReset() {
    setPin('');
    setError(false);
    setIsPinMatched(false);
    setRandomPin(Math.floor(100000 + Math.random() * 900000));
  }

  return (
    <div className="popup">
      {isPinMatched ?
        <div className="success-screen">
          <h2>Success!</h2>
          <p>You have successfully entered the correct PIN.</p>
          <button className='custom-button' id="reset" onClick={handleReset}>Try Again</button>
        </div> :
        <div className="pin-input">
          <h2>Enter Your 6-Digit PIN</h2>
          <p className='msg'>Please enter the 6-digit PIN:</p>
          <div className="pin-input-field">
            <label htmlFor="pin">Enter PIN:</label>
            <input
              type="text"
              id="pin"
              value={pin}
              onChange={handlePinChange}
              maxLength={6}
              onKeyDown={handleKeyPress}
              onPaste={handlePaste}
              pattern="[0-9]*"
            />
          </div>
          {error && <p className="error">Invalid PIN. Please try again.</p>}
          <button className='custom-button' id="submit" onClick={handleSubmit}>Submit</button>
        </div>
      }
    </div>
  );
}

export default Otp;
