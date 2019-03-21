import azure from 'azure-storage';

export const generateSAS = (req, res) => {
  const {containerName} = req.body;
  const blobService = azure.createBlobService (
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );

  const startDate = new Date ();
  startDate.setMinutes (startDate.getMinutes () - 5);
  const expiryDate = new Date (startDate);
  expiryDate.setMinutes (startDate.getMinutes () + 60);

  const permissions = 'rwdl';

  const sharedAccessPolicy = {
    AccessPolicy: {
      Permissions: permissions,
      Start: startDate,
      Expiry: expiryDate,
    },
  };

  const sasToken = blobService.generateSharedAccessSignature (
    containerName,
    null,
    sharedAccessPolicy
  );

  res.json ({
    sasToken,
  });
};
