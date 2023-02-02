import React from "react";
import DashboardLayout from "../../layout/DashboardLayout";

const Dashboard = ({users }) => {
  return (
<div>HI</div>
  );
};

Dashboard.layout = DashboardLayout;
export async function getServerSideProps() {
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`);
  const users = await user.json();
  return { props: { users } };
}

export default Dashboard;
