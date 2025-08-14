import { Empty } from "antd";
import FundingNeedItem from "./FundingNeedItem";

const FundingNeedList = ({ fundingNeeds }) => {
    if (fundingNeeds.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <Empty description="No funding needs found" />
            </div>
        );
    }
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
