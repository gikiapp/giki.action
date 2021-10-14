const process = require("process");
const cp = require("child_process");
const path = require("path");
const { getCommitMessage } = require("./action");

test("getCommitMessage", async () => {
  const msg = await getCommitMessage("a0f20010acd6619e621ab363394376da7f33d6c6");
  expect(msg).toEqual("works");
});

test("Runs", () => {
  process.env["INPUT_TOKEN"] = "a-fake-token";
  const ip = path.join(__dirname, "index.js");
  console.log(cp.execSync(`node ${ip}`, { env: process.env }).toString());
});
