const { messageOf } = require("./action");

test("messageOf", async () => {
  const msg = await messageOf("a0f20010acd6619e621ab363394376da7f33d6c6");
  expect(msg).toEqual("works");
});
