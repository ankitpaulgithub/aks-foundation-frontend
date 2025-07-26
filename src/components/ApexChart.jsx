'use client'; // For Next.js App Router

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import Chart to disable SSR
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = () => {
  const options = {
    chart: {
      type: 'donut',
    },
    labels: ['', '', '', '', ''],
    // colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false,
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.1,
        }
      }
    }
  };

  const series = [6.7, 13.3, 20.0, 26.7, 33.3];

  return (
    <div className='flex w-full justify-center items-center'>
      <Chart options={options} series={series} type="donut" width="330" />
    </div>
  );
};

export default ApexChart;
