import React from 'react';
import { Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';

interface FinancialDataTableProps {
  data: any[];
  visibleColumns: string[];
}

export default function FinancialDataTable({ data, visibleColumns }: FinancialDataTableProps) {
  // Helper function to check if value is a float and format it
  const formatNumber = (value: any) => {
    if (typeof value === 'number') {
      return Number(value).toLocaleString();
    }
    return value;
  };

  const formatCurrency = (value: any) => {
    if (typeof value === 'number') {
      return (
        <span className="font-medium text-white">
          £{Math.abs(value).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          })}
        </span>
      );
    }
    return value;
  };

  // Static column definitions
  const allColumns = [
    { 
      title: 'Age', 
      dataIndex: 'age', 
      key: 'age', 
      render: formatNumber, 
      fixed: 'left' as const,
      width: 80,
      className: 'font-medium text-white'
    },
    { 
      title: 'Starting Value', 
      dataIndex: 'starting_value', 
      key: 'starting_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.starting_value - b.starting_value,
    },
    { 
      title: 'Pension Starting Value', 
      dataIndex: 'pension_starting_value', 
      key: 'pension_starting_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.pension_starting_value - b.pension_starting_value,
    },
    { 
      title: 'ISA Starting Value', 
      dataIndex: 'isa_starting_value', 
      key: 'isa_starting_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.isa_starting_value - b.isa_starting_value,
    },
    { 
      title: 'GIA Starting Value', 
      dataIndex: 'gia_starting_value', 
      key: 'gia_starting_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.gia_starting_value - b.gia_starting_value,
    },
    { 
      title: 'Total Money Out', 
      dataIndex: 'total_money_out', 
      key: 'total_money_out', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.total_money_out - b.total_money_out,
    },
    { 
      title: 'ISA Money Out', 
      dataIndex: 'isa_money_out', 
      key: 'isa_money_out', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.isa_money_out - b.isa_money_out,
    },
    { 
      title: 'Pension Money Out', 
      dataIndex: 'pension_money_out', 
      key: 'pension_money_out', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.pension_money_out - b.pension_money_out,
    },
    { 
      title: 'GIA Money Out', 
      dataIndex: 'gia_money_out', 
      key: 'gia_money_out', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.gia_money_out - b.gia_money_out,
    },
    { 
      title: 'General Growth', 
      dataIndex: 'general_growth', 
      key: 'general_growth', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.general_growth - b.general_growth,
    },
    { 
      title: 'Pension Confirmed Money In', 
      dataIndex: 'pension_confirmed_money_in', 
      key: 'pension_confirmed_money_in', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.pension_confirmed_money_in - b.pension_confirmed_money_in,
    },
    { 
      title: 'Total Accumulation Money In', 
      dataIndex: 'total_accumulation_money_in', 
      key: 'total_accumulation_money_in', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.total_accumulation_money_in - b.total_accumulation_money_in,
    },
    { 
      title: 'ISA Contribution', 
      dataIndex: 'isa_contribution', 
      key: 'isa_contribution', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.isa_contribution - b.isa_contribution,
    },
    { 
      title: 'ISA Ending Value', 
      dataIndex: 'isa_ending_value', 
      key: 'isa_ending_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.isa_ending_value - b.isa_ending_value,
    },
    { 
      title: 'Pension Money In', 
      dataIndex: 'pension_money_in', 
      key: 'pension_money_in', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.pension_money_in - b.pension_money_in,
    },
    { 
      title: 'Pension Ending Value', 
      dataIndex: 'pension_ending_value', 
      key: 'pension_ending_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.pension_ending_value - b.pension_ending_value,
    },
    { 
      title: 'GIA Contribution', 
      dataIndex: 'gia_contribution', 
      key: 'gia_contribution', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.gia_contribution - b.gia_contribution,
    },
    { 
      title: 'GIA Ending Value', 
      dataIndex: 'gia_ending_value', 
      key: 'gia_ending_value', 
      render: formatCurrency,
      sorter: (a: any, b: any) => a.gia_ending_value - b.gia_ending_value,
    },
    { 
      title: 'Decumulation Achieved', 
      dataIndex: 'decumulation_achieved_successfully', 
      key: 'decumulation_achieved_successfully',
      width: 180,
      render: (value: boolean) => (
        <Tag color={value ? '#297739' : '#8C1D29'} className="border-0 px-3 py-1 rounded-full text-white font-medium">
          {value ? 'Achieved' : 'Not Achieved'}
        </Tag>
      ),
      filters: [
        { text: 'Achieved', value: true },
        { text: 'Not Achieved', value: false },
      ],
      onFilter: (value: boolean | string, record: any) => record.decumulation_achieved_successfully === value,
    },
    { 
      title: 'Total Ending Value', 
      dataIndex: 'total_ending_value', 
      key: 'total_ending_value', 
      render: formatCurrency, 
      fixed: 'right' as const,
      width: 150,
      sorter: (a: any, b: any) => a.total_ending_value - b.total_ending_value,
    },
  ];

  // Filter columns based on visibility
  const columns = allColumns.filter(col => 
    visibleColumns.includes(col.key)
  );

  // Add tooltip to column headers for better UX
  const columnsWithTooltips = columns.map(col => ({
    ...col,
    title: <Tooltip title={`Click to sort by ${col.title}`}><span className="font-medium">{col.title}</span></Tooltip>
  }));

  // Add custom row class based on age being retirement age (assumed to be age 65 for this example)
  const rowClassName = (record: any) => {
    return record.age === 65 ? 'retirement-age-row' : '';
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-[#404968]">
      <style>
        {`
          .ant-table,
          .ant-table-content,
          .ant-table-container {
            background-color: #150107 !important;
            border-radius: 0.5rem;
          }
          
          .ant-table-wrapper .ant-table {
            border-radius: 0.5rem;
            overflow: hidden;
          }
          
          .ant-table-thead > tr > th {
            background-color: #5A0022 !important;
            color: white !important;
            font-weight: 600 !important;
            border-bottom: none !important;
            padding: 16px 16px !important;
            height: 64px !important;
          }
          
          .ant-table-tbody > tr > td {
            background-color: #150107 !important;
            color: white !important;
            border-bottom: 1px solid #404968 !important;
            padding: 16px 16px !important;
            font-size: 0.9rem;
            font-weight: 500;
            height: 60px !important;
          }
          
          .ant-table-tbody > tr:last-child > td {
            border-bottom: none !important;
          }
          
          .ant-table-tbody > tr:hover > td {
            background-color: #2a0a18 !important;
          }
          
          .ant-table-cell {
            border-right: none !important;
          }
          
          .ant-table-thead > tr > th {
            border-right: none !important;
          }
          
          .ant-table-thead > tr > th:last-child,
          .ant-table-tbody > tr > td:last-child {
            border-right: none !important;
          }
          
          .ant-table-thead > tr > th:first-child,
          .ant-table-tbody > tr > td:first-child {
            border-left: none !important;
          }
          
          .ant-table-placeholder {
            background-color: #150107 !important;
            color: white !important;
            padding: 24px !important;
          }
          
          .ant-pagination {
            color: white !important;
          }
          
          .ant-table-pagination {
            background-color: #150107 !important;
            color: white !important;
            margin: 0 !important;
            padding: 16px !important;
          }
          
          .ant-pagination-item {
            background-color: #2a0a18 !important;
            border-color: #404968 !important;
          }
          
          .ant-pagination-item a {
            color: white !important;
            font-weight: 500;
          }
          
          .ant-pagination-item-active {
            background-color: #5A0022 !important;
            border-color: #FF0060 !important;
          }
          
          .ant-pagination-item-active a {
            color: white !important;
          }
          
          .ant-pagination-prev button,
          .ant-pagination-next button {
            color: white !important;
          }
          
          .ant-select-selector {
            background-color: #2a0a18 !important;
            color: white !important;
            border-color: #404968 !important;
            font-weight: 500;
          }
          
          .ant-select-arrow {
            color: white !important;
          }
          
          .retirement-age-row td {
            background-color: #310312 !important;
            position: relative;
          }
          
          .retirement-age-row:hover td {
            background-color: #3e0c16 !important;
          }
        `}
      </style>
      <Table
        columns={columnsWithTooltips}
        dataSource={data}
        rowKey={(record, index) => index?.toString() || ''}
        scroll={{ x: 'max-content' }}
        size="middle"
        pagination={{ 
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '25', '50'],
          showTotal: (total) => `Page 1 of ${Math.ceil(total/10)}`
        }}
        bordered={false}
        rowClassName={rowClassName}
        sticky={true}
      />
      <div style={{ height: 24 }} />
    </div>
  );
} 