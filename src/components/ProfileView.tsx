import Image from "next/image";
import { IProfile } from "@/models/Profile";

export default function ProfileView({ profile, setSelectedProfile }: { profile: IProfile, setSelectedProfile: (value: IProfile | null) => void; }) {
  return (
    <div className="bg-white pt-10 w-full h-full border border-green-100">
      <button
        className="absolute z-50 top-20 left-9 text-4xl bg-white rounded-full px-2 py-1 shadow"
        onClick={() => setSelectedProfile(null)}
      >
        &times;
      </button>
      <div className="flex flex-col items-center mb-6">
        <Image
          src={profile.imageUrl}
          alt={profile.name}
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover border-4 border-green-300 shadow mb-4"
        />
        <h1 className="text-3xl font-extrabold text-green-900 mb-2 drop-shadow">
          {profile.name}
        </h1>
        <div className="text-green-700 text-lg mb-1">
          {profile.gender === "male" ? "Brother" : "Sister"} | Age: {profile.age}
        </div>
        <div className="text-green-700 text-md mb-1">
          {profile.city}, {profile.country}
        </div>
        <div className="text-green-700 text-md mb-1">
          Height: {profile.height}
        </div>
        <div className="text-green-700 text-md mb-1">
          Marital Status: {profile.maritalStatus}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-bold text-center text-green-800 mb-1">About</h2>
        <p className="text-gray-700 text-center whitespace-pre-line">{profile.description}</p>
      </div>
      <div className="mb-2 text-center">
        <span className="font-semibold text-center">Profile Status:</span> {profile.status}
      </div>
      <div className="mb-2 text-xs  text-center text-gray-500">
        <span className="font-semibold  text-center">Created At:</span> {new Date(profile.createdAt).toLocaleString()}
      </div>
    </div>
  );
} 