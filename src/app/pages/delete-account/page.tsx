"use client";

import { useState } from "react";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deletionPending, setDeletionPending] = useState(false);

  const handleRequest = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setSubmitted(true);
        setDeletionPending(true);
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/cancel-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (data.success) setDeletionPending(false);
    } catch {
      setMessage("Something went wrong while canceling. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter your email.");
    setConfirmStep(true);
  };

  const handleCancel = () => {
    setConfirmStep(false);
    setMessage("Deletion request canceled.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Delete My Account
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Enter your registered email to request account deletion.  
          Once confirmed, your data will be permanently removed within 7 days.
        </p>

        {!submitted ? (
          !confirmStep ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-xl hover:bg-red-600 transition"
              >
                Continue
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-700">
                Are you sure you want to delete your account associated with:
                <br />
                <span className="font-semibold text-gray-900">{email}</span>?
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleRequest}
                  disabled={loading}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  {loading ? "Deleting..." : "Confirm Delete"}
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="text-center space-y-5">
            <div className="text-green-600 font-medium">{message}</div>

            {deletionPending && (
              <div>
                <button
                  onClick={handleCancelRequest}
                  disabled={loading}
                  className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                >
                  {loading ? "Processing..." : "Cancel Deletion Request"}
                </button>
                <p className="text-xs text-gray-600 mt-2">
                  You can cancel this request before your data is permanently deleted.
                </p>
              </div>
            )}
          </div>
        )}

        {message && !submitted && (
          <div className="text-center text-sm text-gray-600 mt-3">{message}</div>
        )}

        <div className="text-center text-xs text-gray-500 mt-6">
          Need help? Contact us at{" "}
          <a href="mailto:usersupport@nasipaipon.com" className="text-blue-600">
          usersupport@nasipaipon.com
          </a>
        </div>
      </div>
    </div>
  );
}
