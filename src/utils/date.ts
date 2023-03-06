import moment from 'moment';

export function formatDay(day: string) {
  const formattedDay = moment(day).format('dd. D MMMM');
  return formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
}

export function getLocalTime(timestamp: number, offset: number) {
  return moment
    .utc()
    .add(offset * 1000)
    .format('HH:mm');
}
