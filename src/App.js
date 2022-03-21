import logo from './logo.svg';
import './App.css';
import Homepage from './Views/Homepage';
import { launched } from './Constants/Config';

function App() {
  return (
    <>
    {launched ? <><Homepage /></> : <></>}
    </>
  );
}

export default App;
