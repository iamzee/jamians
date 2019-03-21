import axios from 'axios';
import uuid from 'uuid/v1';

export const getSAS = containerName => {
  return axios ({
    method: 'get',
    url: '/generateSAS',
    data: JSON.stringify ({
      containerName,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then (({data}) => {
    return data.sasToken;
  });
};

export const upload = (sasToken, file, containerName) => {
  const blobUri = 'https://practice99.blob.core.windows.net';
  const token = `?${sasToken}`;

  const blobService = AzureStorage.Blob.createBlobServiceWithSas (
    blobUri,
    token
  );
  // const containerName = 'questionPapers';
  const blobName = `${uuid ()}.pdf`;

  const speedSummary = blobService.createBlockBlobFromBrowserFile (
    containerName,
    blobName,
    file,
    (err, results) => {
      if (err) {
        return console.log (err);
      }

      console.log (results);
    }
  );

  return {
    speedSummary,
    blobName,
  };
};

export const download = (sasToken, containerName, blobName) => {
  const blobUri = 'https://practice99.blob.core.windows.net';
  const token = `?${sasToken}`;

  const blobService = AzureStorage.Blob.createBlobServiceWithSas (
    blobUri,
    token
  );

  const downloadLink = blobService.getUrl (containerName, blobName);

  return downloadLink;
};
