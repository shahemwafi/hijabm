"use client";
import { useState, useMemo } from "react";
import Image from 'next/image';
import { FaGlobe, FaRing, FaUser, FaVenusMars, FaSearch, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaHeart } from 'react-icons/fa';
import ProfileView from '@/components/ProfileView';
import { IProfile } from '@/models/Profile';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PortfolioPage({ profiles }: { profiles: any[] }) {
  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [educationFilter, setEducationFilter] = useState("");
  const [jobFilter, setJobFilter] = useState("");

  // Filter profiles based on search criteria
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch = searchTerm === "" || 
        profile.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.currentCity?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = genderFilter === "" || profile.gender === genderFilter;
      const matchesAge = ageFilter === "" || 
        (ageFilter === "18-25" && profile.age >= 18 && profile.age <= 25) ||
        (ageFilter === "26-35" && profile.age >= 26 && profile.age <= 35) ||
        (ageFilter === "36-45" && profile.age >= 36 && profile.age <= 45) ||
        (ageFilter === "46+" && profile.age >= 46);
      const matchesCity = cityFilter === "" || profile.currentCity?.toLowerCase().includes(cityFilter.toLowerCase());
      const matchesEducation = educationFilter === "" || profile.qualification?.toLowerCase().includes(educationFilter.toLowerCase());
      const matchesJob = jobFilter === "" || profile.rank?.toLowerCase().includes(jobFilter.toLowerCase());

      return matchesSearch && matchesGender && matchesAge && matchesCity && matchesEducation && matchesJob;
    });
  }, [profiles, searchTerm, genderFilter, ageFilter, cityFilter, educationFilter, jobFilter]);

if(selectedProfile){
    return(
        <ProfileView profile={selectedProfile} setSelectedProfile={setSelectedProfile}/>
    )
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 mb-4 drop-shadow">
            Approved Rishta Profiles
          </h1>
          <p className="text-green-700 text-sm sm:text-base max-w-2xl mx-auto">
            Browse through our verified profiles to find your perfect match
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 mb-8 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, description, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Gender Filter */}
            <div className="relative">
              <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Age Filter */}
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">All Ages</option>
                <option value="18-25">18-25 years</option>
                <option value="26-35">26-35 years</option>
                <option value="36-45">36-45 years</option>
                <option value="46+">46+ years</option>
              </select>
            </div>

            {/* City Filter */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by city..."
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Education Filter */}
            <div className="relative">
              <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by education..."
                value={educationFilter}
                onChange={(e) => setEducationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Job Filter */}
            <div className="relative">
              <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by job..."
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredProfiles.length} of {profiles.length} profiles
            </span>
            {(searchTerm || genderFilter || ageFilter || cityFilter || educationFilter || jobFilter) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setGenderFilter("");
                  setAgeFilter("");
                  setCityFilter("");
                  setEducationFilter("");
                  setJobFilter("");
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

                {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.length === 0 && (
            <div className="col-span-full text-center text-green-700 text-lg bg-white/80 rounded-xl p-8 shadow">
              {profiles.length === 0 ? "No approved profiles yet. Check back soon!" : "No profiles match your search criteria."}
            </div>
          )}
          {filteredProfiles.map((profile) => (
          <div
            key={profile._id as string}
              className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center border border-green-100 hover:shadow-2xl hover:scale-105 transition-transform duration-200"
          >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 relative">
              <Image
                src={profile.imageUrl}
                alt={profile.name}
                width={96}
                height={96}
                  className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24 border-2 border-green-200 shadow"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FaUser className="text-green-400" />
                <span className="font-bold text-green-900 text-base sm:text-lg">{profile.name}</span>
                <span className="text-green-700 text-xs sm:text-sm">({profile.age})</span>
            </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 justify-center mb-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-semibold"><FaVenusMars /> {profile.gender}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold"><FaRing /> {profile.maritalStatus}</span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold"><FaGlobe /> {getFlagEmoji(profile.nationality)} {profile.nationality}</span>
            </div>
            <div className="text-green-700 text-xs mt-2 line-clamp-3 text-center">{profile.description}</div>
              <button onClick={() => setSelectedProfile(profile)} className="mt-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition-all text-xs sm:text-sm">View More</button>
          </div>
        ))}
        </div>
      </div>
    </main>
  );
}

// You will need to fetch profiles in a parent (server) component and pass as prop. 