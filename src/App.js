import './App.css';
import Location from './components/Location';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Navbar />
          <Location />
      </header>
    </div>
  );
}

export default App;
