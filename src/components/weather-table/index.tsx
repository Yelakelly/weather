import { Space, Table } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SwapOutlined,
  FireOutlined,
  CloudOutlined,
  FlagOutlined,
  DashboardOutlined,
  LineChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { WeatherForecastDay } from 'types/forecast';
import { IColumns } from 'types/table';

interface WeatherColumn extends WeatherForecastDay {
  date: string;
}

interface Props {
  data: WeatherColumn[];
}

export function WeatherTable({ data }: Props) {
  const columns: IColumns<WeatherColumn> = [
    {
      title: (
        <Space>
          <ArrowDownOutlined style={{ fontSize: '10px' }} />
          Мин. температура:
        </Space>
      ),
      dataIndex: 'temp_min',
      key: 'temp_min',
      render: value => <span>{value} °C</span>,
    },
    {
      title: (
        <Space>
          <ArrowUpOutlined style={{ fontSize: '10px' }} />
          Макс. температура:
        </Space>
      ),
      dataIndex: 'temp_max',
      key: 'maxTemp',
      render: value => <span>{value} °C</span>,
    },
    {
      title: (
        <Space>
          <SwapOutlined style={{ fontSize: '10px' }} />
          Средняя температура:
        </Space>
      ),
      dataIndex: 'temp_avg',
      key: 'avgTemp',
      render: value => <span>{value} °C</span>,
    },
    {
      title: (
        <Space>
          <FireOutlined style={{ fontSize: '10px' }} />
          Температура (ощущается):
        </Space>
      ),
      dataIndex: 'feels_like',
      key: 'feelsLikeTemp',
      render: value => <span>{value} °C</span>,
    },
    {
      title: (
        <Space>
          <CalendarOutlined style={{ fontSize: '10px' }} />
          Дата:
        </Space>
      ),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: (
        <Space>
          <CloudOutlined style={{ fontSize: '10px' }} />
          Описание:
        </Space>
      ),
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: (
        <Space>
          <FlagOutlined style={{ fontSize: '10px' }} />
          Скорость ветра:
        </Space>
      ),
      dataIndex: 'wind_speed',
      key: 'wind_speed',
      render: windSpeed => <span>{windSpeed} м/с</span>,
    },
    {
      title: (
        <Space>
          <DashboardOutlined style={{ fontSize: '10px' }} />
          Атмосферное давление:
        </Space>
      ),
      dataIndex: 'pressure_mm',
      key: 'pressure_mm',
      render: pressure => <span>{pressure} мм рт.ст.</span>,
    },
    {
      title: (
        <Space>
          <LineChartOutlined style={{ fontSize: '10px' }} />
          Влажность:
        </Space>
      ),
      dataIndex: 'humidity',
      key: 'humidity',
      render: (humidity: number) => `${humidity} %`,
    },
  ];

  return (
    <Table<WeatherColumn>
      rowKey={'date'}
      columns={columns}
      dataSource={data}
      scroll={{ x: 800 }}
      pagination={false}
      size="small"
    />
  );
}
