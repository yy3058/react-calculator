import React, { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import '../styles.scss';

const Calculator = () => {
  const [accValue, setAccValue] = useState(null);
  const [screenValue, setScreenValue] = useState('0');
  const [operand, setOperand] = useState(false);
  const [currentOperator, setCurrentOperator] = useState(null);

  const handleActionToPerform = (value, keyType) => {
    switch (keyType) {
      case 'fx':
        handleFunctionKey(value);
        break;
      case 'numeric':
        handleNumericKey(value);
        break;
      case 'operator':
        handleOperatorKey(value);
        break;
      default:
    }
  };

  const handleFunctionKey = (value) => {
    switch (value) {
      case 'AC':
        allClear();
        break;
      case 'CE':
        clearScreen();
        break;
      case '+/-':
        reverseSign();
        break;
      case '%':
        percentage();
        break;
      case '.':
        addDecimalPoint();
        break;
      default:
    }
  };

  const allClear = () => {
    setAccValue(null);
    setScreenValue('0');
    setCurrentOperator(null);
    setOperand(false);
  };

  const clearScreen = () => {
    setScreenValue('0');
  };

  const isScreenClear = screenValue === '0';

  const reverseSign = () => {
    setScreenValue(String(-parseFloat(screenValue)));
  };

  const percentage = () => {
    setScreenValue(String(parseFloat(screenValue) / 100));
  };

  const addDecimalPoint = () => {
    if (operand) {
      setScreenValue('0.');
    } else {
      if (!screenValue.includes('.')) setScreenValue(screenValue + '.');
    }
    setOperand(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [screenValue]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      clearLastDigit();
    }
  };

  const clearLastDigit = () => {
    if (screenValue !== '0') {
      if (screenValue.length > 1) setScreenValue('0');
      else {
        setScreenValue(screenValue.substring(0, screenValue.length - 1));
      }
    }
  };

  const handleNumericKey = (value) => {
    if (operand) {
      setScreenValue(String(value));
      setOperand(false);
    } else {
      setScreenValue(screenValue === '0' ? String(value) : screenValue + value);
    }
  };

  const handleOperatorKey = (operator) => {
    const inputValue = parseFloat(screenValue);
    if (accValue === null) {
      setAccValue(inputValue);
    } else if (currentOperator) {
      const resultValue = operate(currentOperator, accValue, inputValue);
      setAccValue(resultValue);
      setScreenValue(resultValue);
    }
    setOperand(true);
    setCurrentOperator(operator);
  };

  const operate = (operator, accValue, inputValue) => {
    switch (operator) {
      case '+':
        return Math.round((accValue + inputValue) * 1e12) / 1e12;
      case '-':
        return accValue - inputValue;
      case '*':
        return accValue * inputValue;
      case '÷':
        return accValue / inputValue;
      case 'x^y':
        return Math.pow(accValue, inputValue);
      case 'SIN':
        return Math.sin(inputValue);
      case 'COS':
        return Math.cos(inputValue);
      case 'TAN':
        return Math.tan(inputValue);
      case '√':
        return Math.sqrt(inputValue);
      case '=':
        return inputValue;
      default:
        return 'Err';
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div id="calculator-view" className={'flex column jc-center ai-center'}>
        <div id="viewport" className={'flex column jc-sp-between ai-center'}>
          <Display
            value={screenValue}
            className={'flex column jc-center ai-center'}
          />
          <Keypad
            handleActionToPerform={handleActionToPerform}
            allClear={isScreenClear}
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
