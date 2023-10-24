import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadPostPhotoService {
  private s3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: any): Promise<string> {
    console.log('UploadProfilePhotoService: recebendo requisição de upload');
    console.log({
      key: process.env.AWS_ACCESS_KEY_ID,
      key2: process.env.AWS_SECRET_ACCESS_KEY,
      key3: process.env.AWS_REGION,
      key4: process.env.AWS_S3_BUCKET_NAME,
    });
    const key = `post-images/${Date.now()}-${file.originalname}`;
    const uploadResult = await this.s3
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Body: file.buffer,
        Key: key,
        ContentType: 'image/jpeg',
        ContentDisposition: 'inline',
      })
      .promise();

    if (!uploadResult) {
      throw new Error('Error uploading file');
    }

    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  }
}
