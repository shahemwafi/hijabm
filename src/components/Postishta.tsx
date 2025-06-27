"use client";
import SubmitPage from "@/components/Submit";
import { useState } from "react";
import {
  FaArrowRight,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
} from "react-icons/fa";

function PaymentForm({
  onNext,
}: {
  onNext: () => void;
}) {
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!screenshot) {
      setError("Please upload your payment screenshot.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter the account holder's name.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("screenshot", screenshot);
      formData.append("name", name);
      const res = await fetch("/api/payment", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Payment submission failed.");
        setLoading(false);
        return;
      }
      // Success
      onNext(); // Pass an empty string or the appropriate profileId if available
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="flex justify-center gap-6 text-green-700 text-2xl mb-4">
          <span title="Easypaisa">
            <FaMobileAlt />
          </span>
          <span title="JazzCash">
            <FaMobileAlt />
          </span>
          <span title="Raast">
            <FaUniversity />
          </span>
          <span title="Bank">
            <FaUniversity />
          </span>
          <span title="Cards">
            <FaCreditCard />
          </span>
        </div>
        <div className="bg-green-50 text-black border border-green-200 rounded-lg p-4 mb-4 text-left">
          <div className="mb-2 font-semibold text-green-800">
            Pay via Easypaisa / JazzCash
          </div>
          <div className="mb-1">
            Account Name:{" "}
            <span className="font-bold">Hijab Marriage Bureau</span>
          </div>
          <div className="mb-1">
            Account Number: <span className="font-mono">0312-1234567</span>
          </div>
          <div className="mb-1">
            Bank: <span className="font-bold">Meezan Bank</span>
          </div>
          <div className="mb-1">
            IBAN: <span className="font-mono">PK00MEZN0000000000000000</span>
          </div>
          <div className="text-xs text-green-700 mt-2">
            Send payment to the above account using Easypaisa, JazzCash, or bank
            transfer. Then upload your payment screenshot below.
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <label className="font-medium text-green-800 mb-1">
          Upload Payment Screenshot
        </label>
        <input
          type="text"
          name="name"
          placeholder="Name of Account Holder"
          className="mb-2 border border-green-300 rounded-lg p-2 w-full max-w-md text-sm text-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          name="screenshot"
          onChange={handleFileChange}
          className="mb-2 border border-green-300 rounded-lg p-2 w-full max-w-md text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          title="Upload your payment screenshot"
          placeholder="Upload your payment screenshot"
        />
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="bg-gradient-to-r from-green-600 to-blue-500 text-white px-10 py-3 rounded-full font-bold shadow-xl hover:scale-105 hover:from-green-700 hover:to-blue-600 transition-all text-lg mb-2"
        >
          Submit Payment
        </button>
      </div>
      <p className="mt-8 text-xs text-green-600">
        Your payment is secure and required to access the profile submission
        form. All major Pakistani payment methods are supported.
      </p>
    </form>
  );
}

function ApprovalStep() {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Thank you!</h2>
      <p className="text-green-700 mb-2">
        Your submission is received and pending admin approval.
      </p>
      <p className="text-green-500 text-sm">
        You will be notified by email once approved.
      </p>
    </div>
  );
}

export default function PayPage({ CurrentStep }: { CurrentStep: number }) {

  const [step, setStep] = useState(CurrentStep);
  const [profileId, setProfileId] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full border border-green-100 text-center">
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                step >= 1
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-400"
              }`}
            >
              1
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 1 ? "text-green-800" : "text-green-400"
              }`}
            >
              Information
            </span>
          </div>
          <FaArrowRight
            className={`text-xl ${
              step >= 2 ? "text-green-400" : "text-green-200"
            }`}
          />
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                step >= 2
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-400"
              }`}
            >
              2
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 2 ? "text-green-800" : "text-green-400"
              }`}
            >
              Payment
            </span>
          </div>
          <FaArrowRight
            className={`text-xl ${
              step === 3 ? "text-green-400" : "text-green-200"
            }`}
          />
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                step === 3
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-400"
              }`}
            >
              3
            </div>
            <span
              className={`text-xs mt-1 ${
                step === 3 ? "text-green-800" : "text-green-400"
              }`}
            >
              Approve
            </span>
          </div>
        </div>
        {/* Step Content */}
        {step === 1 && (
          <SubmitPage
            onNext={(profileId: string) => {
              setProfileId(profileId);
              setStep(2);
            }}
          />
        )}
        {step === 2 && (
          <PaymentForm  onNext={() => setStep(3)} />
        )}
        {step === 3 && <ApprovalStep />}
      </div>
    </main>
  );
}
