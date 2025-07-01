import React, { useState, useRef } from "react";
import "./FuelBillGenerator.css";
import BillPreviewTemplate1 from "./templates/BillPreviewTemplate1";
import BillPreviewTemplate2 from "./templates/BillPreviewTemplate2";
import BillPreviewTemplate3 from "./templates/BillPreviewTemplate3";
import bpLogo from "./logos/bp.png";
import ioLogo from "./logos/io.png";
import hpLogo from "./logos/hp.png";
import jioLogo from "./logos/jio.png";
import nayaraLogo from "./logos/nayara.png";
import essarLogo from "./logos/essar.png";
import {  Download as DownloadIcon, FileDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { motion } from 'framer-motion';

const templates = [
  { name: "Template 1", component: BillPreviewTemplate1 },
  { name: "Template 2", component: BillPreviewTemplate2 },
  { name: "Template 3", component: BillPreviewTemplate3 },
];

const initialForm = {
  companyName: "",
  address: "",
  customerName: "",
  vehicleNumber: "",
  fuelType: "",
  pricePerLiter: "",
  quantity: "",
  date: "",
  time: "",
  billNumber: "",
  gstNumber: "",
  phoneNumber: "",
  notes: "",
};

const sampleForm = {
  companyName: "Sample Fuel Station Pvt Ltd",
  address: "123 Main Road, City, State, 123456",
  customerName: "John Doe",
  vehicleNumber: "MH12AB1234",
  fuelType: "Petrol",
  pricePerLiter: "105.50",
  quantity: "10.00",
  date: "2024-06-24",
  time: "12:34",
  billNumber: "FB-123456",
  gstNumber: "27ABCDE1234F1Z5",
  phoneNumber: "9876543210",
  notes: "Thank you for your visit!",
};
const sampleTotal = 1055.0;

function generateBillNumber() {
  return `FB-${Date.now().toString().slice(-6)}`;
}

function getCurrentDate() {
  return new Date().toISOString().slice(0, 10);
}

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
}

const priceMap = {
  Petrol: 105.5,
  Diesel: 92.3,
};

// Logo images (Google URLs)
const logoOptions = [
  { label: "Bharat Petroleum", value: "bp", img: bpLogo },
  { label: "Indian Oil", value: "io", img: ioLogo },
  { label: "HP", value: "hp", img: hpLogo },
  { label: "Essar Oil", value: "essar", img: essarLogo },
  { label: "Jio", value: "jio", img: jioLogo },
  { label: "Nayara", value: "nayara", img: nayaraLogo },
];

