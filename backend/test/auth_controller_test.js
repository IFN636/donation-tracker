import { expect } from "chai";
import sinon from "sinon";
import authController from "../controllers/authController.js";
import UserFactory from "../factories/UserFactory.js";
import eventSubject from "../observers/subject.js";
import { JwtUtils } from "../utils/security.js";

describe("Auth Controller", () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { body: {}, user: { id: "user123" } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("registerUser", () => {
        it("should register user successfully", async () => {
            req.body = {
                name: "John Doe",
                email: "john@example.com",
                password: "password123",
            };

            const mockUser = {
                id: "user123",
                name: "John Doe",
                email: "john@example.com",
                toObject: () => ({ id: "user123", name: "John Doe" }),
            };

            sandbox.stub(UserFactory, "create").returns({
                email: "john@example.com",
                toInsertDB: () => req.body,
            });
            sandbox
                .stub(authController._userRepository, "findByEmail")
                .resolves(null);
            sandbox
                .stub(authController._userRepository, "create")
                .resolves(mockUser);
            sandbox.stub(JwtUtils, "generateToken").returns("fake-token");
            sandbox.stub(eventSubject, "notify");

            await authController.registerUser(req, res);

            expect(res.status.calledWith(201)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    id: "user123",
                    name: "John Doe",
                    email: "john@example.com",
                    token: "fake-token",
                })
            ).to.be.true;
        });

        it("should return 400 if user already exists", async () => {
            req.body = { email: "existing@example.com" };

            sandbox
                .stub(UserFactory, "create")
                .returns({ email: "existing@example.com" });
            sandbox
                .stub(authController._userRepository, "findByEmail")
                .resolves({ id: "existing" });

            await authController.registerUser(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWithMatch({ message: "User already exists" }))
                .to.be.true;
        });
    });

    describe("loginUser", () => {
        // it("should login user successfully", async () => {
        //     req.body = { email: "john@example.com", password: "password123" };
        //     const mockUser = {
        //         id: "user123",
        //         name: "John Doe",
        //         email: "john@example.com",
        //         password: "hashed-password",
        //     };

        //     sandbox
        //         .stub(authController._userRepository, "findByEmail")
        //         .resolves(mockUser);

        //     sandbox.stub(bcrypt, "compare").resolves(true);
        //     sandbox.stub(JwtUtils, "generateToken").returns("token");

        //     await authController.loginUser(req, res);

        //     expect(
        //         res.json.calledWithMatch({
        //             id: "user123",
        //             name: "John Doe",
        //             email: "john@example.com",
        //             token: "token",
        //         })
        //     ).to.be.true;
        // });

        it("should return 401 for invalid credentials", async () => {
            req.body = { email: "wrong@example.com", password: "wrong" };

            sandbox
                .stub(authController._userRepository, "findByEmail")
                .resolves(null);

            await authController.loginUser(req, res);

            expect(res.status.calledWith(401)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    message: "Invalid email or password",
                })
            ).to.be.true;
        });
    });

    describe("getProfile", () => {
        it("should return user profile", async () => {
            const mockUser = {
                name: "John Doe",
                email: "john@example.com",
                phone: "123456789",
                address: "123 Main St",
            };

            sandbox
                .stub(authController._userRepository, "findOneById")
                .resolves(mockUser);

            await authController.getProfile(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWithMatch(mockUser)).to.be.true;
        });

        it("should return 404 if user not found", async () => {
            sandbox
                .stub(authController._userRepository, "findOneById")
                .resolves(null);

            await authController.getProfile(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWithMatch({ message: "User not found" })).to
                .be.true;
        });
    });

    describe("updateProfile", () => {
        it("should update user profile successfully", async () => {
            req.body = { name: "John Updated", phone: "987654321" };
            const mockUser = {
                id: "user123",
                name: "John Doe",
                email: "john@example.com",
                phone: "123456789",
                address: "123 Main St",
            };

            sandbox
                .stub(authController._userRepository, "findOneById")
                .resolves(mockUser);
            sandbox
                .stub(authController._userRepository, "updateOne")
                .resolves();
            sandbox.stub(JwtUtils, "generateToken").returns("new-token");

            await authController.updateProfile(req, res);

            expect(mockUser.name).to.equal("John Updated");
            expect(mockUser.phone).to.equal("987654321");
            expect(
                res.json.calledWithMatch({
                    id: "user123",
                    name: "John Updated",
                    token: "new-token",
                })
            ).to.be.true;
        });
    });
});
