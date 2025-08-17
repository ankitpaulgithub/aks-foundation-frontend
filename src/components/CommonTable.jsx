import React from 'react'

const CommonTable = ({ 
  headers = [], 
  data = [], 
  sampleRow = null,
  className = "",
  onSort = null,
  sortColumn = null,
  sortDirection = 'asc'
}) => {
  
  const handleSort = (columnKey) => {
    if (onSort) {
      onSort(columnKey);
    }
  };

  const renderSortIcon = (columnKey) => {
    if (!onSort) return null;
    
    if (sortColumn === columnKey) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${
                    header.sortable !== false && onSort ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  onClick={() => header.sortable !== false && onSort ? handleSort(header.key) : null}
                >
                  <div className="flex items-center justify-between">
                    <span>{header.label}</span>
                    {header.sortable !== false && onSort && (
                      <span className="text-xs text-gray-400 ml-1">
                        {renderSortIcon(header.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {data.map((rowData, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
              >
                {sampleRow ? (
                  // Use the sample row design and map data to it
                  React.cloneElement(sampleRow, { 
                    data: rowData, 
                    index: rowIndex,
                    key: rowIndex 
                  })
                ) : (
                  // Fallback: render data directly if no sample row provided
                  headers.map((header, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 text-sm text-gray-900">
                      {rowData[header.key] || '-'}
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  )
}

export default CommonTable