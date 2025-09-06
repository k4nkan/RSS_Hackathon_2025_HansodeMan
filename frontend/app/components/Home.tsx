"use client";
import React, { useState, useEffect } from "react";

// API response types
interface User {
  id: number;
  name: string;
  email: string;
}

interface DashboardData {
  notifications: number;
  messages: number;
}

interface HomeResponse {
  message: string;
  user: User;
  dashboardData: DashboardData;
}

interface ApiError {
  message: string;
  status?: number;
}

const HomeComponent = () => {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchHomeData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch("/home", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HomeResponse = await response.json();
      setHomeData(data);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Unknown error occurred",
        status: err instanceof Response ? err.status : undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <p>{error.message}</p>
        <button onClick={fetchHomeData}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Home Dashboard</h1>
      {homeData && (
        <>
          <p>{homeData.message}</p>

          <div>
            <h2>User Information</h2>
            <p>Name: {homeData.user.name}</p>
            <p>Email: {homeData.user.email}</p>
            <p>ID: {homeData.user.id}</p>
          </div>

          <div>
            <h2>Dashboard</h2>
            <p>Notifications: {homeData.dashboardData.notifications}</p>
            <p>Messages: {homeData.dashboardData.messages}</p>
          </div>
        </>
      )}

      <button onClick={fetchHomeData}>Refresh Data</button>
    </div>
  );
};

export default HomeComponent;
