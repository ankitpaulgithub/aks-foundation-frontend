import ApexChart from '@/components/ApexChart'
import React from 'react'

const BottomChartSection = ({ programStats = [], stateStats = [], monthlyTrend = [] }) => {
  // Get program data for chart
  const getProgramChartData = () => {
    if (!programStats?.length) return [1];
    return programStats.map(p => p.count);
  };

  // Get state data for chart
  const getStateChartData = () => {
    if (!stateStats?.length) return [1];
    return stateStats.map(s => s.count);
  };

  // Get monthly trend data for chart
  const getMonthlyTrendData = () => {
    if (!monthlyTrend?.length) return [1];
    return monthlyTrend.map(m => m.count);
  };

  // Calculate totals
  const totalByProgram = programStats?.reduce((sum, p) => sum + p.count, 0) || 0;
  const totalByState = stateStats?.reduce((sum, s) => sum + s.count, 0) || 0;
  const totalMonthly = monthlyTrend?.reduce((sum, m) => sum + m.count, 0) || 0;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        {/* Students by Program */}
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>By Program</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>{totalByProgram}</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart series={getProgramChartData()} />
          </div>
          {/* Legend */}
          {programStats?.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 max-h-24 overflow-y-auto">
              {programStats.slice(0, 6).map((prog, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {prog.program}: {prog.count}
                </span>
              ))}
              {programStats.length > 6 && (
                <span className="text-xs text-gray-500">+{programStats.length - 6} more</span>
              )}
            </div>
          )}
        </div>
        
        {/* Students by State */}
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>By State (Top 10)</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>{totalByState}</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart series={getStateChartData()} />
          </div>
          {/* Legend */}
          {stateStats?.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2 max-h-24 overflow-y-auto">
              {stateStats.map((state, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {state.state}: {state.count}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Monthly Trend */}
        <div className='flex flex-col items-center p-4 rounded shadow bg-white sm:col-span-2 xl:col-span-1'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Last 6 Months</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>{totalMonthly}</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart series={getMonthlyTrendData()} />
          </div>
          {/* Legend */}
          {monthlyTrend?.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {monthlyTrend.map((month, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {month.month}: {month.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
  )
}

export default BottomChartSection