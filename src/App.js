import './style.css';
import { useReducer} from 'react';
import NumButtons from './components/NumButtons';
import OperationButtons from './components/OperationButtons';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          current: payload.digit,
          overwrite: false,
        }
      }
      if(payload.digit === '0' && state.current === '0'){
        return state
      }
      if(payload.digit === '.' && state.current.includes('.')){
        return state
      }
      return {
        ...state,
        current: `${state.current || ''}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.current == null && state.previous == null){
        return state
      }
      if(state.current == null){
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if(state.previous == null){
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        }
      }
      return {
        ...state,
        previous: evaluate(state),
        operation: payload.operation,
        current: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          overwrite: false,
          current: null
        }
      }
      if(state.current == null){
        return state
      }
      if(state.current.length === 1){
        return {
          ...state,
          current: null
        }
      }
      return {
        ...state,
        current: state.current.slice(0, -1)
        // removes last digit
      }
    case ACTIONS.EVALUATE:
      if(
        state.operation == null || 
        state.current == null || 
        state.previous == null
      ){
        return state
      }
      return{
        ...state,
        overwrite: true,
        previous: null,
        operation: null,
        current: evaluate(state)
      }
  }
}

function evaluate({current, previous, operation}){
  const prev = parseFloat(previous)
  const curr = parseFloat(current)
  if(isNaN(prev) || isNaN(curr)){
    return ""
  }
  let computation = ""
  switch(operation){
    case '÷':
      computation = prev / curr
      break
    case '*':
      computation = prev * curr
      break
    case '-':
      computation = prev - curr
      break
    case '+':
      computation = prev + curr
      break
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  // english format
  maximumFractionDigits: 0,
  // prevent formating on anything after the .
})

function formatOperand(operand){
  if(operand == null){
    return
  }
  const [integer, decimal] = operand.split('.')
  if(decimal == null){
    return INTEGER_FORMATTER.format(integer)
  }
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{current, previous, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className = 'calculatorGrid'>
      <div className = 'result'>
        <div className = 'previous'>{formatOperand(previous)} {operation}</div>
        <div className = 'current'>{formatOperand(current)}</div>
      </div>
      <button className = 'spanTwo' onClick ={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick ={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButtons operation = '÷' dispatch={dispatch}/>
      <NumButtons digit='7' dispatch={dispatch}/>
      <NumButtons digit='8' dispatch={dispatch}/>
      <NumButtons digit='9' dispatch={dispatch}/>
      <OperationButtons operation = '*' dispatch={dispatch}/>
      <NumButtons digit='4' dispatch={dispatch}/>
      <NumButtons digit='5' dispatch={dispatch}/>
      <NumButtons digit='6' dispatch={dispatch}/>
      <OperationButtons operation = '-' dispatch={dispatch}/>
      <NumButtons digit='1' dispatch={dispatch}/>
      <NumButtons digit='2' dispatch={dispatch}/>
      <NumButtons digit='3' dispatch={dispatch}/>
      <OperationButtons operation = '+' dispatch={dispatch}/>
      <NumButtons digit='0' dispatch={dispatch}/>
      <NumButtons digit='.' dispatch={dispatch}/>
      <button className = 'spanTwo' onClick ={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
