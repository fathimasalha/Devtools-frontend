import React from "react";
import "../FuelBillGenerator.css";

const BillPreviewTemplate3 = ({ form, total, numberToWords, logo }) => {
  const dash = '------';

  return (
    <div className="bill-receipt text-xs w-full max-w-xs mx-auto relative overflow-hidden shadow-md" style={{ minHeight: 500 }}>
      {/* Logo (if enabled) */}
      {logo && (
        <div className="flex justify-center mt-2 mb-1">
          <img src={logo} alt="Logo" className="h-16 object-contain" />
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col items-center mb-1">
        <div className="text-center font-extrabold text-base leading-tight mb-1">Fuel Receipt</div>
      </div>
      <hr className="my-1 border-dashed border-gray-300" />
      {/* Receipt Details */}
      <div className="pl-1 pr-2 mb-1">
        <div className="flex justify-between font-mono mb-0.5">
          <span>RECEIPT NO.:</span>
          <span className="font-bold">{form.billNumber || dash}</span>
        </div>
        <div className="flex justify-between font-mono mb-0.5">
          <span>DATE:</span>
          <span>{form.date || dash}</span>
        </div>
        <div className="flex justify-between font-mono mb-0.5">
          <span>TIME:</span>
          <span>{form.time || dash}</span>
        </div>
      </div>
      {/* Fuel Station Details */}
      <div className="pl-1 pr-2 mb-1">
        <div className="font-bold text-[11px] mb-0.5">FUEL STATION DETAILS</div>
        <div className="text-[11px]">{form.companyName || dash}</div>
        <div className="text-[11px]">{form.address || dash}</div>
      </div>
      {/* Customer Details */}
      <div className="pl-1 pr-2 mb-1">
        <div className="font-bold text-[11px] mb-0.5">BILLED TO</div>
        <div className="text-[11px]">CUSTOMER NAME: {form.customerName || dash}</div>
        <div className="text-[11px]">VEHICLE NUMBER: {form.vehicleNumber || dash}</div>
        <div className="text-[11px]">FUEL TYPE: {form.fuelType || dash}</div>
      </div>
      {/* Payment Method */}
      <div className="pl-1 pr-2 mb-1">
        <div className="font-bold text-[11px] mb-0.5">PAYMENT METHOD</div>
        <div className="text-[11px]">{dash}</div>
      </div>
      {/* Summary Table */}
      <div className="pl-1 pr-2 mb-1">
        <div className="font-bold text-[11px] mb-0.5">Receipt Summary</div>
        <table className="w-full text-left text-[11px] mb-1">
          <thead>
            <tr className="border-b border-gray-200">
              <th>Fuel Rate</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&#8377; {form.pricePerLiter || dash}</td>
              <td>{form.quantity || dash} Ltr</td>
              <td className="font-bold">&#8377; {total ? total.toFixed(2) : dash}</td>
            </tr>
          </tbody>
        </table>
        <div className="italic text-gray-500 text-[11px] text-right">{total ? numberToWords(total) : dash}</div>
      </div>
      {form.notes && <div className="mb-1 text-gray-700 text-[11px] pl-1">Note: {form.notes}</div>}
      <hr className="my-1 border-dashed border-gray-300" />
      {/* Footer */}
      <div className="text-center text-[11px] mt-2 mb-1 text-gray-600">Thank you! For Fuelling With Us<br />Save fuel, secure the future!</div>
    </div>
  );
};

export default BillPreviewTemplate3; 