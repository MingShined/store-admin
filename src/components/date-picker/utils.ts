import moment from 'moment';

export const formatDate = (
  date,
  showTime: boolean = true,
  range: boolean = false,
  time: boolean = false
) => {
  if (time) {
    return moment(date).format('HH:mm:ss');
  }
  if (!date && !range) {
    return null;
  }
  if (date.length === 0 && range) {
    return [];
  }
  if (showTime && !range) {
    return moment(date).format('YYYY-MM-DDTHH:mm:ssZ');
  }
  if (!showTime && !range) {
    return moment(date).format('YYYY-MM-DDT00:00:00Z');
  }
  if (showTime && range) {
    return date.map(item => moment(item).format('YYYY-MM-DDTHH:mm:ssZ'));
  }
  if (!showTime && range) {
    return [
      moment(date[0]).format('YYYY-MM-DDT00:00:00Z'),
      moment(date[1]).format('YYYY-MM-DDT23:59:59Z')
    ];
  }
};

export const getInitValue = (type: string, value: any, timeFormat: string) => {
  let result = null;
  switch (type) {
    case 'date':
      result = value ? moment(value) : null;
      break;
    case 'range':
      result = value && value.length > 0 ? value.map(item => moment(item)) : [];
      break;
    case 'time':
      result = value ? moment(value, timeFormat) : null;
      break;
    default:
      break;
  }
  return result;
};
