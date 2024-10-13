'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { GavelIcon, MessageCircleIcon, BookOpenIcon,CogIcon,UserIcon,ChevronRightIcon,XIcon, BellIcon, SearchIcon, ShieldIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon, LogOutIcon, SettingsIcon, LockIcon, PlusIcon } from "lucide-react";

const UserProfile = () => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("Eng");
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      {/* Navbar */}
      <header className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Legalease
          </span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors" href="/">
            <strong>Home</strong>
          </Link>
          <Link className="text-sm font-medium hover:text-purple-600 transition-colors flex items-center" href="/logout">
            <LogOutIcon className="mr-1 h-4 w-4" />
            <strong>Logout</strong>
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <div className="flex items-center justify-center p-4 flex-grow">
        <div className="flex space-x-8">
          {/* Left Section */}
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-12 w-128">
              <div className="flex items-center space-x-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">User name</div>
                  <div className="text-gray-500 text-sm">example@gmail.com</div>
                </div>
              </div>
              <div className="mt-4">
                {/* My Profile */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <UserIcon />
                    <span>My Profile</span>
                  </div>
                  <ChevronRightIcon />
                </div>
                {/* Settings */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <CogIcon />
                    <span>Settings</span>
                  </div>
                  <ChevronRightIcon />
                </div>
                {/* Notification */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <BellIcon />
                    <span>Notification</span>
                  </div>
                  <div className="relative">
                    <button
                      className="text-gray-500"
                      onClick={() => setNotificationsVisible(!notificationsVisible)}
                    >
                      {notificationsVisible ? "Allow" : "Mute"}
                    </button>
                    {notificationsVisible && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
                        <div className="py-1 px-4 hover:bg-gray-100 cursor-pointer">Allow</div>
                        <div className="py-1 px-4 hover:bg-gray-100 cursor-pointer">Mute</div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Log Out */}
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <LogOutIcon />
                    <span>Log Out</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white rounded-lg shadow-lg p-12 w-128">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Settings</span>
              </div>
              <div className="mt-4 space-y-4">
                {/* Theme */}
                <div className="flex justify-between items-center">
                  <span>Theme</span>
                  <div className="relative">
                    <button className="text-gray-500" onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}>
                      {theme}
                    </button>
                    {isThemeDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
                        <div
                          className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => { setTheme("Light"); setIsThemeDropdownOpen(false); }}
                        >
                          Light
                        </div>
                        <div
                          className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => { setTheme("Dark"); setIsThemeDropdownOpen(false); }}
                        >
                          Dark
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Language */}
                <div className="flex justify-between items-center">
                  <span>Language</span>
                  <div className="relative">
                    <button className="text-gray-500" onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}>
                      {language === "Eng" ? "English" : "Hindi"}
                    </button>
                    {isLanguageDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-lg">
                        <div
                          className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => { setLanguage("Eng"); setIsLanguageDropdownOpen(false); }}
                        >
                          English
                        </div>
                        <div
                          className="py-1 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => { setLanguage("Hin"); setIsLanguageDropdownOpen(false); }}
                        >
                          Hindi
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white rounded-lg shadow-lg p-16 w-[50rem]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">User name</div>
                  <div className="text-gray-500 text-sm">example@gmail.com</div>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Name</span>
                <span className="text-gray-500">your name</span>
              </div>
              <div className="flex justify-between">
                <span>Email account</span>
                <span className="text-gray-500">yourname@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile number</span>
                <span className="text-gray-500">Add number</span>
              </div>
              <div className="flex justify-between">
                <span>Location</span>
                <span className="text-gray-500">USA</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer
        className="w-full flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-gray-600">© 2024 Legalease. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="/terms">
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:text-purple-600 transition-colors"
            href="/privacy">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default UserProfile;