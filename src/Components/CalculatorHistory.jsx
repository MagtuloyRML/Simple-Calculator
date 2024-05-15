import { FaTrashAlt } from "react-icons/fa";

const CalculatorHistory = ({item, removeComputationHistory, useHistory}) => {
  return (
    <li className="content-value" onClick={useHistory} id={item.id}>
        <p className="history-computation">
          Computation: {item.computation}
        </p>
        <h4 className="history-answer">
          Answer: {item.answer}
        </h4>
        <button className="history-clear" onClick={removeComputationHistory}>
          <FaTrashAlt /> 
        </button>
    </li>
  )
};

export default CalculatorHistory;