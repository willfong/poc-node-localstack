# poc-node-localstack

## Set up credentials

`~/.aws/credentials`

```
[default]
aws_access_key_id = test
aws_secret_access_key = test
```

## S3

https://docs.localstack.cloud/aws/s3/

```
awslocal s3api create-bucket --bucket sample-bucket
awslocal s3api list-buckets
awslocal s3api put-object --bucket sample-bucket --key index.html --body index.html
```

## Links

- https://qubyte.codes/blog/tip-connecting-to-localstack-s3-using-the-javascript-aws-sdk-v3
