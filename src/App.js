
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { totalPagesContext } from './contexts/totalPagesContext';
import { useMemo, useState } from 'react';
import ProductCatalogNext from './ProductCatalogNext/ProductCatalogNext';

function App() {
  const [total, setTotal] = useState(10);
  const contextValue = useMemo(() => [total, setTotal], [total, setTotal]);
  return (
    <div className="App">
      <totalPagesContext.Provider value={contextValue}>
        <ProductCatalogNext total={10} />
      </totalPagesContext.Provider>
    </div>
  );
}

export default App;
