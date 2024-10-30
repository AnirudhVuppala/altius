// src/context/InvoiceContext.js
import React, { createContext, useState, useContext } from 'react';

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([
   
  ]);

  const addInvoice = (invoice) => {
    // Generate new ID and invoice number
    const newId = (Math.max(...invoices.map(inv => parseInt(inv.id)), 0) + 1).toString();
    const changedInvoiceNumber = Math.max(...invoices.map(inv => inv.invoiceNumber), 1000) + 1;
    
    const changedInvoice = {
      ...invoice,
      id: newId,
      invoiceNumber: changedInvoiceNumber
    };
    
    setInvoices([...invoices, changedInvoice]);
    return changedInvoice;
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    ));
  };

  const deleteInvoice = (id) => {
    setInvoices(invoices.filter(invoice => invoice.id !== id));
  };

  const getInvoice = (id) => {
    return invoices.find(invoice => invoice.id === id) || null;
  };

  return (
    <InvoiceContext.Provider value={{
      invoices,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      getInvoice
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => useContext(InvoiceContext);