import React from "react";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../api/api_calls";
import { User } from "../../types";

const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading user info...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>
        <strong>Username:</strong> {user.userName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Sentiment Analysis Enabled:</strong>{" "}
        {String(user.sentimentAnalysis)}
      </p>
      <p>
        <strong>Roles:</strong> {user.roles?.join(", ")}
      </p>
    </div>
  );
};

export default UserPage;
