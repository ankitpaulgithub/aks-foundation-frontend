import React, { useState, useEffect } from 'react';
import Layout from '../../../../components/education/Layout'
import { FaUser } from 'react-icons/fa'
const FeeReceiptPage = () => {
    const [selectedMonths, setSelectedMonths] = useState(['Apr', 'May', 'Jun']);
    const [selectAll, setSelectAll] = useState(false);
    const [additionalFee, setAdditionalFee] = useState(0);
    const [concessionPercent, setConcessionPercent] = useState(0);
    const [amountReceived, setAmountReceived] = useState(3570);
    const [paymentMode, setPaymentMode] = useState('');
    const [bankName, setBankName] = useState('');
    const [chequeNumber, setChequeNumber] = useState('');
    const [chequeDate, setChequeDate] = useState('');
    const [remark, setRemark] = useState('');
    const [sendSMS, setSendSMS] = useState(true);
    const [sendWhatsApp, setSendWhatsApp] = useState(true);

    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    const feeItems = [
        { name: 'Re-Admission Fee', apr: 200, may: 0, jun: 0, isRecurring: false },
        { name: 'Reg Fee', apr: 500, may: 0, jun: 0, isRecurring: false },
        { name: 'Tia & Belt', apr: 200, may: 0, jun: 0, isRecurring: false },
        { name: 'I Card', apr: 70, may: 0, jun: 0, isRecurring: false },
        { name: 'Monthly Fee', apr: 300, may: 300, jun: 300, isRecurring: true },
        { name: 'Transport Fee', apr: 500, may: 500, jun: 500, isRecurring: true },
        { name: 'Dairy Fee', apr: 200, may: 0, jun: 0, isRecurring: false },
        { name: 'Test Fee', apr: 0, may: 0, jun: 0, isRecurring: false },
        { name: 'Annual Fee', apr: 0, may: 0, jun: 0, isRecurring: false }
    ];

    const [selectedFeeItems, setSelectedFeeItems] = useState(feeItems.map(item => item.name));

    useEffect(() => {
        // Calculate total fee based on selected months and selected fee items
        const totalFee = calculateTotalFee();
        const concessionAmount = (totalFee * concessionPercent) / 100;
        const netFee = totalFee + parseFloat(additionalFee) - concessionAmount;

        // Update amount received if it's more than net fee
        if (amountReceived > netFee) {
            setAmountReceived(netFee);
        }
    }, [selectedMonths, selectedFeeItems, additionalFee, concessionPercent, amountReceived]);

    const calculateTotalFee = () => {
        let total = 0;
        selectedFeeItems.forEach(itemName => {
            const item = feeItems.find(fee => fee.name === itemName);
            if (item) {
                if (item.isRecurring) {
                    // For recurring items, multiply by number of selected months
                    const monthlyAmount = item.apr; // All recurring items have same monthly amount
                    total += monthlyAmount * selectedMonths.length;
                } else {
                    // For one-time items, add only if April is selected
                    if (selectedMonths.includes('Apr')) {
                        total += item.apr;
                    }
                }
            }
        });
        return total;
    };

    const handleMonthToggle = (month) => {
        if (selectedMonths.includes(month)) {
            setSelectedMonths(selectedMonths.filter(m => m !== month));
        } else {
            setSelectedMonths([...selectedMonths, month]);
        }
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedMonths([]);
            setSelectAll(false);
        } else {
            setSelectedMonths([...months]);
            setSelectAll(true);
        }
    };

    const handleFeeItemToggle = (itemName) => {
        if (selectedFeeItems.includes(itemName)) {
            setSelectedFeeItems(selectedFeeItems.filter(name => name !== itemName));
        } else {
            setSelectedFeeItems([...selectedFeeItems, itemName]);
        }
    };

    const calculateFees = () => {
        const totalFee = calculateTotalFee();
        const concessionAmount = (totalFee * concessionPercent) / 100;
        const netFee = totalFee + parseFloat(additionalFee) - concessionAmount;
        const newBalance = netFee - amountReceived;

        return {
            totalFee,
            concessionAmount,
            netFee,
            newBalance
        };
    };

    const fees = calculateFees();

    const getMonthAmount = (item, month) => {
        if (month === 'Apr') return item.apr;
        if (month === 'May') return item.may;
        if (month === 'Jun') return item.jun;
        return 0;
    };

    const getItemTotal = (item) => {
        if (item.isRecurring) {
            return item.apr * selectedMonths.length;
        } else {
            return selectedMonths.includes('Apr') ? item.apr : 0;
        }
    };

    return (
        <Layout>
        <div className="min-h-screen  p-6">
            <div className="max-w-7xl mx-auto  rounded-lg ">

                {/* Student Basic Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Student Photo */}
                        <div className="lg:w-1/4">
                            <div className="bg-gray-200 rounded-lg w-48 h-48 mx-auto lg:mx-0 flex items-center justify-center">
                                <FaUser className="text-6xl text-gray-400" />
                            </div>
                            <div className="text-center lg:text-left mt-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium `}>
                                    Male
                                </span>
                            </div>
                        </div>

                        {/* Basic information  */}
                        <div className="lg:w-3/4">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: 'Full Name', value: 'Rajesh Kumar' },
                                    { label: 'Course Name', value: '12th' },
                                    { label: 'Registration Number', value: '1002445' },
                                    { label: 'Session', value: '2024-25' },
                                    { label: 'Date of Birth', value: '10 October 2018' },
                                    { label: 'Mobile Number', value: '9554833028' },
                                    { label: 'Father\'s Name', value: 'RAJESH KUMAR' },
                                    { label: 'Mother\'s Details', value: 'Priya' }
                                ].map((field, index) => (
                                    <div key={index}>
                                        <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                                        <p className="text-lg font-semibold text-gray-800">{field.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white shadow-md rounded-2xl">
                    {/* Month Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Month Selection</label>
                        <div className="flex flex-wrap gap-3">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Select All</span>
                            </label>
                            {months.map((month) => (
                                <label key={month} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectedMonths.includes(month)}
                                        onChange={() => handleMonthToggle(month)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">{month}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Fee Item Table */}
                    <div className="mb-6 overflow-x-auto">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 p-3 text-left font-medium text-gray-700">ITEM</th>
                                    {selectedMonths.map(month => (
                                        <th key={month} className="border border-gray-300 p-3 text-center font-medium text-gray-700">{month}</th>
                                    ))}
                                    <th className="border border-gray-300 p-3 text-center font-medium text-gray-700">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeItems.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="border border-gray-300 p-3 font-medium text-gray-700">{item.name}</td>
                                        {selectedMonths.map(month => (
                                            <td key={month} className="border border-gray-300 p-3 text-center text-gray-600">
                                                {getMonthAmount(item, month)}
                                            </td>
                                        ))}
                                        <td className="border border-gray-300 p-3 text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFeeItems.includes(item.name)}
                                                    onChange={() => handleFeeItemToggle(item.name)}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                <span className="font-semibold text-gray-800">{getItemTotal(item)}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-100 font-bold">
                                    <td className="border border-gray-300 p-3 text-gray-800">Total</td>
                                    {selectedMonths.map(month => (
                                        <td key={month} className="border border-gray-300 p-3 text-center text-gray-800">
                                            {feeItems.reduce((sum, item) => sum + getMonthAmount(item, month), 0)}
                                        </td>
                                    ))}
                                    <td className="border border-gray-300 p-3 text-center text-gray-800 bg-gray-200">
                                        {fees.totalFee}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Fee Summary and Payment Fields */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Fee</label>
                                <input
                                    type="number"
                                    value={fees.totalFee}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Fee</label>
                                <input
                                    type="number"
                                    value={additionalFee}
                                    onChange={(e) => setAdditionalFee(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Concession (%)</label>
                                <input
                                    type="number"
                                    value={concessionPercent}
                                    onChange={(e) => setConcessionPercent(parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Concession Amt</label>
                                <input
                                    type="number"
                                    value={fees.concessionAmount}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Net Fee</label>
                                <input
                                    type="number"
                                    value={fees.netFee}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                                <input
                                    type="number"
                                    value={amountReceived}
                                    onChange={(e) => setAmountReceived(Math.min(parseFloat(e.target.value) || 0, fees.netFee))}
                                    className="w-full px-3 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50 text-green-800 font-semibold"
                                    placeholder="0"
                                    max={fees.netFee}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Balance</label>
                                <input
                                    type="number"
                                    value={fees.newBalance}
                                    className="w-full px-3 py-2 border border-red-500 rounded focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50 text-red-600 font-semibold"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Details and Communication Options */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                                <input
                                    type="text"
                                    value={paymentMode}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Cash/Cheque/Online"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <input
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Bank name"
                                />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cheque / DD No.</label>
                                <input
                                    type="text"
                                    value={chequeNumber}
                                    onChange={(e) => setChequeNumber(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Cheque number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cheque Date</label>
                                <input
                                    type="date"
                                    value={chequeDate}
                                    onChange={(e) => setChequeDate(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remark</label>
                        <input
                            type="text"
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Additional remarks"
                        />
                    </div>

                    {/* Communication Options */}
                    <div className="flex space-x-6 mb-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={sendSMS}
                                onChange={(e) => setSendSMS(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Send SMS</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={sendWhatsApp}
                                onChange={(e) => setSendWhatsApp(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Send WhatsApp</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default FeeReceiptPage;