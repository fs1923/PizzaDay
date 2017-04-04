import { AWS } from 'meteor/peerlibrary:aws-sdk';


AWS.config.update({
    accessKeyId: 'AKIAIQQ4RYPFMIH754CQ',
    secretAccessKey: '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',
});

STS = new AWS.STS();

S3 = new AWS.S3();
