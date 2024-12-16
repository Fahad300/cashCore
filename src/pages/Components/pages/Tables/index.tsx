import React, { useState } from 'react';
import { Typography, Table, Tag, Space, Button, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import CodeExample from '../../../../components/common/CodeExample';
import styles from './Tables.module.scss';

const { Title, Paragraph } = Typography;

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const basicTableCode = `import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

const BasicTable = () => <Table columns={columns} dataSource={dataSource} />;`;

const sortingTableCode = `import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
];

const SortingTable = () => <Table columns={columns} dataSource={dataSource} />;`;

const filteringTableCode = `import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder="Search name"
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small">
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record.name.toLowerCase().includes(value.toLowerCase()),
  },
  // ... other columns
];`;

const Tables = () => {
    const [filteredInfo, setFilteredInfo] = useState<Record<string, FilterValue | null>>({});
    const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});

    const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter as SorterResult<DataType>);
    };

    const dataSource: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const basicColumns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string[]) => (
                <>
                    {tags.map(tag => (
                        <Tag color="blue" key={tag}>
                            {tag}
                        </Tag>
                    ))}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    const sortingColumns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address),
            sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
        },
    ];

    const filteringColumns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                { text: 'John', value: 'John' },
                { text: 'Jim', value: 'Jim' },
                { text: 'Joe', value: 'Joe' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value.toString()),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            filters: [
                { text: '32', value: 32 },
                { text: '42', value: 42 },
            ],
            filteredValue: filteredInfo.age || null,
            onFilter: (value, record) => record.age === value,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                { text: 'London', value: 'London' },
                { text: 'New York', value: 'New York' },
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value.toString()),
        },
    ];

    return (
        <div className={styles.tablesPage}>
            <Title level={2}>Tables</Title>
            <Paragraph>
                Tables display sets of data organized into rows and columns.
                They provide features like sorting, filtering, and pagination to help users
                analyze and interact with data effectively.
            </Paragraph>

            <CodeExample
                title="Basic Table"
                description="A basic table with simple data display."
                code={basicTableCode}
            >
                <Table columns={basicColumns} dataSource={dataSource} />
            </CodeExample>

            <CodeExample
                title="Sortable Table"
                description="Table with sortable columns."
                code={sortingTableCode}
            >
                <Table
                    columns={sortingColumns}
                    dataSource={dataSource}
                    onChange={handleChange}
                />
            </CodeExample>

            <CodeExample
                title="Filtering Table"
                description="Table with filtering capabilities."
                code={filteringTableCode}
            >
                <Table
                    columns={filteringColumns}
                    dataSource={dataSource}
                    onChange={handleChange}
                />
            </CodeExample>
        </div>
    );
};

export default Tables; 