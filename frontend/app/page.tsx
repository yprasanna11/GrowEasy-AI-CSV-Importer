"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");

  const uploadCSV = async () => {
    if (!file) {
      setMessage("❌ Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "https://groweasy-backend-yh3w.onrender.com/api/upload",
        formData
      );

      console.log("Backend Response:", response.data);

      setResult(response.data);
      setMessage("✅ CSV uploaded and processed successfully.");
    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!result?.aiResult) return;

    const blob = new Blob(
      [JSON.stringify(result.aiResult, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <div className="bg-white shadow-2xl rounded-2xl p-8">

          <h1 className="text-4xl font-bold text-center text-blue-700">
            GrowEasy AI CSV Importer
          </h1>

          <p className="text-center text-gray-600 mt-3">
            Upload your CRM CSV file and let AI process the data.
          </p>

          <div className="mt-10">

            <label className="block text-lg font-semibold mb-3">
              Choose CSV File
            </label>

            <input
              type="file"
              accept=".csv"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="w-full border p-3 rounded-lg"
            />

          </div>

          {file && (

            <div className="bg-blue-50 mt-6 rounded-xl p-5 shadow">

              <h2 className="text-xl font-bold mb-3">
                📄 Selected File
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

                <div>
                  <p className="font-semibold">Name</p>
                  <p>{file.name}</p>
                </div>

                <div>
                  <p className="font-semibold">Size</p>
                  <p>{(file.size / 1024).toFixed(2)} KB</p>
                </div>

                <div>
                  <p className="font-semibold">Type</p>
                  <p>CSV</p>
                </div>

              </div>

            </div>

          )}

          <button
            onClick={uploadCSV}
            disabled={loading}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "🚀 Upload CSV"}
          </button>

          {message && (

            <div
              className={`mt-6 p-4 rounded-xl text-center font-semibold ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>

          )}

          {result && (

            <>              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">

                <div className="bg-blue-100 rounded-xl p-5 text-center shadow">
                  <h3 className="font-bold text-lg">📄 Total Records</h3>
                  <p className="text-3xl font-bold mt-2">
                    {result.totalRows}
                  </p>
                </div>

                <div className="bg-green-100 rounded-xl p-5 text-center shadow">
                  <h3 className="font-bold text-lg">✅ Status</h3>
                  <p className="text-2xl font-bold mt-2">
                    Success
                  </p>
                </div>

                <div className="bg-yellow-100 rounded-xl p-5 text-center shadow">
                  <h3 className="font-bold text-lg">🤖 AI Processing</h3>
                  <p className="text-2xl font-bold mt-2">
                    Completed
                  </p>
                </div>

                <div className="bg-purple-100 rounded-xl p-5 text-center shadow">
                  <h3 className="font-bold text-lg">📥 Export</h3>

                  <button
                    onClick={downloadJSON}
                    className="mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  >
                    Download JSON
                  </button>

                </div>

              </div>

              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                  📋 CSV Preview
                </h2>

                <div className="overflow-x-auto rounded-xl shadow border">

                  <table className="min-w-full bg-white">

                    <thead className="bg-blue-600 text-white">

                      <tr>

                        {result.preview &&
                          result.preview.length > 0 &&
                          Object.keys(result.preview[0]).map((key) => (

                            <th
                              key={key}
                              className="px-4 py-3 border text-left"
                            >
                              {key}
                            </th>

                          ))}

                      </tr>

                    </thead>

                    <tbody>

                      {result.preview &&
                        result.preview.map((row: any, index: number) => (

                          <tr
                            key={index}
                            className="hover:bg-blue-50 even:bg-gray-50"
                          >

                            {Object.values(row).map(
                              (value: any, i: number) => (

                                <td
                                  key={i}
                                  className="border px-4 py-3"
                                >
                                  {String(value)}
                                </td>

                              )
                            )}

                          </tr>

                        ))}

                    </tbody>

                  </table>

                </div>

              </div>

              <div className="mt-12">

                <h2 className="text-2xl font-bold mb-5">
                  🤖 AI Processed CRM Data
                </h2>

                <div className="overflow-x-auto rounded-xl shadow border">

                  <table className="min-w-full bg-white">

                    <thead className="bg-green-600 text-white">

                      <tr>

                        <th className="border px-4 py-3">
                          Name
                        </th>

                        <th className="border px-4 py-3">
                          Email
                        </th>

                        <th className="border px-4 py-3">
                          Mobile
                        </th>

                        <th className="border px-4 py-3">
                          Country
                        </th>

                        <th className="border px-4 py-3">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {result.aiResult &&
                        result.aiResult.map(
                          (lead: any, index: number) => (

                            <tr
                              key={index}
                              className="hover:bg-green-50 even:bg-gray-50"
                            >

                              <td className="border px-4 py-3">
                                {lead.name}
                              </td>

                              <td className="border px-4 py-3">
                                {lead.email}
                              </td>

                              <td className="border px-4 py-3">
                                {lead.mobile_without_country_code}
                              </td>

                              <td className="border px-4 py-3">
                                {lead.country}
                              </td>

                              <td className="border px-4 py-3">

                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                  {lead.crm_status}
                                </span>

                              </td>

                            </tr>

                          )
                        )}

                    </tbody>

                  </table>

                </div>

              </div>            </>

          )}

        </div>

        <footer className="mt-10 bg-white rounded-2xl shadow-xl p-6">

          <div className="text-center">

            <h2 className="text-2xl font-bold text-blue-700">
              GrowEasy AI CSV Importer
            </h2>

            <p className="text-gray-600 mt-2">
              AI Powered CRM Data Import System
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

              <div className="bg-blue-100 rounded-lg p-4 shadow">
                <h3 className="font-bold">⚛️ Next.js</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Frontend Framework
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-4 shadow">
                <h3 className="font-bold">🚀 Express.js</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Backend API
                </p>
              </div>

              <div className="bg-yellow-100 rounded-lg p-4 shadow">
                <h3 className="font-bold">🤖 Gemini AI</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Data Processing
                </p>
              </div>

              <div className="bg-purple-100 rounded-lg p-4 shadow">
                <h3 className="font-bold">📄 CSV Parser</h3>
                <p className="text-sm text-gray-600 mt-2">
                  CSV Extraction
                </p>
              </div>

            </div>

            <div className="mt-8 border-t pt-6">

              <p className="text-lg font-semibold">
                Developed by
              </p>

              <p className="text-2xl font-bold text-blue-700">
                Yadagiri Prasanna
              </p>

              <p className="text-gray-600 mt-2">
                B.Tech – Computer Science & Engineering (AI & ML)
              </p>

              <p className="text-gray-500">
                MRCET | Batch 2026
              </p>

            </div>

          </div>

        </footer>

      </div>

    </main>

  );
}