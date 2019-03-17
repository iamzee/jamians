import moment from 'moment';

export const years = [
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
  {
    label: moment ().add (1, 'y').format ('YYYY'),
    value: moment ().add (1, 'y').format ('YYYY'),
  },
  {
    label: moment ().add (2, 'y').format ('YYYY'),
    value: moment ().add (2, 'y').format ('YYYY'),
  },
  {
    label: moment ().add (3, 'y').format ('YYYY'),
    value: moment ().add (3, 'y').format ('YYYY'),
  },
];
