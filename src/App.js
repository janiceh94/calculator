import './style.css';
import { useReducer} from 'react';

const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}){

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
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>0</button>
      <button>.</button>
      <button className = 'spanTwo'>=</button>
    </div>
  );
}

export default App;
