import axios from 'axios';
import uuid from 'uuid/v1';

export const getSAS = () => {
  return axios ({
    method: 'get',
    url: '/generateSAS',
  }).then (({data}) => {
    return data.sasToken;
  });
};

export const upload = (sasToken, file) => {
  const blobUri = 'https://practice99.blob.core.windows.net';
  const token = `?${sasToken}`;

  const blobService = AzureStorage.Blob.createBlobServiceWithSas (
    blobUri,
    token
  );
  const containerName = 'notes';
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
