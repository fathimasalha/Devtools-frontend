import React, { useRef } from 'react';
import { X } from 'lucide-react';

export default function GarageForm({ bill, setBill }) {
  const fileInputRef = useRef();
  const handleChange = (section, field, value) => {
    setBill(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };
  const handleVehicleChange = (field, value) => handleChange('vehicle', field, value);
  const handleCompanyChange = (field, value) => handleChange('company', field, value);
  const handleCustomerChange = (field, value) => handleChange('customer', field, value);
  const handleInvoiceChange = (field, value) => handleChange('invoice', field, value);
  const handlePaymentChange = (field, value) => handleChange('payment', field, value);

  // Logo upload
  const handleLogoUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => handleCompanyChange('logo', ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Items
  const handleItemChange = (idx, field, value) => {
    const items = bill.items.map((item, i) => i === idx ? { ...item, [field]: value } : item);
    setBill(prev => ({ ...prev, items }));
  };
  const addItem = () => {
    setBill(prev => ({ ...prev, items: [...prev.items, { description: '', quantity: 1, unitPrice: '', tax: '', total: '' }] }));
  };
  const removeItem = idx => {
    setBill(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  };

  return (
    <form className="space-y-6">
      {/* Company Info */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">Garage Info</h2>
        <label className="block text-xs font-semibold mb-1">Garage Name</label>
        <input className="input w-full mb-2 text-black" placeholder="Garage Name" value={bill.company.name} onChange={e => handleCompanyChange('name', e.target.value)} />
        <label className="block text-xs font-semibold mb-2">Logo (optional)</label>
        {!bill.company.logo && (
          <input type="file" accept="image/*" ref={fileInputRef} className="mb-2 h-8 text-xs px-2 py-1 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-gray-300 file:text-xs file:bg-blue-50 file:text-blue-700" onChange={handleLogoUpload} />
        )}
        {bill.company.logo && (
          <div className="relative inline-block mb-2">
            <img src={bill.company.logo} alt="logo preview" className="h-14 w-14 object-contain rounded" />
            <button type="button" onClick={() => handleCompanyChange('logo', '')} className="absolute -top-2 -right-2 bg-white border border-red-200 rounded-full p-0.5 shadow hover:bg-red-100">
              <X size={14} className="text-red-600" />
            </button>
          </div>
        )}
        <label className="block text-xs font-semibold mb-1">Address</label>
        <input className="input w-full mb-2 text-black" placeholder="Address" value={bill.company.address} onChange={e => handleCompanyChange('address', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Phone</label>
        <input className="input w-full mb-2 text-black" placeholder="Phone" value={bill.company.phone} onChange={e => handleCompanyChange('phone', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Email</label>
        <input className="input w-full mb-2 text-black" placeholder="Email" value={bill.company.email} onChange={e => handleCompanyChange('email', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Website</label>
        <input className="input w-full text-black" placeholder="Website" value={bill.company.website} onChange={e => handleCompanyChange('website', e.target.value)} />
      </div>
      {/* Invoice & Customer Info */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">Invoice & Customer</h2>
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Invoice No</label>
            <input className="input w-full text-black" placeholder="Invoice No" value={bill.invoice.number} onChange={e => handleInvoiceChange('number', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Invoice Date</label>
            <input className="input w-full text-black" type="date" placeholder="Invoice Date" value={bill.invoice.date} onChange={e => handleInvoiceChange('date', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Due Date</label>
            <input className="input w-full text-black" type="date" placeholder="Due Date" value={bill.invoice.dueDate} onChange={e => handleInvoiceChange('dueDate', e.target.value)} />
          </div>
        </div>
        <label className="block text-xs font-semibold mb-1">Customer Name</label>
        <input className="input w-full mb-2 text-black" placeholder="Customer Name" value={bill.customer.name} onChange={e => handleCustomerChange('name', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Customer Address</label>
        <input className="input w-full text-black" placeholder="Customer Address" value={bill.customer.address} onChange={e => handleCustomerChange('address', e.target.value)} />
      </div>
      {/* Vehicle Info */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">Vehicle Info</h2>
        <div className="flex gap-2 mb-2">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Registration No</label>
            <input className="input w-full text-black" placeholder="Registration No" value={bill.vehicle.regNo} onChange={e => handleVehicleChange('regNo', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Vehicle Type</label>
            <input className="input w-full text-black" placeholder="Vehicle Type" value={bill.vehicle.make} onChange={e => handleVehicleChange('make', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Model</label>
            <input className="input w-full text-black" placeholder="Model" value={bill.vehicle.model} onChange={e => handleVehicleChange('model', e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1">Mileage</label>
            <input className="input w-full text-black" placeholder="Mileage" value={bill.vehicle.mileage} onChange={e => handleVehicleChange('mileage', e.target.value)} />
          </div>
        </div>
      </div>
      {/* Service Items */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">Services / Items</h2>
        <div className="space-y-2">
          {bill.items.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <div className="flex-2">
                <label className="block text-xs font-semibold mb-1">Description</label>
                <input className="input w-full text-black" placeholder="Description" value={item.description} onChange={e => handleItemChange(idx, 'description', e.target.value)} />
              </div>
              <div className="w-16">
                <label className="block text-xs font-semibold mb-1">Qty</label>
                <input className="input w-full text-black" type="number" min="1" placeholder="Qty" value={item.quantity} onChange={e => handleItemChange(idx, 'quantity', e.target.value)} />
              </div>
              <div className="w-20">
                <label className="block text-xs font-semibold mb-1">Unit Price</label>
                <input className="input w-full text-black" type="number" step="0.01" placeholder="Unit Price" value={item.unitPrice} onChange={e => handleItemChange(idx, 'unitPrice', e.target.value)} />
              </div>
              <div className="w-16">
                <label className="block text-xs font-semibold mb-1">Tax %</label>
                <input className="input w-full text-black" type="number" step="0.01" placeholder="Tax %" value={item.tax} onChange={e => handleItemChange(idx, 'tax', e.target.value)} />
              </div>
              <button type="button" className="text-red-500 font-bold px-2 mt-6" onClick={() => removeItem(idx)} disabled={bill.items.length === 1}>×</button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded" onClick={addItem}>+ Add Item</button>
      </div>
      {/* Payment & Notes */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-2 text-blue-700">Payment & Notes</h2>
        <label className="block text-xs font-semibold mb-1">Bank Details / UPI</label>
        <input className="input w-full mb-2 text-black" placeholder="Bank Details / UPI" value={bill.payment.bank} onChange={e => handlePaymentChange('bank', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Account No / IFSC / SWIFT</label>
        <input className="input w-full mb-2 text-black" placeholder="Account No / IFSC / SWIFT" value={bill.payment.account} onChange={e => handlePaymentChange('account', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">UPI ID (optional)</label>
        <input className="input w-full mb-2 text-black" placeholder="UPI ID (optional)" value={bill.payment.upi} onChange={e => handlePaymentChange('upi', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Notes</label>
        <textarea className="input w-full mb-2 text-black" placeholder="Notes" value={bill.payment.notes} onChange={e => handlePaymentChange('notes', e.target.value)} />
        <label className="block text-xs font-semibold mb-1">Terms & Conditions</label>
        <textarea className="input w-full text-black" placeholder="Terms & Conditions" value={bill.payment.terms} onChange={e => handlePaymentChange('terms', e.target.value)} />
      </div>
    </form>
  );
} 