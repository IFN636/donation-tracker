import { expect } from "chai";
import sinon from "sinon";
import * as fundingNeedController from "../controllers/fundingNeedController.js";
import Donation from "../models/Donation.js";
import FundingNeed from "../models/FundingNeed.js";

describe("FundingNeed Controllers", () => {
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

    it("should create funding need successfully", async () => {
        req.body = {
            title: "Need Help",
            description: "Desc",
            goalAmount: 1000,
            currency: "AUD",
            deadline: "2025-12-31",
            imageUrl: "http://img.com/img.png",
        };

        sandbox.stub(FundingNeed, "create").resolves({
            _id: "fn1",
            ...req.body,
            createdBy: req.user.id,
        });

        await fundingNeedController.createFundingNeed(req, res);

        expect(res.status.calledWith(201)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                message: "Funding need created successfully",
            })
        ).to.be.true;
    });

    it("should handle error in createFundingNeed", async () => {
        sandbox.stub(FundingNeed, "create").rejects(new Error("DB Error"));

        await fundingNeedController.createFundingNeed(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: false,
                message: "Failed to create funding need",
            })
        ).to.be.true;
    });

    it("should return list of funding needs", async () => {
        req.query = {
            page: 1,
            limit: 10,
            search: "help",
            sortBy: "createdAt",
            sortOrder: "desc",
        };

        sandbox.stub(FundingNeed, "find").returns({
            populate: () => ({
                skip: () => ({
                    limit: () => ({
                        sort: () =>
                            Promise.resolve([{ _id: "fn1", title: "Help me" }]),
                    }),
                }),
            }),
        });

        sandbox.stub(FundingNeed, "countDocuments").resolves(1);

        await fundingNeedController.getFundingNeeds(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                total: 1,
                data: sinon.match.array,
            })
        ).to.be.true;
    });

    it("should handle error in getFundingNeeds", async () => {
        sandbox.stub(FundingNeed, "find").throws(new Error("DB Error"));

        await fundingNeedController.getFundingNeeds(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ success: false })).to.be.true;
    });

    it("should return funding need by id", async () => {
        req.params.id = "fn1";
        sandbox.stub(FundingNeed, "findById").returns({
            populate: () => Promise.resolve({ _id: "fn1", title: "Help" }),
        });

        await fundingNeedController.getFundingNeedById(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWithMatch({ success: true })).to.be.true;
    });

    it("should return 404 if funding need not found", async () => {
        req.params.id = "fn1";
        sandbox.stub(FundingNeed, "findById").returns({
            populate: () => Promise.resolve(null),
        });

        await fundingNeedController.getFundingNeedById(req, res);

        expect(res.status.calledWith(404)).to.be.true;
    });

    it("should handle error in getFundingNeedById", async () => {
        req.params.id = "fn1";
        sandbox.stub(FundingNeed, "findById").throws(new Error("DB Error"));

        await fundingNeedController.getFundingNeedById(req, res);

        expect(res.status.calledWith(500)).to.be.true;
    });

    it("should return donors by fundingNeedId", async () => {
        req.params.fundingNeedId = "fn1";
        req.query = { page: 1, limit: 10, sortBy: "amount", sortOrder: "desc" };

        sandbox.stub(Donation, "find").returns({
            skip: () => ({
                limit: () => ({
                    sort: () => Promise.resolve([{ _id: "d1", amount: 500 }]),
                }),
            }),
        });

        sandbox.stub(Donation, "countDocuments").resolves(1);

        await fundingNeedController.getDonorsByFundingNeedId(req, res);

        expect(res.status.calledWith(200)).to.be.true;
        expect(
            res.json.calledWithMatch({
                success: true,
                data: sinon.match.array,
            })
        ).to.be.true;
    });

    it("should handle error in getDonorsByFundingNeedId", async () => {
        sandbox.stub(Donation, "find").throws(new Error("DB Error"));

        await fundingNeedController.getDonorsByFundingNeedId(req, res);

        expect(res.status.calledWith(500)).to.be.true;
        expect(res.json.calledWithMatch({ success: false })).to.be.true;
    });
});
