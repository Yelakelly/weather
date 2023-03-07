import { render, screen } from '@testing-library/react';
import { WeatherCard } from './';

const mockData = {
  temp_min: 0,
  temp_max: 10,
  temp_avg: 5,
  feels_like: 4,
  time: '2022-03-06T20:00:00.000Z',
  condition: 'Clear',
  wind_speed: 5,
  pressure_mm: 760,
  humidity: 50,
  latitude: 45,
  longitude: -73,
};

describe('WeatherCard', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders all the expected data', () => {
    render(<WeatherCard data={mockData} />);

    expect(screen.getByText('Температура:')).toBeInTheDocument();
    expect(screen.getByText('5 °C')).toBeInTheDocument();
    expect(screen.getByText('Температура (ощущается):')).toBeInTheDocument();
    expect(screen.getByText('4 °C')).toBeInTheDocument();
    expect(screen.getByText('Время:')).toBeInTheDocument();
    expect(screen.getByText('2022-03-06T20:00:00.000Z')).toBeInTheDocument();
    expect(screen.getByText('Описание:')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Скорость ветра:')).toBeInTheDocument();
    expect(screen.getByText('5 м/с')).toBeInTheDocument();
    expect(screen.getByText('Атмосферное давление:')).toBeInTheDocument();
    expect(screen.getByText('760 мм рт.ст.')).toBeInTheDocument();
    expect(screen.getByText('Влажность:')).toBeInTheDocument();
    expect(screen.getByText('50 %')).toBeInTheDocument();
    expect(screen.getByText('Широта и долгота:')).toBeInTheDocument();
    expect(screen.getByText('45, -73')).toBeInTheDocument();
  });
});
