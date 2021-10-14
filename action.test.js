const { messageOf } = require("./action");

test("messageOf", async () => {
  const msg = await messageOf("2498a9f3f2a667476bb92072bc0e3fd9634572bc");
  expect(msg).toEqual("Create CODEOWNERS");
});
