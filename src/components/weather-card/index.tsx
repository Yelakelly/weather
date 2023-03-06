import { Row, Col, Typography, Space } from 'antd';
import {
  CalendarOutlined,
  CloudOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  LineChartOutlined,
  RiseOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface Props {
  data: {
    temp_min: number;
    temp_max: number;
    temp_avg: number;
    feels_like: number;
    time?: string;
    condition: string;
    wind_speed: number;
    pressure_mm: number;
    humidity: number;
    latitude: number;
    longitude: number;
  };
}

export function WeatherCard({ data }: Props) {
  return (
    <Row gutter={[24, 20]}>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <RiseOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Температура:</Typography.Text>
            <Typography.Text>{data.temp_avg} °C</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <UserOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Температура (ощущается):</Typography.Text>
            <Typography.Text>{data.feels_like} °C</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <CalendarOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Время:</Typography.Text>
            <Typography.Text>{data.time ? data.time : '-'}</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <CloudOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Описание:</Typography.Text>
            <Typography.Text>{data.condition}</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <FlagOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Скорость ветра:</Typography.Text>
            <Typography.Text>{data.wind_speed} м/с</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <DashboardOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Атмосферное давление:</Typography.Text>
            <Typography.Text>{data.pressure_mm} мм рт.ст.</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <LineChartOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Влажность:</Typography.Text>
            <Typography.Text>{data.humidity} %</Typography.Text>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Space size={15}>
          <EnvironmentOutlined style={{ fontSize: '24px' }} />
          <Space direction={'vertical'} size={0}>
            <Typography.Text strong>Широта и долгота:</Typography.Text>
            <Typography.Text>
              {data.latitude}, {data.longitude}
            </Typography.Text>
          </Space>
        </Space>
      </Col>
    </Row>
  );
}
