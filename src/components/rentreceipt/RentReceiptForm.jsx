import React from 'react';

const RentReceiptForm = ({ form, setForm }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="w-full md:w-96 space-y-4 rent-form">
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="landlord">Landlord Name</label>
        <input type="text" id="landlord" name="landlord" placeholder="Enter landlord name" className="w-full input input-bordered" value={form.landlord} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="tenant">Tenant Name</label>
        <input type="text" id="tenant" name="tenant" placeholder="Enter tenant name" className="w-full input input-bordered" value={form.tenant} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="address">Address of Property</label>
        <input type="text" id="address" name="address" placeholder="Enter property address" className="w-full input input-bordered" value={form.address} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="rentAmount">Rent Amount</label>
        <input type="number" id="rentAmount" name="rentAmount" placeholder="Enter rent amount" className="w-full input input-bordered" value={form.rentAmount} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="rentMonth">Rent Month</label>
        <input type="month" id="rentMonth" name="rentMonth" className="w-full input input-bordered" value={form.rentMonth} onChange={handleChange} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="paymentMode">Payment Mode</label>
        <select id="paymentMode" name="paymentMode" className="w-full input input-bordered" value={form.paymentMode} onChange={handleChange}>
          <option value="">Select payment mode</option>
          <option value="Cash">Cash</option>
          <option value="Cheque">Cheque</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="pan">PAN Number (optional)</label>
        <input type="text" id="pan" name="pan" placeholder="Enter PAN number" className="w-full input input-bordered" value={form.pan} onChange={handleChange} />
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="receiptDate">Receipt Date</label>
          <input type="date" id="receiptDate" name="receiptDate" className="w-full input input-bordered" value={form.receiptDate} onChange={handleChange} />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1" htmlFor="periodFrom">Rent Period (From)</label>
          <input type="date" id="periodFrom" name="periodFrom" className="w-full input input-bordered" value={form.periodFrom} onChange={handleChange} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="periodTo">Rent Period (To)</label>
        <input type="date" id="periodTo" name="periodTo" className="w-full input input-bordered" value={form.periodTo} onChange={handleChange} />
      </div>
    </form>
  );
};

export default RentReceiptForm; 