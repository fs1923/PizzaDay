import { AWS } from 'meteor/peerlibrary:aws-sdk';


AWS.config.update({
  accessKeyId: 'AKIAI5L3PMSSF5UAVFUA',
  secretAccessKey: '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',
});

STS = new AWS.STS();

S3 = new AWS.S3();