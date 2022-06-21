
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { totalPagesContext } from './contexts/totalPagesContext';
import { useMemo, useState } from 'react';
import ProductCatalog from './ProductCatalog/ProductCatalog';

function App() {
  const [total, setTotal] = useState(10);
  const contextValue = useMemo(() => [total, setTotal], [total, setTotal]);
  return (
    <div className="App">
      <totalPagesContext.Provider value={contextValue}>
        <ProductCatalog total={10} />
      </totalPagesContext.Provider>
    </div>
  );
}

export default App;
