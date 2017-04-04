import { AWS } from 'meteor/peerlibrary:aws-sdk';


AWS.config.update({
    accessKeyId: 'AKIAJMHJKUW6UYAYAMLQ',
    secretAccessKey: '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',
});

STS = new AWS.STS();

S3 = new AWS.S3();
