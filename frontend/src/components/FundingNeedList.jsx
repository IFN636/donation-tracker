import FundingNeedItem from "./FundingNeedItem";

const FundingNeedList = ({ fundingNeeds }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {fundingNeeds.map((fundingNeed) => (
                <FundingNeedItem
                    key={fundingNeed._id}
                    fundingNeed={fundingNeed}
                />
            ))}
        </div>
    );
};

export default FundingNeedList;
