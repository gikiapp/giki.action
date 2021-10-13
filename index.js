const github = require("@actions/github");
const core = require("@actions/core");
const exec = require("@actions/exec");
const API = require("@gikiapp/sdk");

async function publish(token, text) {
  const api = new API({ env: "production" });
  api.token(token);
  const res = await api.save("talks", {
    text: text,
  });
  if (res.ok) {
    core.info("message published to giki.app successfully");
  } else {
    core.warning("message published failure: " + res.status);
  }
}

async function getCommitMessage(sha) {
  const args = ["rev-list", "--format=%B", "--no-merges", "--max-count=1", sha];
  const output = await exec.getExecOutput("git", args, {});

  let message = "";
  for (const line of output.stdout.split(/\n/)) {
    if (!line.startsWith("commit ")) {
      message += line;
    }
  }

  return message;
}

// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput("token");
    const msg = await getCommitMessage(github.context.sha);
    core.info("message is " + msg);
    core.info("token is ", msg);
    publish(token, msg);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();

module.exports = {
  getCommitMessage: getCommitMessage,
};
