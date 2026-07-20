import {Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home/Home';
import {VehicleDetails} from './pages/VehicleDetails/VehicleDetails';

function App() {
  return (
    <div style= {{fontFamily: 'sans-serif'}}>
      <header style={{padding: '20px', backgroundColor: '#222', color: 'white'}}>
        <h1 style={{margin: 0, textAlign: 'center'}}>Car Showroom</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;