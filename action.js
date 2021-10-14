const exec = require("@actions/exec");
const API = require("@gikiapp/sdk");

async function publish(token, text) {
	const api = new API({ env: "production" });
	api.token(token);
	try {
		const res = await api.save("talks", {
			text: text,
		});
		if (!res.ok) {
			throw new Error(`publish go giki.app failed: ${res.status}`);
		}
	} catch (e) {
		throw new Error(`publish go giki.app failed: ${e}`);
	}
}

async function messageOf(sha) {
	const args = ["rev-list", "--format=%B", "--no-merges", "--max-count=1", sha];
	const output = await exec.getExecOutput("git", args, {});

	return output.stdout
		.split(/\n/)
		.filter((l) => l.length != 0 && !l.startsWith("commit "))
		.join("");
}

module.exports = {
	messageOf: messageOf,
	publish: publish,
};
