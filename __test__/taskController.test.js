const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("../routes/v1/taskRoute");
const userRoutes = require("../routes/v1/userRoute");
const app = express();
app.use(bodyParser.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes); // To create a user for testing

jest.setTimeout(30000); // Increase timeout to 30 seconds

let mongoServer;

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

describe("Task API", () => {
  let userId;
  let taskId;

  beforeAll(async () => {
    // Create a user to associate with tasks
    const res = await request(app).post("/api/users").send({
      name: "Test User",
      emailId: "testuser@example.com",
      password: "password123",
    });
    userId = res.body._id;
  });

  it("should create a new task", async () => {
    const res = await request(app).post("/api/tasks").send({
      title: "Test Task",
      dueDate: "2024-07-11T09:00:00.000Z",
      status: "Scheduled",
      userId: userId,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    taskId = res.body._id;
  });

  it("should get all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a task", async () => {
    const res = await request(app).put(`/api/tasks/${taskId}`).send({
      title: "Updated Task",
      dueDate: "2024-07-12T09:00:00.000Z",
      status: "Completed",
      userId: userId,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Updated Task");
  });

  it("should delete a task", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);
  });

  it("should return error if task not found for delete", async () => {
    const res = await request(app).delete(
      `/api/tasks/${new mongoose.Types.ObjectId()}`
    );
    expect(res.statusCode).toEqual(400);
  });
});
