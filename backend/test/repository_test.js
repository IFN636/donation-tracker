import { expect } from "chai";
import sinon from "sinon";
import BaseRepository from "../repositories/baseRepository.js";

describe("Base Repository", () => {
    let repository, mockModel, sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        mockModel = {
            create: sinon.stub(),
            findById: sinon.stub(),
            findOne: sinon.stub(),
            find: sinon.stub(),
            findOneAndUpdate: sinon.stub(),
            findByIdAndDelete: sinon.stub(),
            deleteOne: sinon.stub(),
            deleteMany: sinon.stub(),
            countDocuments: sinon.stub(),
        };
        repository = new BaseRepository(mockModel);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("create", () => {
        it("should create new document", async () => {
            const data = { name: "Test" };
            const created = { _id: "123", name: "Test" };

            mockModel.create.resolves(created);

            const result = await repository.create(data);

            expect(mockModel.create.calledWith(data)).to.be.true;
            expect(result).to.equal(created);
        });
    });

    describe("findOneById", () => {
        it("should find document by id", async () => {
            const id = "123";
            const doc = { _id: id, name: "Test" };

            mockModel.findById.resolves(doc);

            const result = await repository.findOneById(id);

            expect(mockModel.findById.calledWith(id)).to.be.true;
            expect(result).to.equal(doc);
        });
    });

    describe("find", () => {
        it("should find documents with filter", async () => {
            const filter = { status: "active" };
            const options = { limit: 10 };
            const docs = [{ _id: "1" }, { _id: "2" }];

            mockModel.find.resolves(docs);

            const result = await repository.find(filter, options);

            expect(mockModel.find.calledWith(filter, null, options)).to.be.true;
            expect(result).to.equal(docs);
        });
    });

    describe("findWithPagination", () => {
        it("should return paginated results", async () => {
            const filter = { status: "active" };
            const page = 2;
            const limit = 5;
            const docs = [{ _id: "1" }];
            const total = 15;

            mockModel.find.resolves(docs);
            mockModel.countDocuments.resolves(total);

            const result = await repository.findWithPagination(
                filter,
                page,
                limit
            );

            expect(result).to.deep.equal({
                data: docs,
                page: 2,
                limit: 5,
                total: 15,
                totalPages: 3,
            });
            expect(
                mockModel.find.calledWith(filter, null, {
                    skip: 5,
                    limit: 5,
                })
            ).to.be.true;
        });
    });

    describe("updateOne", () => {
        it("should update document", async () => {
            const filter = { _id: "123" };
            const update = { name: "Updated" };
            const updated = { _id: "123", name: "Updated" };

            mockModel.findOneAndUpdate.resolves(updated);

            const result = await repository.updateOne(filter, update);

            expect(
                mockModel.findOneAndUpdate.calledWith(filter, update, {
                    new: true,
                })
            ).to.be.true;
            expect(result).to.equal(updated);
        });
    });

    describe("deleteById", () => {
        it("should delete document by id and return true", async () => {
            const id = "123";
            mockModel.findByIdAndDelete.resolves({ _id: id });

            const result = await repository.deleteById(id);

            expect(mockModel.findByIdAndDelete.calledWith(id)).to.be.true;
            expect(result).to.be.true;
        });

        it("should return false if document not found", async () => {
            const id = "123";
            mockModel.findByIdAndDelete.resolves(null);

            const result = await repository.deleteById(id);

            expect(result).to.be.false;
        });
    });

    describe("count", () => {
        it("should count documents with filter", async () => {
            const filter = { status: "active" };
            const count = 10;

            mockModel.countDocuments.resolves(count);

            const result = await repository.count(filter);

            expect(mockModel.countDocuments.calledWith(filter)).to.be.true;
            expect(result).to.equal(count);
        });
    });

    describe("exists", () => {
        it("should return true if documents exist", async () => {
            const filter = { status: "active" };
            mockModel.countDocuments.resolves(1);

            const result = await repository.exists(filter);

            expect(result).to.be.true;
        });

        it("should return false if no documents exist", async () => {
            const filter = { status: "active" };
            mockModel.countDocuments.resolves(0);

            const result = await repository.exists(filter);

            expect(result).to.be.false;
        });
    });
});
