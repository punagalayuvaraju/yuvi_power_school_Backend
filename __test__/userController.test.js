const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/v1/userRoute");

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

let mongoServer;

jest.setTimeout(30000); // Increase timeout to 30 seconds

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User API", () => {
  let userId;
  const userCredentials = {
    emailId: "test@example.com",
    password: "password123",
  };

  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Test User",
      emailId: userCredentials.emailId,
      password: userCredentials.password,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    userId = res.body._id;
  });

  it("should not create a user with duplicate email", async () => {
    const res = await request(app).post("/api/users").send({
      name: "Duplicate User",
      emailId: userCredentials.emailId,
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Email already exists");
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send(userCredentials);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("emailId", userCredentials.emailId);
  });

  it("should not login with invalid credentials", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ emailId: "wrong@example.com", password: "wrongpassword" });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("error", "Invalid email or password");
  });
});
