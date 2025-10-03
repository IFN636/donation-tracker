import { expect } from "chai";
import sinon from "sinon";
import donationController from "../controllers/donationController.js";

describe("Donation Controller", () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = {
            params: {},
            query: {},
            user: { id: "user123" },
        };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("getRecentDonationsByCampaignId", () => {
        it("should return recent donations by campaign id", async () => {
            req.params.campaignId = "campaign123";
            req.query.limit = 3;

            const mockDonations = [
                { _id: "donation1", amount: 100 },
                { _id: "donation2", amount: 200 },
            ];

            sandbox
                .stub(
                    donationController._donationRepository,
                    "getRecentDonationsByCampaignId"
                )
                .resolves(mockDonations);

            await donationController.getRecentDonationsByCampaignId(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: true,
                    data: mockDonations,
                })
            ).to.be.true;
        });

        it("should return 400 if campaignId is missing", async () => {
            req.params = {};

            await donationController.getRecentDonationsByCampaignId(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: false,
                    message: "campaignId parameter is required",
                })
            ).to.be.true;
        });

        it("should handle errors", async () => {
            req.params.campaignId = "campaign123";

            sandbox
                .stub(
                    donationController._donationRepository,
                    "getRecentDonationsByCampaignId"
                )
                .rejects(new Error("DB Error"));

            await donationController.getRecentDonationsByCampaignId(req, res);

            expect(res.status.calledWith(500)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: false,
                    message: "DB Error",
                })
            ).to.be.true;
        });
    });

    describe("getRecentDonationsByDonorId", () => {
        it("should return recent donations by donor", async () => {
            req.query.limit = 5;

            const mockDonations = [
                { _id: "donation1", amount: 50, donor: "user123" },
            ];

            sandbox
                .stub(
                    donationController._donationRepository,
                    "getRecentDonationsByDonorId"
                )
                .resolves(mockDonations);

            await donationController.getRecentDonationsByDonorId(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: true,
                    data: mockDonations,
                })
            ).to.be.true;
        });
    });

    describe("getRecentDonationsByCreatorId", () => {
        it("should return recent donations to creator's campaigns", async () => {
            req.query.limit = 5;

            const mockDonations = [
                { _id: "donation1", amount: 100, receiver: "user123" },
            ];

            sandbox
                .stub(
                    donationController._donationRepository,
                    "getRecentDonationsByCreatorId"
                )
                .resolves(mockDonations);

            await donationController.getRecentDonationsByCreatorId(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: true,
                    data: mockDonations,
                })
            ).to.be.true;
        });
    });

    describe("getDonationById", () => {
        it("should return donation by id", async () => {
            req.params.donationId = "donation123";

            const mockDonation = {
                _id: "donation123",
                amount: 100,
                campaign: "campaign123",
            };

            sandbox
                .stub(donationController._donationRepository, "findOneById")
                .resolves(mockDonation);

            await donationController.getDonationById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(mockDonation)).to.be.true;
        });

        it("should return 400 if donationId is missing", async () => {
            req.params = {};

            await donationController.getDonationById(req, res);

            expect(res.status.calledWith(400)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: false,
                    message: "donationId parameter is required",
                })
            ).to.be.true;
        });

        it("should return 404 if donation not found", async () => {
            req.params.donationId = "donation123";

            sandbox
                .stub(donationController._donationRepository, "findOneById")
                .resolves(null);

            await donationController.getDonationById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(
                res.json.calledWithMatch({
                    success: false,
                    message: "Donation not found",
                })
            ).to.be.true;
        });
    });
});
