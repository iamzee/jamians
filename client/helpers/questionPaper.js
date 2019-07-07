import moment from 'moment';

export const years = [
  {
    label: moment ().subtract (5, 'y').format ('YYYY'),
    value: moment ().subtract (5, 'y').format ('YYYY'),
  },
  {
    label: moment ().subtract (4, 'y').format ('YYYY'),
    value: moment ().subtract (4, 'y').format ('YYYY'),
  },
  {
    label: moment ().subtract (3, 'y').format ('YYYY'),
    value: moment ().subtract (3, 'y').format ('YYYY'),
  },
  {
    label: moment ().subtract (2, 'y').format ('YYYY'),
    value: moment ().subtract (2, 'y').format ('YYYY'),
  },
  {
    label: moment ().subtract (1, 'y').format ('YYYY'),
    value: moment ().subtract (1, 'y').format ('YYYY'),
  },
  {
    label: moment ().format ('YYYY'),
    value: moment ().format ('YYYY'),
  },
];
