// https://transang.me/modern-fetch-and-how-to-get-buffer-output-from-aws-sdk-v3-getobjectcommand/
// https://towardsdatascience.com/efficiently-streaming-a-large-aws-s3-file-via-s3-select-85f7fbe22e46
import { Readable } from "stream";
import * as readline from "readline";
import { S3Client, SelectObjectContentCommand } from "@aws-sdk/client-s3";

// Create stream processor
const readableStream = new Readable({ read() {} });
const rlConfig = { input: readableStream, output: process.stdout };
const rl = readline.createInterface(rlConfig);
rl.on("line", (l) => {
	console.log(l);
});

// Get AWS stream
const client = new S3Client({ region: "us-west-1" });
const input = {
	Bucket: "wf-test-1",
	Key: "data.csv",
	Expression: "SELECT * FROM S3Object",
	ExpressionType: "SQL",
	InputSerialization: { CSV: { FileHeaderInfo: "NONE", FieldDelimiter: ",", RecordDelimiter: "\r\n" } },
	OutputSerialization: { JSON: {} },
};
const command = new SelectObjectContentCommand(input);
const response = await client.send(command);

// Push stream to processor
for await (const x of response.Payload) {
	if (x.Records) {
		const chunk = Buffer.from(x.Records.Payload);
		readableStream.push(chunk);
	}
}
