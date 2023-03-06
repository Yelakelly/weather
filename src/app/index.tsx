import React, { useEffect } from 'react';
import { Button, Card, Space, Tabs, TabsProps } from 'antd';
import 'dayjs/locale/ru';
import { WeatherCard } from 'components/weather-card';
import { WeatherTable } from 'components/weather-table';
import { PositionEditor } from 'components/position-editor';
import { initDefaultPosition, selectActivePosition, selectPosition } from 'store/geoposition';
import { useAppDispatch, useAppSelector, useGetForecastData } from 'utils/hooks';
import { formatDay, getLocalTime } from 'utils/date';
import 'theme/style.css';
import style from './style.module.scss';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

function App() {
  const dispatch = useAppDispatch();
  const { loading: positionLoading, error: positionError } = useAppSelector(selectPosition);
  const currentPosition = useAppSelector(selectActivePosition);

  useEffect(() => {
    dispatch(initDefaultPosition());
  }, [dispatch]);

  const { data, isLoading } = useGetForecastData();

  const dayDate = data?.forecasts[0]?.date || '';
  const time = getLocalTime(data?.forecasts[0].date_ts ?? 0, data?.info.tzinfo.offset ?? 0);
  const day = data?.forecasts[0]?.parts?.day;

  const tabs: TabsProps['items'] = React.useMemo(() => {
    if (!data?.forecasts) {
      return [];
    }

    return data.forecasts.map(obj => ({
      key: obj.date,
      label: formatDay(obj.date),
      children: day ? (
        <WeatherTable
          data={[
            {
              ...obj.parts.day,
              date: dayDate,
            },
          ]}
        />
      ) : (
        'Нет данных'
      ),
    }));
  }, [dayDate, day, data]);

  const renderErrorFallback = (error: GeolocationPositionError) => {
    const errors = {
      [error.PERMISSION_DENIED]: 'Необходимо разрешить доступ к геопозии',
      [error.POSITION_UNAVAILABLE]: 'Невозможно получить позицию',
      [error.TIMEOUT]: 'Таймаут при получении позиции',
    };
    return (
      <>
        <Space direction={'vertical'}>
          <span>{errors[error.code] ?? 'Неизвестная ошибка'}</span>
          <Button onClick={() => dispatch(initDefaultPosition())}>
            {error.code === error.PERMISSION_DENIED ? 'Предоставить доступ' : 'Попробовать еще раз'}
          </Button>
        </Space>
      </>
    );
  };

  return (
    <div className={style.app}>
      {!positionError ? (
        <>
          <PositionEditor />
          <Card title={`Погода`} loading={isLoading || positionLoading}>
            {day && (
              <WeatherCard
                data={{
                  ...day,
                  time,
                  latitude: currentPosition?.coords.latitude || 0,
                  longitude: currentPosition?.coords.longitude || 0,
                }}
              />
            )}
            <br />
            {!!tabs.length && <Tabs defaultActiveKey={tabs[0].key} items={tabs} />}
          </Card>
        </>
      ) : (
        renderErrorFallback(positionError)
      )}
    </div>
  );
}

export default App;
