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
      if(state.current === null && state.previous === null){
        return state
      }
      if(state.previous === null){
        return {
          ...state,
          operation: payload.operation,
          previous: state.current,
          current: null,
        }
      }
    case ACTIONS.CLEAR:
      return {}
  }
}

function App() {
  const [{current, previous, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className = 'calculatorGrid'>
      <div className = 'result'>
        <div className = 'previous'>{previous} {operation}</div>
        <div className = 'current'>{current}</div>
      </div>
      <button className = 'spanTwo' onClick ={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
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
      <button className = 'spanTwo'>=</button>
    </div>
  );
}

export default App;
