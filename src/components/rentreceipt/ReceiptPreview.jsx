import React from 'react';
import './RentReceipt.css';

function numberToWords(num) {
  // Simple number to words for demo
  if (!num) return '';
  const n = parseInt(num, 10);
  if (isNaN(n)) return '';
  return n.toLocaleString('en-IN') + ' Rupees';
}

const handwritingStyle = { fontFamily: "'Caveat', 'Pacifico', 'Dancing Script', cursive", color: '#1e40af', fontWeight: 700, fontSize: '1.3em' };

const ReceiptPreview = ({ form, template = 1 }) => {
  const receiptNo = form.receiptDate ? `#RENT${form.receiptDate.replace(/-/g, '')}` : '#RENT20240624';
  const rentMonth = form.rentMonth ? new Date(form.rentMonth + '-01').toLocaleString('default', { month: 'long', year: 'numeric' }) : 'Month YYYY';
  const periodFrom = form.periodFrom || '____-__-__';
  const periodTo = form.periodTo || '____-__-__';
  if (template === 2) {
    return (
      <div className="receipt-preview border border-gray-400 rounded-2xl bg-white p-10 shadow-lg max-w-xl w-full text-black relative" style={{ fontFamily: 'Georgia, Times, serif', minHeight: 420 }}>
        {/* Watermark or background icon */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', opacity: 0.07, fontSize: 120, transform: 'translate(-50%, -50%)', pointerEvents: 'none', userSelect: 'none' }}>
          🏠
        </div>
        <div className="text-center mb-6">
          <span className="font-extrabold text-3xl tracking-wider" style={{ letterSpacing: '0.08em' }}>RENT RECEIPT</span>
          <span className="text-lg text-black block mt-1 font-medium">({rentMonth})</span>
        </div>
        <div className="mb-6 text-base text-center leading-relaxed">
          Received a sum of <span style={form.rentAmount ? handwritingStyle : {}}>{form.rentAmount ? `${form.rentAmount}/-` : '____/-'}</span> from <span style={form.tenant ? handwritingStyle : {}}>{form.tenant || 'Tenant Name'}</span> towards the rent of property situated at <span style={form.address ? handwritingStyle : {}}>{form.address || 'Property Address'}</span> for the period <span style={periodFrom !== '____-__-__' ? handwritingStyle : {}}>{periodFrom}</span> to <span style={periodTo !== '____-__-__' ? handwritingStyle : {}}>{periodTo}</span>.
        </div>
        <div className="flex justify-between items-end mt-10">
          <div className="text-base">Date: <span style={form.receiptDate ? handwritingStyle : {}}>{form.receiptDate || '____-__-__'}</span></div>
          <div className="text-base font-semibold text-right flex flex-col items-end">
            <span className="block border-t border-gray-400 w-32 mb-1 mt-6"></span>
            <span className="text-sm">Signature (Landlord)</span>
            <span className="text-lg font-serif mt-1" style={form.landlord ? handwritingStyle : {}}>{form.landlord || 'Landlord Name'}</span>
          </div>
        </div>
      </div>
    );
  }
  // Default: Template 1
  return (
    <div className="receipt-preview border-2 border-black rounded-xl bg-white p-6 shadow-md max-w-lg w-full text-black">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-lg">RENT RECEIPT</span>
        <span className="text-xs text-gray-700">{receiptNo}</span>
      </div>
      <div className="mb-1 text-sm text-gray-700">Date: <span style={form.receiptDate ? handwritingStyle : {}}>{form.receiptDate || '____-__-__'}</span></div>
      <div className="mb-4 text-base">
        Received a sum of <span style={form.rentAmount ? handwritingStyle : {}}>{form.rentAmount ? `${form.rentAmount}/-` : '____/-'}</span> from <span style={form.tenant ? handwritingStyle : {}}>{form.tenant || 'Tenant Name'}</span> towards the rent of property situated at <span style={form.address ? handwritingStyle : {}}>{form.address || 'Property Address'}</span> for the period <span style={periodFrom !== '____-__-__' ? handwritingStyle : {}}>{periodFrom}</span> to <span style={periodTo !== '____-__-__' ? handwritingStyle : {}}>{periodTo}</span> for the month of <span>{rentMonth}</span>.
      </div>
      <div className="mb-2 text-sm">Payment Mode: <span style={form.paymentMode ? handwritingStyle : {}}>{form.paymentMode || '________'}</span></div>
      {form.pan && <div className="mb-2 text-sm">PAN: <span style={form.pan ? handwritingStyle : {}}>{form.pan}</span></div>}
      <div className="flex justify-between items-end mt-8">
        <div className="text-xs text-gray-700">Signature (Landlord)</div>
        <div className="text-base font-semibold border-t border-gray-700 px-4" style={form.landlord ? handwritingStyle : {}}>{form.landlord || 'Landlord Name'}</div>
      </div>
    </div>
  );
};

export default ReceiptPreview; 