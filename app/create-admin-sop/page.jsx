"use client";

import React, { useEffect, useState } from "react";
import AdminSOPForm from "../components/AdminSOPForm";
import { useRouter } from "next/navigation";

export default function CreateAdminSOP() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setIsAdmin(parsed.role === "ADMIN");
    }
  }, []);

  const handleCreateAdminSOP = async (sopData) => {
    try {
      const response = await fetch("/api/sops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sopData),
      });
      if (!response.ok) throw new Error("Failed to create SOP");
      router.push("/home");
    } catch (error) {
      alert("Error creating SOP. Please try again.");
    }
  };

  if (!user) return <div>Loading...</div>;
  if (!isAdmin) {
    return (
      <div style={{ padding: 32, color: "red" }}>
        Access denied. Only admins can create advanced SOPs.
      </div>
    );
  }

  return (
    <div className="create-sop-page">
      <h1>Create Admin SOP</h1>
      <AdminSOPForm onSubmit={handleCreateAdminSOP} initialData={{ authorId: user.id }} />
    </div>
  );
}
