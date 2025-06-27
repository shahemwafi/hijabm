"use client";
import { useState } from "react";
import Image from 'next/image';
import { FaGlobe, FaRing, FaUser, FaVenusMars } from 'react-icons/fa';
import ProfileView from '@/components/ProfileView';

export const dynamic = 'force-dynamic';

function getFlagEmoji(country: string) {
  // Simple country to flag emoji (works for most countries)
  if (!country) return '🌍';
  const codePoints = country
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function PortfolioPage({ profiles }: { profiles: any[] }) {
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
if(selectedProfile){
    return(
        <ProfileView profile={selectedProfile} setSelectedProfile={setSelectedProfile}/>
    )
}
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
      <h1 className="text-4xl font-extrabold text-green-900 mb-10 text-center drop-shadow">Approved Rishta Profiles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {profiles.length === 0 && (
          <div className="col-span-full text-center text-green-700 text-lg bg-white/80 rounded-xl p-8 shadow">No approved profiles yet. Check back soon!</div>
        )}
        {profiles.map((profile) => (
          <div
            key={profile._id as string}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-green-100 hover:shadow-2xl hover:scale-105 transition-transform duration-200"
          >
            <div className="w-24 h-24 mb-4 relative">
              <Image
                src={profile.imageUrl}
                alt={profile.name}
                width={96}
                height={96}
                className="rounded-full object-cover w-24 h-24 border-2 border-green-200 shadow"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FaUser className="text-green-400" />
              <span className="font-bold text-green-900 text-lg">{profile.name}</span>
              <span className="text-green-700 text-sm">({profile.age})</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mb-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold"><FaVenusMars /> {profile.gender}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold"><FaRing /> {profile.maritalStatus}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold"><FaGlobe /> {getFlagEmoji(profile.country)} {profile.country}</span>
            </div>
            <div className="text-green-700 text-xs mt-2 line-clamp-3 text-center">{profile.description}</div>
            <button onClick={() => setSelectedProfile(profile)} className="mt-4 px-6 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition-all text-sm">View More</button>
          </div>
        ))}
      </div>

    </main>
  );
}

// You will need to fetch profiles in a parent (server) component and pass as prop. 