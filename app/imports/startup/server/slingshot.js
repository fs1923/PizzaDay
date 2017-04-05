import { AWS } from 'meteor/peerlibrary:aws-sdk';


AWS.config.update({
    accessKeyId: 'AKIAJS3AUYXHOA7RHE5A',
    secretAccessKey: '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',
});

STS = new AWS.STS();

S3 = new AWS.S3();
