import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import CampaignForm from "../../components/forms/CampaignForm";

const EditCampaignPage = () => {
    const { campaignId } = useParams();
    const [updatingCampaignData, setUpdatingCampaignData] = useState({});

    useEffect(() => {
        const fetchCampaign = async () => {
            const response = await axiosInstance.get(
                `/api/campaigns/${campaignId}`
            );
            setUpdatingCampaignData(response.data.data);
        };
        fetchCampaign();
    }, [campaignId]);
    return <CampaignForm updatingCampaignData={updatingCampaignData} />;
};

export default EditCampaignPage;
