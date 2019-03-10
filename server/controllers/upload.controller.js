import config from '../../config/config';
import azure from 'azure-storage';

export const generateSAS = (req, res) => {
  const blobService = azure.createBlobService (
    config.AZURE_STORAGE_CONNECTION_STRING
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
    'notes',
    null,
    sharedAccessPolicy
  );

  res.json ({
    sasToken,
  });
};
