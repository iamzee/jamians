import azure from 'azure-storage';

let blobService = azure.createBlobService ();

export const upload = (containerName, blobName, blobPath) => {
  return new Promise ((resolve, reject) => {
    blobService.createBlockBlobFromLocalFile (
      containerName,
      blobName,
      blobPath,
      function (err, result, response) {
        if (!err) {
          resolve ();
        }
        console.log (err);
        reject (err);
      }
    );
  });
};
