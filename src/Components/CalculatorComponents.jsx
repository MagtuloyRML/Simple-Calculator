import { useEffect, useState } from "react";
import { InputButton } from "./InputButton.jsx";
import { FaDivide, FaPlus, FaMinus, FaX, FaEquals } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { LuPercent } from "react-icons/lu";
import { evaluate } from "mathjs";
import CalculatorHistory from "./CalculatorHistory.jsx";

const CalculatorComponents = () => {
    const [input, setInput] = useState(0);
    const [display, setDisplay] = useState('');
    const [history, setHistory] = useState([]);
    const [errors, setErrors] = useState('');

    const inputAC = () => {
      setInput(0);
      setDisplay("");
      setErrors('');
    };
    
    const inputClear = () => {
      const lastValue = display.substr(display.length - 1);
      if (lastValue === " "){
        setDisplay((prevState) => prevState.substring(0, prevState.length - 2));
      }else{
        setDisplay((prevState) => prevState.substring(0, prevState.length - 1));
      }
      setErrors('');
    };
    const inputPercent = () => {
      if (display !== '' ){
        setDisplay(`(${display} / 100)`);
      }
    };
  
    const inputEqual = () => {
      try{
        setInput(evaluate(display));
        setErrors('');
      }
      catch{
        setErrors('Cannot be Compute! Please Try again');
      }
      
    };
  
    const inputOperation = (inputOperation) => {
      const lastValue = display.substr(display.length - 1);
      const operationType = "+-/*"
      
      if (lastValue !== inputOperation && (lastValue !== null && lastValue !== "")){
        if (operationType.includes(lastValue)){
          if (lastValue !== " "){
            setDisplay((prevState) => prevState.substring(0, prevState.length - 2));
          }else{
            setDisplay((prevState) => prevState.substring(0, prevState.length - 1));
          }
          setDisplay((prevState) => `${prevState} ${inputOperation}`);
        }
        else if (lastValue !== " "){
          setDisplay((prevState) => `${prevState} ${inputOperation}`);
        }
      }
      setErrors('');
    };
    
    const inputNumber = (numberInput) => {
      const lastValue = display.substr(display.length - 1);
      const operationType = "+-/*"
      if (operationType.includes(lastValue)){
        setDisplay((prevState) => `${prevState} ${numberInput}`);
      }
      else{
        setDisplay((prevState) => prevState+numberInput);
      }
      setErrors('');
    };

    const inputHistory = () => {
        if (input !== 0 && (display !== "" ||  display !== '')) {
          setHistory([...history, { id : history.length, computation : display, answer: input}]);
        }
    };

    const removeComputationHistory = (removeId) => {
      const filterHistory = history.filter((computation) => computation.id !== removeId);
      setHistory(filterHistory);
    }

    const useHistory = (useId) => {
      setInput(history[useId].answer);
      setDisplay(history[useId].computation);
    }

    const clearHistory = () => {
      setHistory([]);
    }

    useEffect(() => {
        inputHistory();
    }, [input]);
  
    return (
      <>
        <h1 className="title">Simple Calculator</h1>
        <div className="calculator">
          <div className="calculator-main-container">
            <p name="computation-input" className="computation input" type="text" id="computation-input" > {input} </p>
            <p name="computation-display" className="computation display" type="text" id="computation-display" > {display} </p>
            <div className="computation-btn-group">
              <InputButton classNameButton="computation-btn operation" 
                functionName={inputAC} buttonValue="AC" buttonID="AC" buttonTextDisplay="AC" />
              <InputButton classNameButton="computation-btn operation big" 
                functionName={inputClear} buttonValue="clear" buttonID="clear" buttonTextDisplay={<FiDelete />} />
              <InputButton classNameButton="computation-btn operation" 
                functionName={inputPercent} buttonValue="percent" buttonID="percent" buttonTextDisplay={<LuPercent />} />
              <InputButton classNameButton="computation-btn operation" 
                functionName={() => inputOperation("/")} buttonValue="div" buttonID="div" buttonTextDisplay={<FaDivide />}  />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("7")} buttonValue="7" buttonID="7" buttonTextDisplay="7" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("8")} buttonValue="8" buttonID="8" buttonTextDisplay="8" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("9")} buttonValue="9" buttonID="9" buttonTextDisplay="9" />
              <InputButton classNameButton="computation-btn operation small" 
                functionName={() => inputOperation("*")} buttonValue="times" buttonID="times" buttonTextDisplay={<FaX />} />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("4")} buttonValue="4" buttonID="4" buttonTextDisplay="4" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("5")} buttonValue="5" buttonID="5" buttonTextDisplay="5" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("6")} buttonValue="6" buttonID="6" buttonTextDisplay="6" />
              <InputButton classNameButton="computation-btn operation" 
                functionName={() => inputOperation("-")} buttonValue="minus" buttonID="minus" buttonTextDisplay={<FaMinus />} />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("1")} buttonValue="1" buttonID="1" buttonTextDisplay="1" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("2")} buttonValue="2" buttonID="2" buttonTextDisplay="2" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("3")} buttonValue="3" buttonID="3" buttonTextDisplay="3" />
              <InputButton classNameButton="computation-btn operation" 
                functionName={() => inputOperation("+")} buttonValue="plus" buttonID="plus" buttonTextDisplay={<FaPlus />} />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber("0")} buttonValue="0" buttonID="0" buttonTextDisplay="0" />
              <InputButton classNameButton="computation-btn" 
                functionName={() => inputNumber(".")} buttonValue="dot" buttonID="dot" buttonTextDisplay="." />
              <InputButton classNameButton="computation-btn large" 
                functionName={() => inputEqual()} buttonValue="equal" buttonID="equal" buttonTextDisplay={<FaEquals />} />
            </div>
          </div>
        </div>
        {
          errors !== '' ? (<p className="error">{errors}</p>) : null
        }
        
        <div className="calculator-history">
          <div className="container-history">
            <h3 className="content-title">History</h3>
            <ul className="content-history">
              {history.map((item, index) => (
                <CalculatorHistory key={index} item={item} removeComputationHistory={() => removeComputationHistory(item.id)}
                useHistory={() => useHistory(item.id)} />
              ))}
            </ul>
            {history.length > 0 ? (
                <button className='btn-clear' onClick={clearHistory}><FaTrashAlt /> Clear History</button>
            ) : null}
          </div>
        </div>
      </>
    );
}

export default CalculatorComponents