import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download as DownloadIcon, Phone as PhoneIcon, Mail as MailIcon } from 'lucide-react';

function calcTotals(items, discount = 0, paid = 0) {
  let subtotal = 0, tax = 0;
  items.forEach(item => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    const t = Number(item.tax) || 0;
    const rowTotal = qty * price;
    subtotal += rowTotal;
    tax += rowTotal * (t / 100);
  });
  const total = subtotal + tax - (Number(discount) || 0);
  const due = total - (Number(paid) || 0);
  return { subtotal, tax, total, due };
}

const labelClass = "text-xs text-gray-500 font-medium";
const valueClass = "text-base font-semibold text-blue-900";

function Template1({ bill }) {
  const { subtotal, tax, total, due } = calcTotals(bill.items, bill.totals.discount, bill.totals.paid);
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 print:p-2 max-w-2xl mx-auto text-black print:bg-white print:shadow-none border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b pb-2">
        <div className="flex items-center gap-4">
          {bill.company.logo && <img src={bill.company.logo} alt="logo" className="h-14 w-14 object-contain rounded" />}
          <div>
            <div className="font-bold text-xl">{bill.company.name || <span className="text-gray-400">Garage Name</span>}</div>
            <div className="text-sm text-gray-700">{bill.company.address || <span className="text-gray-300">Address</span>}</div>
            <div className="text-sm text-gray-700 flex items-center gap-2">
              {bill.company.phone && (
                <span className="flex items-center gap-1"><PhoneIcon size={14} className="text-black" />{bill.company.phone}</span>
              )}
              {bill.company.email && (
                <span className="flex items-center gap-1"><MailIcon size={14} className="text-black" />{bill.company.email}</span>
              )}
            </div>
            <div className="text-sm text-gray-700">{bill.company.website && <span>🌐 {bill.company.website}</span>}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">INVOICE</div>
          <div className={labelClass}>No:</div>
          <div className="text-xs font-semibold text-blue-900">{bill.invoice.number || '---'}</div>
          <div className={labelClass}>Date:</div>
          <div className="text-xs font-semibold text-blue-900">{bill.invoice.date}</div>
          {bill.invoice.dueDate && <><div className={labelClass}>Due:</div><div className="text-xs font-semibold text-blue-900">{bill.invoice.dueDate}</div></>}
        </div>
      </div>
      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className={labelClass}>Bill To:</div>
          <div className={valueClass}>{bill.customer.name || <span className="text-gray-400">Customer Name</span>}</div>
          <div className="text-sm text-gray-700">{bill.customer.address || <span className="text-gray-300">Customer Address</span>}</div>
        </div>
        <div>
          <div className={labelClass}>Vehicle Info:</div>
          <div className="text-sm text-gray-700">Reg No: <span className="text-xs font-semibold text-blue-900">{bill.vehicle.regNo || <span className="text-gray-400">---</span>}</span></div>
          <div className="text-sm text-gray-700">Vehicle Type: <span className="text-xs font-semibold text-blue-900">{bill.vehicle.make || <span className="text-gray-400">---</span>}</span></div>
          <div className="text-sm text-gray-700">Model: <span className="text-xs font-semibold text-blue-900">{bill.vehicle.model || <span className="text-gray-400">---</span>}</span></div>
          <div className="text-sm text-gray-700">Mileage: <span className="text-xs font-semibold text-blue-900">{bill.vehicle.mileage || <span className="text-gray-400">---</span>}</span></div>
        </div>
      </div>
      {/* Items Table */}
      <table className="w-full text-sm mb-4 border-t border-b border-gray-300">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2">Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Tax %</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-1">
                <span className="font-semibold text-gray-900">{item.description || <span className="text-gray-400">Service/Item</span>}</span>
                {item.details && <div className="text-xs text-gray-500">{item.details}</div>}
              </td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{item.tax}</td>
              <td>{((Number(item.quantity)||0)*(Number(item.unitPrice)||0)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Totals */}
      <div className="flex flex-col items-end mb-2">
        <div className="text-sm text-gray-700">Subtotal: <span className="font-semibold">{subtotal.toFixed(2)}</span></div>
        <div className="text-sm text-gray-700">Tax: <span className="font-semibold">{tax.toFixed(2)}</span></div>
        {bill.totals.discount ? <div className="text-sm text-gray-700">Discount: <span className="font-semibold">{bill.totals.discount}</span></div> : null}
        <div className="text-lg font-bold">Total: {total.toFixed(2)}</div>
        <div className="text-sm text-gray-700">Paid: <span className="font-semibold">{bill.totals.paid || 0}</span></div>
        <div className="text-lg font-bold text-blue-900">Balance Due: {due.toFixed(2)}</div>
      </div>
      {/* Payment & Notes */}
      <div className="mt-4 text-sm">
        <div className="font-semibold">Payment Details:</div>
        <div><span className={labelClass}>Bank:</span> <span className="text-xs font-semibold text-blue-900">{bill.payment.bank}</span></div>
        <div><span className={labelClass}>Account:</span> <span className="text-xs font-semibold text-blue-900">{bill.payment.account}</span></div>
        <div><span className={labelClass}>UPI:</span> <span className="text-xs font-semibold text-blue-900">{bill.payment.upi}</span></div>
        <div className="mt-2"><span className={labelClass}>Notes:</span> <span className="text-xs font-semibold text-blue-900">{bill.payment.notes}</span></div>
        <div className="mt-2 italic"><span className={labelClass}>Terms:</span> <span className="text-xs font-semibold text-blue-900">{bill.payment.terms}</span></div>
      </div>
      {/* Signature */}
      <div className="flex justify-end mt-8">
        <div className="text-right">
          <div className="border-t border-gray-400 w-40 mb-1"></div>
          <div className="text-xs">Signature</div>
        </div>
      </div>
    </div>
  );
}

