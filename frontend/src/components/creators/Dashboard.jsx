const Dashboard = () => {
    return (
        <div>
            <h1>Creator Dashboard</h1>
            <p>Welcome to the Creator Dashboard!</p>
            {/* <div className="flex w-full gap-4">
                <StatCard
                    title="Total Donations"
                    value={12847}
                    prefix="$"
                    percent={12.5}
                    positive={true}
                    icon={
                        <DollarOutlined
                            style={{ fontSize: 24, color: "#16a34a" }}
                        />
                    }
                />

                <StatCard
                    title="New Users"
                    value={520}
                    percent={4.3}
                    positive={false}
                    icon={
                        <UserOutlined
                            style={{ fontSize: 24, color: "#dc2626" }}
                        />
                    }
                />
            </div> */}
        </div>
    );
};

export default Dashboard;
