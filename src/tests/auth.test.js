import { afterEach, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

describe("POST /signup", () => {
    beforeEach(async () => {
        await request(app).post("/api/auth/signup").send({
            username: "dummyUser",
            password: "dummyPassword",
            age: 34,
            email: "dummyemail@gmail.com",
        });
    });

    afterEach(async () => {
        await User.deleteOne({ username: "dummyUser" });
    });

    it("should reject signups with missing fields", async () => {
        const response = await request(app)
            .post("/api/auth/signup")
            .send({ username: "testuser" });
        expect(response.status).toBe(400);
    });

    it("should reject signups with short passwords", async () => {
        const response = await request(app).post("/api/auth/signup").send({
            username: "amitavrit",
            password: "1234",
            email: "avritavrit@gmail.com",
            age: 19,
        });

        expect(response.status).toBe(400);
    });

    it("should reject signups with duplicate usernames", async () => {
        const response = await request(app).post("/api/auth/signup").send({
            username: "dummyUser",
            password: "dummyPassword",
            age: 34,
            email: "dummyemail@gmail.com",
        });

        expect(response.status).toBe(409);
    });

    // it("should successfully create a user with valid data", async () => {
    //     const response = await request(app).post("/api/auth/signup").send({
    //         username: "dummyUser1",
    //         password: "dummy1Password",
    //         email: "dummy1email@gmail.com",
    //         age: 31,
    //     });

    //     expect(response.status).toBe(201);
    //     expect(response.body.success).toBe(true);
    //     expect(response.body.data.password).toBeUndefined();
    // });
});

describe("POST /login", () => {
    it("should reject logins with missing credentials", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "avrit" });

        expect(response.status).toBe(400);
    });

    it("should reject logins with invalid credentials", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "12345677" });
        expect(response.status).toBe(401);
    });

    it("should allow logins with valid credentials", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({ username: "rahul", password: "aaaaaaaa" });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.refreshToken).toBeDefined();
    });
});

describe("Protected Routes", () => {
    let userToken;
    let adminToken;

    beforeEach(async () => {
        await request(app).post("/api/auth/signup").send({
            username: "regularUser",
            password: "regularPassword",
            age: 33,
            email: "simon@gmail.com",
        });

        const userLogin = await request(app)
            .post("/api/auth/login")
            .send({ username: "regularUser", password: "regularPassword" });

        userToken = userLogin.body.token;

        const hashedPassword = await bcrypt.hash("adminPassword", 10);
        await User.create({
            username: "adminUser",
            password: hashedPassword,
            role: "admin",
            age: 34,
            email: "admin@gmail.com",
        });

        const adminLogin = await request(app)
            .post("/api/auth/login")
            .send({ username: "adminUser", password: "adminPassword" });

        adminToken = adminLogin.body.token;
    });

    afterEach(async () => {
        await User.deleteMany({
            username: { $in: ["regularUser", "adminUser"] },
        });
    });

    it("should reject requests with no token", async () => {
        const response = await request(app)
            .post("/api/users/regularUser/add-favourite")
            .send({ movieName: "kaithi" });

        expect(response.status).toBe(401);
    });

    it("should reject requests with broken/invalid tokens", async () => {
        const response = await request(app)
            .post("/api/users/regularUser/add-favourite")
            .set("Authorization", "Bearer amit")
            .send({ movieName: "kaithi" });

        expect(response.status).toBe(401);
    });

    it("should reject block non-admin users to access admin routes", async () => {
        const response = await request(app)
            .post("/api/movies/add")
            .set("Authorization", `Bearer ${userToken}`)
            .send({ movieName: "reacher", year: 2020, genre: "action" });

        expect(response.status).toBe(403);
    });

    it("should allow logged-in user to access their profile", async () => {
        const response = await request(app)
            .get("/api/users/profile")
            .set("Authorization", `Bearer ${userToken}`)
            .send();
        expect(response.status).toBe(200);
    });
});
