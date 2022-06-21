
import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { getProducts } from '../api/products';
import { totalPagesContext } from '../contexts/totalPagesContext';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagesCount, setPagesCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const [total] = useTotal();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(activePage, total);
      setProducts(data.products);
      setPagesCount(data.total / total);  
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [total, activePage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onPageNavigation = useCallback((index) => {
    setActivePage(index);
  }, []);

  return {
    products,
    isLoading,
    error,
    pagesCount,
    activePage,
    onPageNavigation
  }
};

export const useTotal = () => {
  const total = useContext(totalPagesContext);
  return total;
};

export const useInterval = (callback, time) => {
  const callbackRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    console.log('start!');
    const clearId = setInterval(() => {
      const cb = callbackRef.current;
      if (cb) {
        cb();
      }
    }, time);
    return () => clearInterval(clearId);
  }, []);
};