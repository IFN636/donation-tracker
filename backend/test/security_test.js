import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";
import { JwtUtils } from "../utils/security.js";

describe("Security Utils", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        process.env.JWT_SECRET = "test-secret";
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("JwtUtils", () => {
        describe("generateToken", () => {
            it("should generate JWT token with user id", () => {
                const userId = "user123";
                const mockToken = "generated.jwt.token";

                sandbox.stub(jwt, "sign").returns(mockToken);

                const token = JwtUtils.generateToken(userId);

                expect(
                    jwt.sign.calledWith(
                        { id: userId },
                        process.env.JWT_SECRET,
                        { expiresIn: "30d" }
                    )
                ).to.be.true;
                expect(token).to.equal(mockToken);
            });
        });

        describe("verifyToken", () => {
            it("should verify JWT token successfully", () => {
                const token = "valid.jwt.token";
                const decoded = { id: "user123", iat: 1234567890 };

                sandbox.stub(jwt, "verify").returns(decoded);

                const result = JwtUtils.verifyToken(token);

                expect(jwt.verify.calledWith(token, process.env.JWT_SECRET)).to
                    .be.true;
                expect(result).to.deep.equal(decoded);
            });

            it("should throw error for invalid token", () => {
                const token = "invalid.jwt.token";
                const error = new Error("Invalid token");

                sandbox.stub(jwt, "verify").throws(error);

                expect(() => JwtUtils.verifyToken(token)).to.throw(
                    "Invalid token"
                );
            });
        });
    });
});
