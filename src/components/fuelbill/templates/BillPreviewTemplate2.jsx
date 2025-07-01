import React from "react";
import "../FuelBillGenerator.css";

const BillPreviewTemplate2 = ({ form, total, numberToWords, logo }) => {
  const dash = '------';

  return (
    <div className="bill-receipt text-xs w-full max-w-xs mx-auto relative overflow-hidden shadow-md" style={{ minHeight: 500 }}>
      {/* Logo (if enabled) */}
      {logo && (
        <div className="flex justify-center mt-2 mb-1">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
        </div>
      )}
      {/* Company */}
      <div className="flex flex-col items-center mb-1">
        <div className="text-center font-bold text-base leading-tight">{form.companyName || dash}</div>
        <div className="text-center text-[11px] text-gray-500 leading-tight">{form.address || dash}</div>
        {(form.gstNumber || form.phoneNumber) && (
          <div className="text-center text-[10px] text-gray-400 mt-0.5">GST: {form.gstNumber || dash} | Ph: {form.phoneNumber || dash}</div>
        )}
      </div>
      <div className="text-center font-bold text-[13px] tracking-widest my-1">WELCOME!!!</div>
      <hr className="my-1 border-dashed border-gray-300" />
      {/* Receipt Details */}
      <div className="pl-1 pr-2">
        <div className="mb-1 font-mono">
          RECEIPT NO.: <span className="font-bold">{form.billNumber || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          PRODUCT: <span className="font-bold">{form.fuelType || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          RATE/LTR: <span className="font-bold">&#8377; {form.pricePerLiter || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          AMOUNT: <span className="font-bold">&#8377; {total ? total.toFixed(2) : dash}</span>
        </div>
        <div className="mb-1 font-mono">
          VOLUME(LTR.): <span className="font-bold">{form.quantity || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          VEH TYPE: <span className="font-bold">{dash}</span>
        </div>
        <div className="mb-1 font-mono">
          VEH NO: <span className="font-bold">{form.vehicleNumber || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          CUSTOMER NAME: <span className="font-bold">{form.customerName || dash}</span>
        </div>
        <div className="mb-1 font-mono">
          Date: <span className="font-bold">{form.date || dash}</span>
          <span className="ml-4">Time: <span className="font-bold">{form.time || dash}</span></span>
        </div>
        <div className="mb-1 font-mono">
          MODE: <span className="font-bold">{dash}</span>
        </div>
        {form.notes && <div className="mb-1 text-gray-700 text-[11px]">Note: {form.notes}</div>}
      </div>
      <hr className="my-1 border-dashed border-gray-300" />
      <div className="mb-2 italic text-gray-500 text-[11px] text-right">{total ? numberToWords(total) : dash}</div>
      {/* Footer */}
      <div className="text-center text-[11px] mt-2 mb-1 text-gray-600">Thank you! Visit Again<br />Save Fuel, Save Money.</div>
    </div>
  );
};

export default BillPreviewTemplate2; 