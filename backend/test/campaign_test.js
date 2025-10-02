import { expect } from "chai";
import sinon from "sinon";
import campaignController from "../controllers/campaignController.js";
import CampaignFactory from "../factories/CampaignFactory.js";
import Campaign from "../models/Campaign.js";
import Donation from "../models/Donation.js";
import CampaignRepositoryProxy from "../proxies/campaignRepositoryProxy.js";

describe("Campaign Controllers", () => {
    let req, res, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { body: {}, query: {}, params: {}, user: { id: "user123" } };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should create campaign successfully", async () => {
        req.body = {
            title: "Need Help",
            description: "Desc",
            goalAmount: 1000,
            currency: "AUD",
            deadline: "2025-12-31",
            imageUrl: "http://img.com/img.png",
        };

        sandbox.stub(Campaign, "create").resolves({
            _id: "fn1",
            ...req.body,
            createdBy: req.user.id,
        });

        await campaignController.createCampaign(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                message: "Campaign created successfully",
            })
        ).to.be.true;
    });

    it("should handle error in createCampaign", async () => {
        const err = new Error("DB Error");

        req.user = { _id: "u1", role: "user" };

        const fakeInsert = { title: "any", createdBy: "u1" };
        const factoryStub = sandbox
            .stub(CampaignFactory, "fromRequest")
            .returns({ toInsertDB: () => fakeInsert });

        const proxyCreateStub = sandbox
            .stub(CampaignRepositoryProxy.prototype, "create")
            .rejects(err);

        await campaignController.createCampaign(req, res);

        expect(factoryStub.calledOnce).to.be.true;
        expect(proxyCreateStub.calledOnce).to.be.true;

        expect(res.status.calledWith(500)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: false,
                message: "Failed to create campaign",
                error: "DB Error",
            })
        ).to.be.true;
    });

    it("should return list of campaigns", async () => {
        // Arrange
        req.query = {
            page: 1,
            limit: 10,
            search: "help",
            sortBy: "createdAt",
            sortOrder: "desc",
        };

        const fakeCampaigns = [{ _id: "fn1", title: "Help me" }];

        const findStub = sandbox
            .stub(campaignController._campaignRepository, "find")
            .resolves(fakeCampaigns);

        const countStub = sandbox
            .stub(campaignController._campaignRepository, "count")
            .resolves(1);

        await campaignController.getCampaigns(req, res);

        expect(findStub.calledOnce).to.be.true;
        expect(findStub.firstCall.args[0]).to.deep.equal({
            title: { $regex: "help", $options: "i" },
        });
        expect(findStub.firstCall.args[1]).to.deep.equal({
            populate: "createdBy",
            skip: 0,
            limit: 10,
            sort: { createdAt: -1 },
        });

        expect(countStub.calledOnce).to.be.true;

        expect(res.status.calledWith(200)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                total: 1,
                page: 1,
                limit: 10,
                data: sinon.match.array,
            })
        ).to.be.true;
    });

    it("should handle error in getCampaigns", async () => {
        sandbox.stub(Campaign, "find").throws(new Error("DB Error"));

        await campaignController.getCampaigns(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ success: false })).to.be.true;
    });

    it("should return campaign by id", async () => {
        req.params.id = "fn1";
        sandbox.stub(Campaign, "findById").returns({
            populate: () => Promise.resolve({ _id: "fn1", title: "Help" }),
        });

        await campaignController.getCampaignById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWithMatch({ success: true })).to.be.true;
    });

    it("should return 404 if campaign not found", async () => {
        req.params.id = "fn1";
        sandbox.stub(Campaign, "findById").returns({
            populate: () => Promise.resolve(null),
        });

        await campaignController.getCampaignById(req, res);

        expect(res.status.calledWith(404)).to.be.true;
    });

    it("should handle error in getCampaignById", async () => {
        req.params.id = "fn1";
        sandbox.stub(Campaign, "findById").throws(new Error("DB Error"));

        await campaignController.getCampaignById(req, res);

        expect(res.status.calledWith(500)).to.be.true;
    });

    it("should return donors by campaignId", async () => {
        req.params.campaignId = "fn1";
        req.query = { page: 1, limit: 10, sortBy: "amount", sortOrder: "desc" };

        const fakeDonors = [{ _id: "d1", amount: 500 }];

        sandbox
            .stub(
                campaignController._donationRepository,
                "getDonorsLeaderboardByCampaignId"
            )
            .resolves(fakeDonors);

        sandbox
            .stub(campaignController._donationRepository, "count")
            .resolves(1);

        await campaignController.getDonorsByCampaignId(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                data: fakeDonors,
                total: 1,
                page: 1,
                limit: 10,
            })
        ).to.be.true;
    });

    it("should handle error in getDonorsByCampaignId", async () => {
        sandbox.stub(Donation, "find").throws(new Error("DB Error"));

        await campaignController.getDonorsByCampaignId(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ success: false })).to.be.true;
    });
});
