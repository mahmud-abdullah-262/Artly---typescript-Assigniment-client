import { useCurrentSession } from "../../lib/action/useCurrentSession";

const Profile = () => {
  const { user, isPending } = useCurrentSession();

  if (isPending) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>Profile page {user.name}</h1>
    </div>
  );
};

export default Profile;