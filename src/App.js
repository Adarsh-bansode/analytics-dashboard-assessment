import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [data, setData] = useState([]);

  

  return (
    <div className="App">
     <Dashboard />
    </div>
  );
}

export default App;
