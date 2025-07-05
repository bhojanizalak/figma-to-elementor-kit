"use client";

import { useState } from "react";

export default function Home() {
  const [figmaToken, setFigmaToken] = useState("");
  const [fileId, setFileId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [kitUrl, setKitUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setKitUrl(null);
    try {
      const res = await fetch("/api/generate-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ figmaToken, fileId }),
      });
      if (!res.ok) throw new Error("Failed to generate kit");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setKitUrl(url);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Figma to Elementor Kit Generator</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <label className="flex flex-col gap-1">
          <span className="font-medium">Figma API Token</span>
          <input
            type="text"
            value={figmaToken}
            onChange={e => setFigmaToken(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium">Figma File ID</span>
          <input
            type="text"
            value={fileId}
            onChange={e => setFileId(e.target.value)}
            className="border rounded px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Elementor Kit"}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {kitUrl && (
        <a
          href={kitUrl}
          download="elementor-kit.json"
          className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Elementor Kit
        </a>
      )}
    </div>
  );
}
