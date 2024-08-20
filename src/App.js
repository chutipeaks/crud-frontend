
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {

  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
       <h1>Welcome To My React App</h1>
       <button className='user-button' onClick={() => navigate('/users')} >Get User</button>
      </header>
    </div>
  );
}

export default App;
