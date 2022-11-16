import React from 'react';
import Button from './Button';

const Keypad = (props) => {
  const { handleActionToPerform, allClear } = props;

  const numKeys = [7, 8, 9, 4, 5, 6, 1, 2, 3];

  const operatorKeys = [
    { label: '÷', value: '/' },
    { label: '*', value: '*' },
    { label: '-', value: '-' },
    { label: '+', value: '+' },
    { label: '=', value: '=' },
  ];

  const functionKeys = [
    { label: allClear ? 'AC' : 'CE', value: allClear ? 'AC' : 'CE' },
    { label: '±', value: '+/-' },
    { label: '%', value: '%' },
  ];

  const lastRowKeys = [
    {
      label: '0',
      value: '0',
      type: 'numeric',
      buttonStyle: 'numeric-key special',
    },
    { label: '.', value: '.', type: 'fx', buttonStyle: 'numeric-key' },
  ];

  const specialKeys = [
    { label: 'x^y', value: 'pow' },
    { label: 'SIN', value: 'sin' },
    { label: 'COS', value: 'COS' },
    { label: 'TAN', value: 'TAN' },
    { label: '√', value: 'squrt' },
  ];

  const handleClickButton = (value, keyType) => {
    handleActionToPerform(value, keyType);
  };

  return (
    <div id="keypad" className="flex row jc-sp-around">
      <div className="flex column jc-sp-btw">
        {specialKeys.map((specialKey) => {
          return (
            <Button
              key={specialKey.label}
              label={specialKey.label}
              value={specialKey.label}
              buttonStyle="numeric-key"
              onClick={handleClickButton}
              type="operator"
            />
          );
        })}
      </div>
      <div className="grid">
        {functionKeys.map((functionKey) => {
          return (
            <Button
              key={functionKey.label}
              label={functionKey.label}
              value={functionKey.value}
              buttonStyle="fx-key"
              onClick={handleClickButton}
              type="fx"
            />
          );
        })}

        {numKeys.map((numKey) => {
          return (
            <Button
              key={numKey}
              label={numKey}
              value={numKey}
              buttonStyle="numeric-key"
              onClick={handleClickButton}
              type="numeric"
            />
          );
        })}
        {lastRowKeys.map((lastRowKey) => {
          return (
            <Button
              key={lastRowKey.label}
              label={lastRowKey.label}
              value={lastRowKey.label}
              buttonStyle={lastRowKey.buttonStyle}
              onClick={handleClickButton}
              type={lastRowKey.type}
            />
          );
        })}
      </div>
      <div className="flex column jc-sp-btw">
        {operatorKeys.map((operatorKey) => {
          return (
            <Button
              key={operatorKey.label}
              label={operatorKey.label}
              value={operatorKey.label}
              buttonStyle="op-key"
              onClick={handleClickButton}
              type="operator"
            />
          );
        })}
      </div>
      {/* <div>
        {specialKeys.map((specialKey) => {
          return (
            <Button
              key={specialKey.label}
              label={specialKey.label}
              value={specialKey.label}
              buttonStyle="op-key"
              onClick={handleClickButton}
              type="operator"
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default Keypad;
