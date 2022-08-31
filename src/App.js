import './style.css';
import { useReducer} from 'react';
import NumButtons from './components/NumButtons';

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
      return {
        ...state,
        current: `${current || ''}${payload.digit}`
      }
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
      <button className = 'spanTwo'>AC</button>
      <button>DEL</button>
      <button>÷</button>
      <NumButtons digit='7' dispatch={dispatch}/>
      <NumButtons digit='8' dispatch={dispatch}/>
      <NumButtons digit='9' dispatch={dispatch}/>
      <button>*</button>
      <NumButtons digit='4' dispatch={dispatch}/>
      <NumButtons digit='5' dispatch={dispatch}/>
      <NumButtons digit='6' dispatch={dispatch}/>
      <button>-</button>
      <NumButtons digit='1' dispatch={dispatch}/>
      <NumButtons digit='2' dispatch={dispatch}/>
      <NumButtons digit='3' dispatch={dispatch}/>
      <button>+</button>
      <NumButtons digit='0' dispatch={dispatch}/>
      <NumButtons digit='.' dispatch={dispatch}/>
      <button className = 'spanTwo'>=</button>
    </div>
  );
}

export default App;
