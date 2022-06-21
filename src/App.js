
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { totalPagesContext } from './contexts/totalPagesContext';
import { useMemo, useState } from 'react';
import ProductCatalogUseReducer from './ProductCatalogUseReducer/ProductCatalogUseReducer';

function App() {
  const [total, setTotal] = useState(10);
  const contextValue = useMemo(() => [total, setTotal], [total, setTotal]);
  return (
    <div className="App">
      <totalPagesContext.Provider value={contextValue}>
        <ProductCatalogUseReducer total={10} />
      </totalPagesContext.Provider>
    </div>
  );
}

export default App;
