import { createWriteStream } from "fs";

const random = (length = 8) => {
	let chars = "abcdefghijklmnopqrstuvwxyz";
	let str = "";
	for (let i = 0; i < length; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return str;
};

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const stream = createWriteStream("data.csv");
for (let i = 0; i < 5000000; i++) {
	const email = `${random(getRndInteger(5, 10))}@${random(getRndInteger(3, 15))}.com`;
	const fName = capitalize(random(getRndInteger(5, 15)));
	const lName = capitalize(random(getRndInteger(5, 15)));
	stream.write(`${email},${fName},${lName}` + "\r\n");
}
stream.end();
