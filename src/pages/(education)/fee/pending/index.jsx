import React, { useState } from 'react';
import CommonTable from '../../../../components/CommonTable';
import Layout from '../../../../components/education/Layout';

const FeePending = () => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedMonths, setSelectedMonths] = useState(['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']);

  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Sample student data with fee status for each month
  const studentData = [
    {
      id: 31,
      name: 'santosh',
      fatherName: 'Santosh Kumar',
      mobile: '6377077450',
      balance: 0,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Paid', amount: 0 },
        Jun: { status: 'Paid', amount: 0 },
        Jul: { status: 'Paid', amount: 0 },
        Aug: { status: 'Paid', amount: 0 },
        Sep: { status: 'Paid', amount: 0 },
        Oct: { status: 'Paid', amount: 0 },
        Jan: { status: 'Paid', amount: 0 }
      },
      total: 750
    },
    {
      id: 97,
      name: 'rekha yadav',
      fatherName: 'Rekha Yadav',
      mobile: '9984706486',
      balance: 950,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Paid', amount: 0 },
        Jun: { status: 'Paid', amount: 0 },
        Jul: { status: 'Pending', amount: 300 },
        Aug: { status: 'Pending', amount: 300 },
        Sep: { status: 'Pending', amount: 300 },
        Oct: { status: 'Pending', amount: 300 },
        Jan: { status: 'Pending', amount: 300 }
      },
      total: 3050
    },
    {
      id: 119,
      name: 'SHIV Gopal',
      fatherName: 'Shiv Gopal',
      mobile: '9021437900',
      balance: 0,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Pending', amount: 1500 },
        Jun: { status: 'Pending', amount: 1500 },
        Jul: { status: 'Pending', amount: 1500 },
        Aug: { status: 'Pending', amount: 1500 },
        Sep: { status: 'Pending', amount: 1500 },
        Oct: { status: 'Pending', amount: 1500 },
        Jan: { status: 'Pending', amount: 1500 }
      },
      total: 13500
    },
    {
      id: 125,
      name: 'jkjkdsfg',
      fatherName: 'JK JKDSFG',
      mobile: '7877273414',
      balance: 0,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Pending', amount: 300 },
        Jun: { status: 'Pending', amount: 300 },
        Jul: { status: 'Pending', amount: 300 },
        Aug: { status: 'Pending', amount: 300 },
        Sep: { status: 'Pending', amount: 300 },
        Oct: { status: 'Pending', amount: 300 },
        Jan: { status: 'Pending', amount: 300 }
      },
      total: 2700
    },
    {
      id: 126,
      name: 'ajsdf',
      fatherName: 'AJSDF',
      mobile: '7877273414',
      balance: 0,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Pending', amount: 300 },
        Jun: { status: 'Pending', amount: 300 },
        Jul: { status: 'Pending', amount: 300 },
        Aug: { status: 'Pending', amount: 300 },
        Sep: { status: 'Pending', amount: 300 },
        Oct: { status: 'Pending', amount: 300 },
        Jan: { status: 'Pending', amount: 300 }
      },
      total: 2700
    },
    {
      id: 166,
      name: 'RUDAL',
      fatherName: 'Rudal Kumar',
      mobile: '9812084707',
      balance: 500,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Paid', amount: 0 },
        Jun: { status: 'Pending', amount: 300 },
        Jul: { status: 'Pending', amount: 300 },
        Aug: { status: 'Pending', amount: 300 },
        Sep: { status: 'Pending', amount: 300 },
        Oct: { status: 'Pending', amount: 300 },
        Jan: { status: 'Pending', amount: 300 }
      },
      total: 2900
    },
    {
      id: 167,
      name: 'Raju',
      fatherName: 'Raju Kumar',
      mobile: '9503411155',
      balance: 0,
      months: {
        Apr: { status: 'Paid', amount: 0 },
        May: { status: 'Paid', amount: 0 },
        Jun: { status: 'Pending', amount: 1500 },
        Jul: { status: 'Pending', amount: 1500 },
        Aug: { status: 'Pending', amount: 1500 },
        Sep: { status: 'Pending', amount: 1500 },
        Oct: { status: 'Pending', amount: 1500 },
        Jan: { status: 'Pending', amount: 1500 }
      },
      total: 10500
    }
  ];

  // Table headers configuration - dynamic based on selected months
  const getHeaders = () => {
    const baseHeaders = [
      { key: 'sr', label: 'Sr.', sortable: false },
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'fatherName', label: 'Father Name', sortable: true },
      { key: 'mobile', label: 'Mobile', sortable: true },
      { key: 'balance', label: 'Balance', sortable: true }
    ];

    // Add month headers for selected months
    const monthHeaders = selectedMonths.map(month => ({
      key: month,
      label: month,
      sortable: false
    }));

    // Add total header
    const totalHeader = { key: 'total', label: 'Total / SMS', sortable: true };

    return [...baseHeaders, ...monthHeaders, totalHeader];
  };

  // Sample row design - reusable table row component
  const SampleRow = ({ data, index }) => (
    <>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {index + 1}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.id}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {data.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.fatherName}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.mobile}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.balance}
      </td>
      {selectedMonths.map(month => {
        const monthData = data.months[month] || { status: 'N/A', amount: 0 };
        return (
          <td key={month} className="px-4 py-3 text-sm text-center">
            {monthData.status === 'Paid' ? (
              <span className="text-green-600 font-medium">Paid</span>
            ) : monthData.status === 'Pending' ? (
              <span className="text-red-600 font-medium">{monthData.amount}</span>
            ) : (
              <span className="text-gray-400">-</span>
            )}
          </td>
        );
      })}
      <td className="px-4 py-3 text-sm text-center">
        <div className="flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="font-semibold text-gray-800">{data.total}</span>
        </div>
      </td>
    </>
  );

  // Handle sorting
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Sort data
  const sortedData = [...studentData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn] || '';
    const bValue = b[sortColumn] || '';
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Class List - Pending Amount</h1>
          
          {/* Month Selection */}
          <div className="mt-4 flex flex-wrap gap-3">
            {months.map((month) => (
              <label key={month} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMonths.includes(month)}
                  onChange={() => {
                    if (selectedMonths.includes(month)) {
                      setSelectedMonths(selectedMonths.filter(m => m !== month));
                    } else {
                      setSelectedMonths([...selectedMonths, month]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{month}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Table */}
        <CommonTable
          headers={getHeaders()}
          data={sortedData}
          sampleRow={<SampleRow />}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          className="w-full"
        />
      </div>
    </Layout>
  );
};

export default FeePending;