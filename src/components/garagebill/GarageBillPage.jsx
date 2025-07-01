import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GarageForm from './GarageForm';
import GarageInvoicePreview from './GarageInvoicePreview';
import './PrintStyles.css';

const defaultBill = {
  company: {
    name: '', logo: '', address: '', phone: '', email: '', website: ''
  },
  invoice: {
    number: '', date: new Date().toISOString().slice(0,10), dueDate: '',
  },
  customer: {
    name: '', address: ''
  },
  vehicle: {
    regNo: '', make: '', model: '', mileage: ''
  },
  items: [
    { description: '', quantity: 1, unitPrice: '', tax: '', total: '' }
  ],
  totals: {
    subtotal: 0, tax: 0, discount: 0, total: 0, paid: 0, due: 0
  },
  payment: {
    bank: '', account: '', ifsc: '', upi: '', notes: '', terms: ''
  }
};

export default function GarageBillPage() {
  const [bill, setBill] = useState(defaultBill);

  useEffect(() => {
    if (!bill.invoice.number) {
      const today = new Date();
      const dateStr = today.toISOString().slice(0,10).replace(/-/g, '');
      const rand = Math.floor(1000 + Math.random() * 9000);
      const invoiceNum = `INV${dateStr}${rand}`;
      setBill(prev => ({
        ...prev,
        invoice: { ...prev.invoice, number: invoiceNum }
      }));
    }
  }, [bill.invoice.number]);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-6 px-2 md:px-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 mt-8 md:mt-8 text-blue-900">Garage Bill Generator</h1>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <GarageForm bill={bill} setBill={setBill} />
        </div>
        <div className="w-full md:w-1/2">
          <GarageInvoicePreview bill={bill} />
        </div>
      </div>
    </motion.div>
  );
} 