import React from 'react';
import { Button, Checkbox, Form, Input, List, Radio, Space, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { DeleteOutlined, EditOutlined, SelectOutlined } from '@ant-design/icons';
import {
  addPosition,
  EditablePosition,
  updatePosition,
  removePosition,
  selectPosition,
  setSelectedPosition,
  refreshPosition,
} from 'store/geoposition';
import { useAppDispatch, useAppSelector, useGetForecastData } from 'utils/hooks';
import { WeatherGeoPosition } from 'types/forecast';
import { selectPositionEditor, setUseLocation, toggleSelectMode } from 'store/position-editor';
import style from './style.module.scss';

type FormValues = {
  id: string;
  new?: boolean;
  name: string;
  coords: {
    latitude: number;
    longitude: number;
  };
};

export function PositionEditor() {
  const dispatch = useAppDispatch();
  const {
    geoLocationPosition,
    positions,
    selectedPosition,
    loading: positionLoading,
  } = useAppSelector(selectPosition);
  const { isSelectMode, useLocation } = useAppSelector(selectPositionEditor);
  const { data, isLoading } = useGetForecastData();

  const buildPosition = (position: WeatherGeoPosition) => {
    const result = [
      position?.province?.name,
      position?.district?.name,
      position?.country?.name,
    ].filter(pos => !!pos);

    return result.length ? result.join(', ') : 'Неизвестное местоположение';
  };

  const onPositionEdit = (values: FormValues) => {
    dispatch(
      updatePosition({
        ...values,
        edit: false,
        new: false,
      }),
    );
  };

  const onPositionAdd = () => {
    const { latitude, longitude } =
      useLocation && geoLocationPosition?.coords
        ? geoLocationPosition?.coords
        : {
            latitude: null,
            longitude: null,
          };

    dispatch(
      addPosition(
        {
          name: null,
          edit: true,
          coords: { latitude, longitude },
        },
        true,
      ),
    );
  };

  const onPositionEditCancel = (item: EditablePosition) =>
    dispatch(
      item.new
        ? removePosition(item.id)
        : updatePosition({
            ...item,
            edit: false,
          }),
    );
  const onPositionSelect = (item: EditablePosition) => dispatch(setSelectedPosition(item.id));
  const onPositionRemove = (item: EditablePosition) => {
    dispatch(removePosition(item.id));
    dispatch(refreshPosition());
  };

  const onUseLocationChange = (e: CheckboxChangeEvent) =>
    dispatch(setUseLocation(e.target.checked));
  const onBack = () => dispatch(toggleSelectMode());
  const onOpen = () => dispatch(toggleSelectMode());

  const renderPosition = () => {
    if (data?.geo_object) {
      return buildPosition(data.geo_object);
    }

    return 'Получение данных...';
  };

  const renderEditablePosition = (item: EditablePosition) => {
    return (
      <List.Item>
        <Form<FormValues>
          onFinish={onPositionEdit}
          style={{ margin: '10px 0 0 0' }}
          size={'small'}
          labelCol={{ offset: 0 }}
          initialValues={{
            ...item,
          }}
        >
          <Form.Item name={'id'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'new'} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={'edit'} hidden>
            <Input />
          </Form.Item>
          <Space align={'start'} style={{ overflow: 'hidden' }}>
            <div>
              <Typography.Text strong>Имя</Typography.Text>
              <Form.Item
                name={'name'}
                rules={[
                  { required: true, message: 'Обязательное поле' },
                  { max: 50, message: 'Не больше 50 символов' },
                ]}
              >
                <Input placeholder="Имя" />
              </Form.Item>
            </div>
            <div>
              <Typography.Text strong>Долгота</Typography.Text>
              <Form.Item
                name={['coords', 'latitude']}
                rules={[
                  { required: true, message: 'Обязательное поле' },
                  {
                    validator: (_, value) => {
                      if (value < -180 || value > 180) {
                        return Promise.reject(new Error('Должно быть между -180 и 180'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Долгота" type="number" step={0.000001} />
              </Form.Item>
            </div>
            <div>
              <Typography.Text strong>Широта</Typography.Text>
              <Form.Item
                name={['coords', 'longitude']}
                rules={[
                  { required: true, message: 'Обязательное поле' },
                  {
                    validator: (_, value) => {
                      if (value < -180 || value > 180) {
                        return Promise.reject(new Error('Должно быть между -180 и 180'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Широта" type="number" step={0.000001} />
              </Form.Item>
            </div>
          </Space>
          <div style={{ margin: '0 0 10px 0' }}>
            <Space>
              <Button type={'primary'} htmlType={'submit'}>
                Сохранить
              </Button>
              <Button onClick={() => onPositionEditCancel(item)}>Отмена</Button>
            </Space>
          </div>
        </Form>
      </List.Item>
    );
  };

  const renderStaticPosition = (item: EditablePosition) => (
    <List.Item>
      <Space wrap>
        <Radio checked={item.id === selectedPosition} onClick={() => onPositionSelect(item)}>
          {item.name}
        </Radio>
        <Space>
          <Button
            size={'small'}
            icon={<EditOutlined />}
            onClick={() =>
              dispatch(
                updatePosition({
                  ...item,
                  edit: true,
                }),
              )
            }
          ></Button>
          <Button
            size={'small'}
            icon={<DeleteOutlined />}
            onClick={() => onPositionRemove(item)}
          ></Button>
        </Space>
      </Space>
    </List.Item>
  );

  return (
    <>
      {isSelectMode ? (
        <>
          <div>
            <Typography.Text strong>Выбор позиции</Typography.Text>
          </div>
          <Space style={{ margin: '10px 0 20px 0' }} wrap>
            <Button type={'dashed'} size={'small'} onClick={onPositionAdd}>
              Добавить
            </Button>
            <Checkbox checked={useLocation} onChange={onUseLocationChange}>
              Использовать местоположение?
            </Checkbox>
          </Space>
          <List
            className={style.list}
            bordered
            size={'small'}
            dataSource={positions.filter(obj => !obj.default)}
            renderItem={item =>
              item.edit ? renderEditablePosition(item) : renderStaticPosition(item)
            }
          ></List>
          <div>
            <Button size={'small'} style={{ margin: '0 0 30px 0' }} onClick={onBack}>
              Назад
            </Button>
          </div>
        </>
      ) : (
        <Space size={15} style={{ padding: '0 0 15px 0' }} wrap>
          <span>
            Текущая позиция: &nbsp;
            {renderPosition()}
          </span>
          {!positionLoading && !isLoading && (
            <>
              <Button type="primary" icon={<SelectOutlined />} size="small" onClick={onOpen}>
                Заменить
              </Button>
            </>
          )}
        </Space>
      )}
    </>
  );
}
