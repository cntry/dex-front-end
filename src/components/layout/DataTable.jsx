import React from 'react';
import { ConfigProvider, Table } from 'antd';

import styled from 'styled-components';

const CustomTable = styled(Table)`
  border: 1px solid #c52626;
  border: none;
  .ant-table-tbody > tr > td {
    background: #fff;
    border-bottom: 8px solid #fff;
  }
  .ant-table-thead > tr > th {
    background: #fff;
    color: #828282;
    font-size: 10px;
    line-height: 12px;
  }
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: #fff;
  }
  .ant-table-tbody > tr.ant-table-placeholder:hover > td {
    background: #fff;
  }
`;

export default function DataTable({
  dataSource,
  columns,
  emptyLabel = 'No data',
  pagination = false,
  loading = false,
  pageSize = 10,
}) {
  const customizeRenderEmpty = () => (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2f80ed',
        backgroundColor: '#fff',
        borderColor: '#fff',
      }}
    >
      {emptyLabel}
    </div>
  );

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <CustomTable
        dataSource={dataSource}
        columns={columns}
        pagination={pagination ? { pagination: true, pageSize } : false}
        loading={loading}
        // style={{
        //   color: '#2f80ed',
        //   // backgroundColor: '#fff',
        // }}
      />
      {/* <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination ? { pagination: true, pageSize } : false}
        loading={loading}
        style={{
          color: '#2f80ed',
          // backgroundColor: '#fff',
        }}
      /> */}
    </ConfigProvider>
  );
}
