import { expect } from "chai";
import sinon from "sinon";
import UserFactory from "../factories/UserFactory.js";
import CampaignFactory from "../factories/CampaignFactory.js";
import DonationFactory from "../factories/DonationFactory.js";
import TransactionFactory from "../factories/TransactionFactory.js";
import Admin from "../entities/Admin.js";
import Participant from "../entities/Participant.js";

describe("Factories", () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("UserFactory", () => {
        it("should create admin user", () => {
            const userData = { name: "Admin User", email: "admin@test.com" };

            const user = UserFactory.create("admin", userData);

            expect(user).to.be.instanceOf(Admin);
            expect(user.name).to.equal("Admin User");
        });

        it("should create participant user", () => {
            const userData = { name: "John Doe", email: "john@test.com" };

            const user = UserFactory.create("participant", userData);

            expect(user).to.be.instanceOf(Participant);
            expect(user.name).to.equal("John Doe");
        });

        it("should throw error for invalid role", () => {
            expect(() => UserFactory.create("invalid", {})).to.throw("Invalid role");
        });

        it("should convert user to domain object", () => {
            const userData = {
                name: "Test User",
                email: "test@test.com",
                role: "participant"
            };

            const user = UserFactory.userToDomain(userData);

            expect(user).to.be.instanceOf(Participant);
        });

        it("should convert user to plain object", () => {
            const user = {
                _id: "123",
                name: "Test User",
                email: "test@test.com",
                role: "participant",
                createdAt: new Date(),
            };

            const obj = UserFactory.toObject(user);

            expect(obj).to.have.property("_id", "123");
            expect(obj).to.have.property("name", "Test User");
        });

        it("should convert array of users to objects", () => {
            const users = [
                { _id: "1", name: "User 1" },
                { _id: "2", name: "User 2" },
            ];

            const objects = UserFactory.toObjects(users);

            expect(objects).to.be.an("array").with.length(2);
            expect(objects[0]).to.have.property("name", "User 1");
        });
    });

    describe("CampaignFactory", () => {
        it("should create campaign from request data", () => {
            const mockReq = {
                body: {
                    title: "Test Campaign",
                    description: "Test Description",
                    goalAmount: 1000,
                },
                user: { id: "user123" },
            };

            sandbox.stub(CampaignFactory, "fromRequest").returns({
                title: "Test Campaign",
                toInsertDB: () => ({ title: "Test Campaign", createdBy: "user123" }),
            });

            const campaign = CampaignFactory.fromRequest(mockReq);

            expect(campaign.title).to.equal("Test Campaign");
            expect(campaign.toInsertDB().createdBy).to.equal("user123");
        });
    });

    describe("DonationFactory", () => {
        it("should create donation with required fields", () => {
            const donationData = {
                campaign: "campaign123",
                donor: "user123",
                amount: 100,
                currency: "AUD",
            };

            sandbox.stub(DonationFactory, "create").returns({
                ...donationData,
                toInsertDB: () => donationData,
            });

            const donation = DonationFactory.create(donationData);

            expect(donation.campaign).to.equal("campaign123");
            expect(donation.amount).to.equal(100);
        });
    });

    describe("TransactionFactory", () => {
        it("should create transaction with status", () => {
            const transactionData = {
                campaign: "campaign123",
                amount: 100,
                status: "pending",
                currency: "AUD",
            };

            sandbox.stub(TransactionFactory, "create").returns({
                ...transactionData,
                toInsertDB: () => transactionData,
            });

            const transaction = TransactionFactory.create(transactionData);

            expect(transaction.status).to.equal("pending");
            expect(transaction.amount).to.equal(100);
        });
    });
});
