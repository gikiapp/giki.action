const { messageOf, publish } = require("./action");
const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
	try {
		const token = core.getInput("token");
		const message = await messageOf(github.context.sha);
		core.info(`publish to giki.app ${message} ${token}`);
		publish(token, message);
		core.info("message published to giki.app successfully");
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