function Template2({ bill }) {
  const { subtotal, tax, total, due } = calcTotals(bill.items, bill.totals.discount, bill.totals.paid);
  return (
    <div className="bg-white rounded shadow p-8 max-w-2xl mx-auto border border-blue-200">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="font-bold text-2xl text-blue-800">{bill.company.name || 'Garage Name'}</div>
          <div className="text-xs text-gray-500">{bill.company.address}</div>
          <div className="text-xs text-gray-500">{bill.company.phone} | {bill.company.email}</div>
        </div>
        <div className="text-right">
          {bill.company.logo && <img src={bill.company.logo} alt="logo" className="h-12 w-12 object-contain mb-2" />}
          <div className="font-bold text-lg">INVOICE</div>
          <div className="text-xs text-gray-500">No: {bill.invoice.number || '---'}</div>
          <div className="text-xs text-gray-500">Date: {bill.invoice.date}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div>
          <div className="font-semibold text-sm">Bill To:</div>
          <div className="font-bold text-blue-900">{bill.customer.name}</div>
          <div className="text-xs text-gray-500">{bill.customer.address}</div>
        </div>
        <div className="mt-2 md:mt-0">
          <div className="font-semibold text-sm">Vehicle:</div>
          <div className="text-xs text-gray-500">Reg: {bill.vehicle.regNo} | Vehicle Type: {bill.vehicle.make} {bill.vehicle.model}</div>
          <div className="text-xs text-gray-500">Mileage: {bill.vehicle.mileage}</div>
        </div>
      </div>
      <table className="w-full text-xs mb-4 border-t border-b border-gray-200">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2">Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Tax %</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-100">
              <td className="py-1 font-semibold text-gray-900">{item.description}</td>
              <td className="font-semibold text-blue-900">{item.quantity}</td>
              <td className="font-semibold text-blue-900">{item.unitPrice}</td>
              <td className="font-semibold text-blue-900">{item.tax}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-end mb-2">
        <div className="text-xs text-gray-500">Subtotal: <span className="font-semibold">{subtotal.toFixed(2)}</span></div>
        <div className="text-xs text-gray-500">Tax: <span className="font-semibold">{tax.toFixed(2)}</span></div>
        {bill.totals.discount ? <div className="text-xs text-gray-500">Discount: <span className="font-semibold">{bill.totals.discount}</span></div> : null}
        <div className="text-lg font-bold">Total: {total.toFixed(2)}</div>
        <div className="text-xs text-gray-500">Paid: <span className="font-semibold">{bill.totals.paid || 0}</span></div>
        <div className="text-lg font-bold text-blue-800">Balance Due: {due.toFixed(2)}</div>
      </div>
      <div className="mt-4 text-xs">
        <div className="font-semibold">Payment Details:</div>
        <div>{bill.payment.bank}</div>
        <div>{bill.payment.account}</div>
        <div>{bill.payment.upi}</div>
        <div className="mt-2">{bill.payment.notes}</div>
        <div className="mt-2 italic">{bill.payment.terms}</div>
      </div>
      <div className="flex justify-end mt-8">
        <div className="text-right">
          <div className="border-t border-gray-400 w-32 mb-1"></div>
          <div className="text-xs">Signature</div>
        </div>
      </div>
    </div>
  );
}

