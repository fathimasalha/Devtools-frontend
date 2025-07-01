import React from "react";
import "../FuelBillGenerator.css";

const BillPreviewTemplate1 = ({ form, total, numberToWords, logo }) => {
  const dash = '------';

  return (
    <div className="bill-receipt text-xs w-full max-w-xs mx-auto relative overflow-hidden shadow-md" style={{ minHeight: 480 }}>
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
      {/* Bill Details */}
      <div className="pl-1 pr-2">
        <div className="flex justify-between mb-0.5">
          <span>Bill No:</span>
          <span className="font-mono">{form.billNumber || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Date:</span>
          <span>{form.date || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Time:</span>
          <span>{form.time || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Fuel:</span>
          <span>{form.fuelType || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Customer:</span>
          <span className="font-semibold">{form.customerName || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Vehicle No:</span>
          <span className="font-semibold">{form.vehicleNumber || dash}</span>
        </div>
      </div>
      <hr className="my-1 border-dashed border-gray-300" />
      {/* Fuel Details */}
      <div className="pl-1 pr-2">
        <div className="flex justify-between mb-0.5">
          <span>Price/Ltr</span>
          <span>&#8377; {form.pricePerLiter || dash}</span>
        </div>
        <div className="flex justify-between mb-0.5">
          <span>Quantity</span>
          <span>{form.quantity || dash} Ltr</span>
        </div>
        <div className="flex justify-between mb-0.5 font-bold text-base">
          <span>Total</span>
          <span>&#8377; {total ? total.toFixed(2) : dash}</span>
        </div>
        <div className="mb-1 italic text-gray-500 text-[11px] text-right">{total ? numberToWords(total) : dash}</div>
        {form.notes && <div className="mb-1 text-gray-700 text-[11px]">Note: {form.notes}</div>}
      </div>
      <hr className="my-1 border-dashed border-gray-300" />
      {/* Footer */}
      <div className="text-center text-[11px] mt-2 mb-1 text-gray-600">Thank you! Visit Again<br />Save Fuel, Save Money.</div>
    </div>
  );
};

export default BillPreviewTemplate1; 