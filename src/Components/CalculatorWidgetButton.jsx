import React, { useState } from 'react'
import { MdDarkMode, MdLightMode } from "react-icons/md";

const CalculatorWidgetButton = ({children}) => {

  const [theme, setTheme] = useState('light');

  const inputTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light' );
  };
  
  return (
    <>
      <div className={`calculator-container ${theme}`} >
        <div className="calculator-widget-container">
          <button className="widget-btn" onClick={inputTheme} title="theme" id="theme">{theme === 'light' ? <MdDarkMode /> : <MdLightMode />}</button>
        </div>
        {children}
      </div>
    </>
    
  )
}

export default CalculatorWidgetButton