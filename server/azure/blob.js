import azure from 'azure-storage';

let blobService = azure.createBlobService();

export const upload = (containerName, blobName, blobPath) => {
  return new Promise((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile(
      containerName,
      blobName,
      blobPath,
      function(err, result, response) {
        if (!err) {
          resolve();
        }
        console.log(err);
        reject(err);
      }
    );
  });
};

export const download = (container, blob, path) => {
  return new Promise((resolve, reject) => {
    blobService.getBlobToLocalFile(
      container,
      blob,
      `${path}/${blob}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        console.log('RESULT', result);
        resolve(result);
      }
    );
  });
};

export const deleteBlob = (container, blob) => {
  return new Promise((resolve, reject) => {
    blobService.deleteBlobIfExists(container, blob, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('RESULT', result);
      resolve(result);
    });
  });
};
