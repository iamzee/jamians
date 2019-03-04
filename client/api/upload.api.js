import axios from 'axios';

export const getSignedUrl = () => {
  return axios ({
    method: 'get',
    url: '/api/upload/notes',
  }).then (({data}) => {
    return data;
  });
};

export const upload = (url, file) => {
  return axios ({
    method: 'put',
    url,
    data: file,
    headers: {
      'Content-Type': file.type,
    },
  })
    .then (response => {
      return response;
    })
    .catch (err => {
      console.log (err);
    });
};
