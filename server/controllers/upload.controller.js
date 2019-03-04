import config from '../../config/config';
import AWS from 'aws-sdk';
import uuid from 'uuid/v1';

const s3 = new AWS.S3 ({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  signatureVersion: 'v4',
  region: 'ap-south-1',
});

const uploadNotes = (req, res) => {
  const key = `notes/${uuid ()}.pdf`;
  s3.getSignedUrl (
    'putObject',
    {
      Bucket: 'jamians-dev',
      Key: key,
      ContentType: 'application/pdf',
    },
    (err, url) => {
      if (err) {
        return res.status (400).json ({
          err,
          errorMessage: 'Unable to get presigned URL',
        });
      }

      res.status (200).json ({
        url,
        key,
      });
    }
  );
};

export default {
  uploadNotes,
};
