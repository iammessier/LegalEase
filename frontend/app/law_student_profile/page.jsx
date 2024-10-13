'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { GavelIcon, StarIcon } from "lucide-react";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    gender: "Male",
    dob: "23/02/1987",
    phone: "9826434076",
    graduatingYear: "2026",
    university: "Vaishnav Law Institute",
    helps: "4/5",
    numberReport: "5/9",
    language: "English"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const reviews = [
    { id: 1, text: "Excellent advice on my legal issue.", rating: 5 },
    { id: 2, text: "Very helpful and knowledgeable!", rating: 4 },
    { id: 3, text: "Provided solid guidance through my case.", rating: 5 },
    { id: 4, text: "Professional and quick response.", rating: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Legalease</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link className="font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 hover:text-purple-600 transition-colors" href="/">
            Home
          </Link>
          <Link className="flex items-center font-bold text-sm bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 hover:text-purple-600 transition-colors" href="/my-queries">
            Logout
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main className="p-6">
        <div className="text-2xl font-semibold mb-6">User Profile</div>

        {/* Profile Card */}
        <Card className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex">
            <div className="w-1/3 flex flex-col items-center">
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-lg font-semibold">Avi Sharma</div>
              <div className="flex items-center mb-2">
                {/* Static star rating */}
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon key={index} className="text-yellow-500" />
                ))}
                <span className="ml-2 text-gray-600">214 rates</span>
              </div>
              <div className="text-blue-600">85% trust</div>
            </div>

            {/* Profile Details */}
            <div className="w-2/3 grid grid-cols-2 gap-4">
              {Object.keys(profileData).map((key, idx) => (
                <div key={idx}>
                  <div className="text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</div>
                  <div className="font-semibold">{profileData[key]}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="editProfile" className="mt-6">
          <TabsList className="flex border-b">
            <TabsTrigger value="editProfile" className="px-4 py-2 text-blue-600 border-b-2 border-blue-600">Edit Profile</TabsTrigger>
            <TabsTrigger value="ratings" className="px-4 py-2 text-gray-600">View Ratings and Reviews</TabsTrigger>
          </TabsList>

          {/* Edit Profile Tab Content */}
          <TabsContent value="editProfile" className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form>
              {Object.keys(profileData).map((key) => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-600" htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</label>
                  <Input
                    id={key}
                    name={key}
                    value={profileData[key]}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              ))}
              <Button type="submit" className="bg-blue-600 text-white mt-4">Save Changes</Button>
            </form>
          </TabsContent>

          {/* View Ratings and Reviews Tab Content */}
          <TabsContent value="ratings" className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Ratings and Reviews</h3>
            <div>
              {reviews.map((review) => (
                <div key={review.id} className="border-b py-4">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <StarIcon key={i} className="text-yellow-500" />
                    ))}
                    {Array.from({ length: 5 - review.rating }, (_, i) => (
                      <StarIcon key={i + review.rating} className="text-gray-300" />
                    ))}
                  </div>
                  <div className="text-gray-600">{review.text}</div>
                </div>
              ))}
            </div>
            <Button className="mt-4 bg-blue-600 text-white">Read More</Button>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default UserProfile;