function Template3({ bill }) {
  const { subtotal, tax, total, due } = calcTotals(bill.items, bill.totals.discount, bill.totals.paid);
  return (
    <div className="bg-white rounded p-8 max-w-2xl mx-auto border border-gray-200 shadow print:shadow-none">
      {/* Header: Logo + Company Info + Invoice Info */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 border-b pb-4">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          {bill.company.logo && <img src={bill.company.logo} alt="logo" className="h-16 w-16 object-contain rounded" />}
          <div>
            <div className="font-bold text-lg text-gray-900">{bill.company.name || 'Garage Name'}</div>
            <div className="text-xs text-gray-700">{bill.company.address}</div>
            <div className="text-xs text-gray-700">{bill.company.phone} {bill.company.email && <>| {bill.company.email}</>}</div>
            <div className="text-xs text-gray-700">{bill.company.website}</div>
          </div>
        </div>
        <div className="text-right w-full md:w-auto">
          <div className="font-bold text-base text-gray-800">Invoice</div>
          <div className="text-xs text-gray-500">No: <span className="font-semibold text-gray-800">{bill.invoice.number || '---'}</span></div>
          <div className="text-xs text-gray-500">Invoice Date: <span className="font-semibold text-gray-800">{bill.invoice.date}</span></div>
          {bill.invoice.dueDate && <div className="text-xs text-gray-500">Due Date: <span className="font-semibold text-gray-800">{bill.invoice.dueDate}</span></div>}
        </div>
      </div>
      {/* Bill To & Vehicle Info */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-4">
        <div>
          <div className="font-semibold text-xs text-gray-600 mb-1">Bill to:</div>
          <div className="font-bold text-gray-900">{bill.customer.name}</div>
          <div className="text-xs text-gray-700">{bill.customer.address}</div>
        </div>
        <div>
          <div className="font-semibold text-xs text-gray-600 mb-1">Vehicle Info:</div>
          <div className="text-xs text-gray-700">Reg No: <span className="font-semibold text-gray-800">{bill.vehicle.regNo}</span></div>
          <div className="text-xs text-gray-700">Vehicle Type: <span className="font-semibold text-gray-800">{bill.vehicle.make}</span></div>
          <div className="text-xs text-gray-700">Model: <span className="font-semibold text-gray-800">{bill.vehicle.model}</span></div>
          <div className="text-xs text-gray-700">Mileage: <span className="font-semibold text-gray-800">{bill.vehicle.mileage}</span></div>
        </div>
      </div>
      {/* Items Table */}
      <table className="w-full text-xs mb-6 border-t border-b border-gray-200">
        <thead>
          <tr className="text-left text-gray-600">
            <th className="py-2">Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Tax %</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-100 align-top">
              <td className="py-1">
                <span className="font-semibold text-gray-900">{item.description}</span>
                {item.details && <div className="text-xs text-gray-500">{item.details}</div>}
              </td>
              <td className="font-semibold text-blue-900">{item.quantity}</td>
              <td className="font-semibold text-blue-900">{item.unitPrice}</td>
              <td className="font-semibold text-blue-900">{item.tax}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Totals Summary */}
      <div className="flex flex-col items-end mb-6">
        <div className="w-full md:w-1/2">
          <div className="flex justify-between text-xs text-gray-700"><span>Subtotal without VAT</span><span>{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-xs text-gray-700"><span>VAT</span><span>{tax.toFixed(2)}</span></div>
          {bill.totals.discount ? <div className="flex justify-between text-xs text-gray-700"><span>Discount</span><span>{bill.totals.discount}</span></div> : null}
          <div className="flex justify-between font-bold text-base border-t border-gray-300 mt-2 pt-2"><span>Total</span><span>{total.toFixed(2)}</span></div>
          <div className="flex justify-between text-xs text-gray-700"><span>Amount Paid</span><span>{bill.totals.paid || 0}</span></div>
          <div className="flex justify-between font-bold text-base text-black"><span>Amount Due</span><span>{due.toFixed(2)}</span></div>
        </div>
      </div>
      {/* Terms, Payment, QR */}
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-6 mt-4">
        <div className="flex-1">
          <div className="font-semibold text-xs text-gray-600 mb-1">Terms & Conditions</div>
          <div className="text-xs text-gray-700 mb-2">{bill.payment.notes}</div>
          <div className="text-xs text-gray-700">{bill.payment.terms}</div>
        </div>
      </div>
      {/* Payment Details */}
      <div className="mt-4 text-xs text-gray-700">
        <div><span className="font-semibold">Bank:</span> {bill.payment.bank}</div>
        <div><span className="font-semibold">Account:</span> {bill.payment.account}</div>
        <div><span className="font-semibold">UPI:</span> {bill.payment.upi}</div>
      </div>
      {/* Signature */}
      <div className="flex justify-end mt-8">
        <div className="text-right">
          <div className="border-t border-gray-400 w-32 mb-1"></div>
          <div className="text-xs">Signature</div>
        </div>
      </div>
    </div>
  );
}

export default function GarageInvoicePreview({ bill }) {
  const [template, setTemplate] = useState(1);
  const previewRef = useRef();

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    const input = previewRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save('garage-invoice.pdf');
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button type="button" className={`px-3 py-1 rounded border text-sm font-medium ${template === 1 ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-400'}`} onClick={() => setTemplate(1)}>Template 1</button>
        <button type="button" className={`px-3 py-1 rounded border text-sm font-medium ${template === 2 ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-400'}`} onClick={() => setTemplate(2)}>Template 2</button>
        <button type="button" className={`px-3 py-1 rounded border text-sm font-medium ${template === 3 ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-blue-700 border-blue-400'}`} onClick={() => setTemplate(3)}>Template 3</button>
      </div>
      <div ref={previewRef}>
        {template === 1 && <Template1 bill={bill} />}
        {template === 2 && <Template2 bill={bill} />}
        {template === 3 && <Template3 bill={bill} />}
      </div>
      <button onClick={handleDownloadPDF} className="mt-4 flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition">
        <DownloadIcon size={18} /> Download as PDF
      </button>
    </div>
  );
} 