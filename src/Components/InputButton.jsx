export const InputButton = ({classNameButton, functionName, buttonTextDisplay, buttonValue, buttonID}) => {
  return (
    <button className={classNameButton} onClick={() => functionName()} value={buttonValue} id={buttonID}>{buttonTextDisplay}</button>
  )
};
