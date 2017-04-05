import { AWS } from 'meteor/peerlibrary:aws-sdk';


AWS.config.update({
    accessKeyId: 'AKIAIMOZADDZE3BZILQQ',
    secretAccessKey: '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',
});

STS = new AWS.STS();

S3 = new AWS.S3();
