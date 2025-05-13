import React from 'react';
import { Table, Tag } from 'antd';
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
      return `£${Number(value).toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })}`;
    }
    return value;
  };

  // Static column definitions
  const allColumns = [
    { title: 'Age', dataIndex: 'age', key: 'age', render: formatNumber, fixed: 'left' as const },
    { title: 'Starting Value', dataIndex: 'starting_value', key: 'starting_value', render: formatCurrency },
    { title: 'Pension Starting Value', dataIndex: 'pension_starting_value', key: 'pension_starting_value', render: formatCurrency },
    { title: 'ISA Starting Value', dataIndex: 'isa_starting_value', key: 'isa_starting_value', render: formatCurrency },
    { title: 'GIA Starting Value', dataIndex: 'gia_starting_value', key: 'gia_starting_value', render: formatCurrency },
    { title: 'Total Money Out', dataIndex: 'total_money_out', key: 'total_money_out', render: formatCurrency },
    { title: 'ISA Money Out', dataIndex: 'isa_money_out', key: 'isa_money_out', render: formatCurrency },
    { title: 'Pension Money Out', dataIndex: 'pension_money_out', key: 'pension_money_out', render: formatCurrency },
    { title: 'GIA Money Out', dataIndex: 'gia_money_out', key: 'gia_money_out', render: formatCurrency },
    { title: 'General Growth', dataIndex: 'general_growth', key: 'general_growth', render: formatCurrency },
    { title: 'Pension Confirmed Money In', dataIndex: 'pension_confirmed_money_in', key: 'pension_confirmed_money_in', render: formatCurrency },
    { title: 'Total Accumulation Money In', dataIndex: 'total_accumulation_money_in', key: 'total_accumulation_money_in', render: formatCurrency },
    { title: 'ISA Contribution', dataIndex: 'isa_contribution', key: 'isa_contribution', render: formatCurrency },
    { title: 'ISA Ending Value', dataIndex: 'isa_ending_value', key: 'isa_ending_value', render: formatCurrency },
    { title: 'Pension Money In', dataIndex: 'pension_money_in', key: 'pension_money_in', render: formatCurrency },
    { title: 'Pension Ending Value', dataIndex: 'pension_ending_value', key: 'pension_ending_value', render: formatCurrency },
    { title: 'GIA Contribution', dataIndex: 'gia_contribution', key: 'gia_contribution', render: formatCurrency },
    { title: 'GIA Ending Value', dataIndex: 'gia_ending_value', key: 'gia_ending_value', render: formatCurrency },
    { 
      title: 'Decumulation Achieved', 
      dataIndex: 'decumulation_achieved_successfully', 
      key: 'decumulation_achieved_successfully',
      render: (value: boolean) => (
        <Tag color={value ? 'success' : 'error'}>
          {value ? 'Yes' : 'No'}
        </Tag>
      )
    },
    { title: 'Total Ending Value', dataIndex: 'total_ending_value', key: 'total_ending_value', render: formatCurrency, fixed: 'right' as const },
  ];

  // Filter columns based on visibility
  const columns = allColumns.filter(col => 
    visibleColumns.includes(col.key)
  );

  return (
    <div className="w-full">
      <style>
        {`
          .ant-table,
          .ant-table-content,
          .ant-table-container,
          .ant-table-footer {
            background-color: #30374F !important;
          }
          .ant-table-thead > tr > th {
            background-color: #5A0022 !important;
            color: white !important;
            border-bottom: none !important;
          }
          .ant-table-tbody > tr > td {
            background-color: #30374F !important;
            color: white !important;
            border-bottom: none !important;
          }
          .ant-table-tbody > tr:hover > td {
            background-color: #3a425f !important;
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
            background-color: #30374F !important;
            color: white !important;
          }
          .ant-table-pagination {
            background-color: #30374F !important;
            color: white !important;
            border-top: none !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          .ant-pagination-item a {
            color: white !important;
          }
          .ant-pagination-item-active {
            background-color: #5A0022 !important;
            border-color: #5A0022 !important;
          }
          .ant-pagination-item-active a {
            color: white !important;
          }
          .ant-select-selector {
            background-color: #30374F !important;
            color: white !important;
          }
          .ant-select-arrow {
            color: white !important;
          }
        `}
      </style>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record, index) => index?.toString() || ''}
        scroll={{ x: 'max-content' }}
        size="small"
        pagination={{ 
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: true,
          pageSizeOptions: ['10', '15', '25', '50'],
          showTotal: (total) => `Total ${total} items`
        }}
      />
      <div style={{ height: 24 }} />
    </div>
  );
} 