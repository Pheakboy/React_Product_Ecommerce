import { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const PortfolioContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data from Firestore
  const fetchPortfolioItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const collectionRef = collection(db, "portfolio");
      const querySnapshot = await getDocs(collectionRef);

      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        key: doc.id,
        ...doc.data(),
      }));

      setPortfolioItems(items);
      console.log("✅ Portfolio data from Firestore:", items);
    } catch (err) {
      setError(`Error fetching portfolio: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new portfolio item
  const addPortfolioItem = async (itemData) => {
    try {
      const collectionRef = collection(db, "portfolio");
      const docRef = await addDoc(collectionRef, itemData);

      const newItem = {
        id: docRef.id,
        key: docRef.id,
        ...itemData,
      };

      setPortfolioItems([...portfolioItems, newItem]);
      console.log("✅ Portfolio item added:", newItem);
      return docRef.id;
    } catch (err) {
      setError(`Error adding portfolio item: ${err.message}`);
      console.error(err);
      throw err;
    }
  };

  // Update portfolio item
  const updatePortfolioItem = async (itemId, itemData) => {
    try {
      const docRef = doc(db, "portfolio", itemId);
      await updateDoc(docRef, itemData);

      setPortfolioItems(
        portfolioItems.map((item) =>
          item.id === itemId ? { ...item, ...itemData } : item
        )
      );
      console.log("✅ Portfolio item updated:", itemId);
    } catch (err) {
      setError(`Error updating portfolio item: ${err.message}`);
      console.error(err);
      throw err;
    }
  };

  // Delete portfolio item
  const deletePortfolioItem = async (itemId) => {
    try {
      const docRef = doc(db, "portfolio", itemId);
      await deleteDoc(docRef);

      setPortfolioItems(portfolioItems.filter((item) => item.id !== itemId));
      console.log("✅ Portfolio item deleted:", itemId);
    } catch (err) {
      setError(`Error deleting portfolio item: ${err.message}`);
      console.error(err);
      throw err;
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const value = {
    portfolioItems,
    loading,
    error,
    fetchPortfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
