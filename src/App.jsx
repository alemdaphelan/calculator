import { useState } from 'react'
import {useCallback} from 'react'
import './App.css'


const numberVal = [
  {
    number:1,
    id:"one"
  },
  {
    number:2,
    id:"two"
  },
  {
    number:3,
    id:"three"
  },
  {
    number:4,
    id:'four'
  },
  {
    number:5,
    id:'five'
  },
  {
    number:6,
    id:'six'
  },
  {
    number:7,
    id:"seven"
  },
  {
    number:8,
    id:"eight"
  },
  {
    number:9,
    id:"nine"
  },
  {
    number:0,
    id:"zero"
  }
]

const operatorData = [
  {
    id:"equals",
    symbol:"="
  },
  {
    id:"add",
    symbol:"+"
  },
  {
    id:"subtract",
    symbol:"-"
  },
  {
    id:"multiply",
    symbol:"*"
  },
  {
    id:"divide",
    symbol:"/"
  },
  {
    id:"decimal",
    symbol:"."
  },
  {
    id:"clear",
    symbol:"AC"
  }
]
function App() {
  const [currentText,setCurrentText] = useState('');
  const [currentFormula, setCurrentFormula] = useState('');
  return (
    <div className="calculator">
      <Display currentText = {currentText} currentFormula = {currentFormula}/>
      <ButtonContainer numberVal = {numberVal} operatorData={operatorData} setCurrentText={setCurrentText} currentText={currentText} currentFormula={currentFormula} setCurrentFormula={setCurrentFormula}/>
    </div>
  )
}

const Display = (props) =>{

  return (
    <div className="display">
      <p className="formula-container">{props.currentFormula}</p>
      <p className="result-container">{props.currentText}</p>
    </div>
  )
}

const ButtonContainer = (props) => {
  const [haveRes, setHaveRes] = useState(false);

  const handleInput = useCallback((e) => {
    const val = e.target.value;
    console.log(`Current Formula before update: ${props.currentFormula}`);

    if (haveRes) {
      props.setCurrentFormula('');
      props.setCurrentText('');
      setHaveRes(false);
    }

    if (val === '=') {
      try {
        console.log(props.currentFormula);
        const result = eval(props.currentFormula);
        props.setCurrentText(parseFloat(result.toFixed(4)).toString());
        props.setCurrentFormula(prevFormula => prevFormula + '=' + parseFloat(result.toFixed(4)));
        setHaveRes(true);
      } catch {
        props.setCurrentText('Error');
        setHaveRes(true);
      }
    } else if (val === 'AC') {
      props.setCurrentText('');
      props.setCurrentFormula('');
    } else {
      props.setCurrentText(prevText => prevText + val);
      props.setCurrentFormula(prevFormula => prevFormula + val);
    }
  }, [haveRes, props]);

  return (
    <div className="button-container">
      {props.numberVal.map(({ number, id }, index) => (
        <button onClick={handleInput} key={index} value={number} id={id}>{number}</button>
      ))}
      {props.operatorData.map(({ id, symbol }, index) => (
        <button onClick={handleInput} key={index} id={id} value={symbol}>{symbol}</button>
      ))}
    </div>
  );
};

export default App
