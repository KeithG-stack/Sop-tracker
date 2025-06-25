"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SOPFormUser from "../../components/SOPFormUser";
import "../../components/SOPForm.css";

const categoriesArray = [
  { id: 1, name: "General" },
  { id: 2, name: "Safety" },
];

export default function EditSOPPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [sop, setSop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSOP = async () => {
      try {
        const res = await fetch(`/api/sops/${id}`);
        if (!res.ok) throw new Error("Failed to fetch SOP");
        const data = await res.json();
        setSop(data);
      } catch (err) {
        setError("Could not load SOP.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSOP();
  }, [id]);

  const handleEditSOP = async (sopData) => {
    try {
      const response = await fetch(`/api/sops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sopData),
      });
      if (!response.ok) throw new Error("Failed to update SOP");
      router.push("/home");
    } catch (error) {
      alert("Error updating SOP. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading SOP...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!sop) return null;

  return (
    <div className="edit-sop-page">
      <h1>Edit SOP</h1>
      <SOPFormUser
        onSubmit={handleEditSOP}
        authorId={sop.authorId}
        categories={categoriesArray}
        initialData={sop}
      />
    </div>
  );
} 