const FuelBillGenerator = () => {
  const [form, setForm] = useState({
    ...initialForm,
    date: getCurrentDate(),
    time: getCurrentTime(),
    billNumber: generateBillNumber(),
  });
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const previewRef = useRef(null);
  const [selectedLogo, setSelectedLogo] = useState("bp");
  const [logoEnabled, setLogoEnabled] = useState(true);

  // Auto-calculate total
  const total =
    parseFloat(form.pricePerLiter || 0) * parseFloat(form.quantity || 0);

  // Amount in words (simple, optional)
  function numberToWords(num) {
    // Simple version for demo
    if (!num) return "";
    return num.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + " Rupees";
  }

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Auto-fill price per liter
    if (name === "fuelType" && priceMap[value]) {
      setForm((prev) => ({ ...prev, pricePerLiter: priceMap[value] }));
    }
  };

  // Template selection
  const TemplateComponent = templates[selectedTemplate].component;

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
    pdf.save('fuel-bill.pdf');
  };

  return (
    <motion.div
      className="fuel-bill-generator-container min-h-screen bg-gray-50 py-8 px-2 md:px-0"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <h1 className="mt-8 md:mt-12 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-green-700 drop-shadow break-words leading-tight">Fuel Bill Generator</h1>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
        {/* Left: Form */}
        <form className="w-full md:w-1/2 space-y-4" autoComplete="off">
          {/* Template Selection */}
          <div className="flex gap-2 mb-2">
            {templates.map((tpl, idx) => (
              <button
                type="button"
                key={tpl.name}
                className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
                  selectedTemplate === idx
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-green-700 border-green-400 hover:bg-green-50"
                }`}
                onClick={() => setSelectedTemplate(idx)}
              >
                {tpl.name}
              </button>
            ))}
          </div>
          {/* Logo Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Logo</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {logoOptions.map(opt => (
                <label key={opt.value} className={`flex items-center gap-1 px-2 py-1 rounded border cursor-pointer ${selectedLogo === opt.value && logoEnabled ? "border-green-600 bg-green-50" : "border-gray-300 bg-white"}`}>
                  <input
                    type="radio"
                    name="logo"
                    value={opt.value}
                    checked={selectedLogo === opt.value && logoEnabled}
                    onChange={() => { setSelectedLogo(opt.value); setLogoEnabled(true); }}
                    disabled={!logoEnabled}
                  />
                  <img src={opt.img} alt={opt.label} className="w-6 h-6 object-contain" />
                  <span className="text-xs font-medium">{opt.label}</span>
                </label>
              ))}
              <label className={`flex items-center gap-1 px-2 py-1 rounded border cursor-pointer ${!logoEnabled ? "border-red-500 bg-red-50" : "border-gray-300 bg-white"}`}>
                <input
                  type="radio"
                  name="logo"
                  value="none"
                  checked={!logoEnabled}
                  onChange={() => setLogoEnabled(false)}
                />
                <span className="text-xs font-medium text-red-600">Disable Logo</span>
              </label>
            </div>
          </div>
          {/* Form Fields */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="companyName">Company/Outlet Name</label>
            <input type="text" id="companyName" name="companyName" placeholder="Enter company/outlet name" className="w-full input input-bordered" value={form.companyName} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
            <input type="text" id="address" name="address" placeholder="Enter address" className="w-full input input-bordered" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="customerName">Customer Name</label>
            <input type="text" id="customerName" name="customerName" placeholder="Enter customer name" className="w-full input input-bordered" value={form.customerName} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="vehicleNumber">Vehicle Number</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" placeholder="Enter vehicle number" className="w-full input input-bordered" value={form.vehicleNumber} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="fuelType">Fuel Type</label>
            <select id="fuelType" name="fuelType" className="w-full input input-bordered" value={form.fuelType} onChange={handleChange}>
              <option value="">Select fuel type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="pricePerLiter">Price per Liter</label>
            <input type="number" step="0.01" id="pricePerLiter" name="pricePerLiter" placeholder="Enter price per liter" className="w-full input input-bordered" value={form.pricePerLiter} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="quantity">Quantity (Liters)</label>
            <input type="number" step="0.01" id="quantity" name="quantity" placeholder="Enter quantity in liters" className="w-full input input-bordered" value={form.quantity} onChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
              <input type="date" id="date" name="date" className="w-full input input-bordered" value={form.date} onChange={handleChange} />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1" htmlFor="time">Time</label>
              <input type="time" id="time" name="time" className="w-full input input-bordered" value={form.time} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="billNumber">Bill Number</label>
            <input type="text" id="billNumber" name="billNumber" className="w-full input input-bordered" value={form.billNumber} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="gstNumber">GST Number (optional)</label>
            <input type="text" id="gstNumber" name="gstNumber" placeholder="Enter GST number" className="w-full input input-bordered" value={form.gstNumber} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phoneNumber">Phone Number (optional)</label>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter phone number" className="w-full input input-bordered" value={form.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" name="notes" placeholder="Enter notes" className="w-full input input-bordered" value={form.notes} onChange={handleChange} />
          </div>
        </form>
        {/* Right: Bill Preview */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div ref={previewRef} className="w-full flex flex-col items-center">
            <TemplateComponent form={form} total={total} numberToWords={numberToWords} logo={logoEnabled ? logoOptions.find(opt => opt.value === selectedLogo)?.img : null} />
            </div>
          <button onClick={handleDownloadPDF} className="mt-4 flex items-center gap-2 bg-green-700 text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition">
            <DownloadIcon size={18} /> Download as PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FuelBillGenerator; 