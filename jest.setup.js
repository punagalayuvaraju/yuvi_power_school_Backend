jest.mock("crypto", () => {
  const crypto = jest.requireActual("crypto");
  return {
    ...crypto,
    randomBytes: jest.fn((size) => Buffer.alloc(size)),
  };
});
