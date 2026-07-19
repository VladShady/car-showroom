import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Car Showroom</h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<div>Main page</div>} />
          <Route path="/vehicles/:id" element={<div>Car page</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;