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
import { GavelIcon, MessageCircleIcon, BookOpenIcon, UserIcon, BellIcon, SearchIcon, ShieldIcon, StarIcon, ThumbsUpIcon, ThumbsDownIcon, LogOutIcon, SettingsIcon, LockIcon } from "lucide-react"
import Link from "next/link"

export default function UserPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [legalTopic, setLegalTopic] = useState('')
  const [questionTitle, setQuestionTitle] = useState('')
  const [questionDescription, setQuestionDescription] = useState('')

  const handleSubmitQuestion = (e) => {
    e.preventDefault()
    // Handle question submission logic here
    console.log('Question submitted:', { legalTopic, questionTitle, questionDescription })
  }

  return (
    (<div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <header
        className="w-full px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-white/30 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <GavelIcon className="h-6 w-6 mr-2 text-purple-600" />
          <span
            className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Legalease</span>
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/">
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:text-purple-600 transition-colors"
            href="/my-queries">
            My Queries
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <SearchIcon
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="relative">
            <BellIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span
              className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LockIcon className="mr-2 h-4 w-4" />
                <span>Privacy</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/4 space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <h1
                className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Welcome to Legalease</h1>
              <p className="text-gray-600 mb-6">Get started by asking a legal question, browsing our resources, or chatting with a legal expert.</p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Ask a Question
                </Button>
                <Button variant="outline">
                  Browse Legal Library
                </Button>
                <Button variant="outline">
                  Chat with Legal Expert
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircleIcon className="h-6 w-6 mr-2 text-purple-600" />
                Ask a Legal Question
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <Select value={legalTopic} onValueChange={setLegalTopic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Legal Topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">Family Law</SelectItem>
                    <SelectItem value="business">Business Law</SelectItem>
                    <SelectItem value="property">Property Law</SelectItem>
                    <SelectItem value="criminal">Criminal Law</SelectItem>
                    <SelectItem value="employment">Employment Law</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Question Title"
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)} />
                <Textarea
                  placeholder="Describe your legal question in detail..."
                  value={questionDescription}
                  onChange={(e) => setQuestionDescription(e.target.value)}
                  className="min-h-[100px]" />
                <Button type="submit" className="w-full">Submit Question</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpenIcon className="h-6 w-6 mr-2 text-purple-600" />
                Legal Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Search legal documents..." className="mb-4" />
              <h3 className="font-semibold mb-2">Popular Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {['Tenant Rights Guide', 'Small Business Regulations', 'Divorce Proceedings Overview', 'Criminal Law Basics'].map((resource, index) => (
                  <Button key={index} variant="outline" className="justify-start">
                    <BookOpenIcon className="h-4 w-4 mr-2" />
                    {resource}
                  </Button>
                ))}
              </div>
              <h3 className="font-semibold mb-2">Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Family Law', 'Business Law', 'Property Law', 'Criminal Law', 'Employment Law', 'Immigration Law'].map((category, index) => (
                  <Badge key={index} variant="secondary" className="justify-center py-2">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircleIcon className="h-6 w-6 mr-2 text-purple-600" />
                Recent Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                    <h3 className="font-semibold mb-2">How do I file for divorce in California?</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      I've been married for 5 years and want to know the process for filing for divorce in California. What are the steps and required documents?
                    </p>
                    <div className="bg-purple-50 p-4 rounded-md mb-2">
                      <p className="text-sm mb-2">
                        To file for divorce in California, you need to follow these steps:
                        1. Meet residency requirements
                        2. File a petition for dissolution of marriage
                        3. Serve papers to your spouse
                        4. Wait for a response
                        5. Negotiate settlement or go to trial
                        6. Finalize the divorce
                        
                        Required documents include the petition, summons, and financial disclosures. It's advisable to consult with a family law attorney for personalized guidance.
                      </p>
                      <p className="text-xs text-gray-500">Answered by: Jane Doe, Law Student</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <ThumbsUpIcon className="h-4 w-4 mr-1" />
                          Helpful (23)
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ThumbsDownIcon className="h-4 w-4 mr-1" />
                          Not Helpful (2)
                        </Button>
                      </div>
                      <Button variant="link" size="sm">Read More</Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpenIcon className="h-6 w-6 mr-2 text-purple-600" />
                Community Posts & Blogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="posts">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="posts">Community Posts</TabsTrigger>
                  <TabsTrigger value="blogs">Blog Articles</TabsTrigger>
                </TabsList>
                <TabsContent value="posts">
                  <ScrollArea className="h-[400px] pr-4">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div key={index} className="mb-6 pb-6 border-b last:border-b-0">
                        <h3 className="font-semibold mb-2">Tips for Negotiating a Commercial Lease</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          As a small business owner, I've learned a lot about negotiating commercial leases. Here are some tips that might help others...
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Posted by: John Smith</span>
                          <Button variant="link" size="sm">Read More</Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="blogs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((_, index) => (
                      <Card key={index}>
                        <img
                          src={`/placeholder.svg?height=200&width=400`}
                          alt="Blog post image"
                          className="w-full h-40 object-cover rounded-t-lg" />
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">Understanding Intellectual Property Rights</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            In this article, we explore the basics of intellectual property rights and how they affect businesses and individuals...
                          </p>
                          <Button variant="link" size="sm">Read More</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircleIcon className="h-6 w-6 mr-2 text-purple-600" />
                Real-Time Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Connect with a law student or legal professional for immediate assistance.</p>
              <Button className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldIcon className="h-6 w-6 mr-2 text-purple-600" />
                Know Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Quick access to legal rights information based on your location and topic.</p>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                </SelectContent>
              </Select>
              <Select className="mt-2">
                <SelectTrigger>
                  <SelectValue placeholder="Select Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing">Housing Rights</SelectItem>
                  <SelectItem value="employment">Employment Rights</SelectItem>
                  <SelectItem value="consumer">Consumer Rights</SelectItem>
                  <SelectItem value="civil">Civil Rights</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full mt-4">
                Get Information
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <StarIcon className="h-6 w-6 mr-2 text-purple-600" />
                Top Rated Law Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                      <AvatarFallback>LS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Jane Doe</p>
                      <p className="text-sm text-gray-600">Family Law Specialist</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer
        className="w-full flex flex-col gap-2 sm:flex-row py-6 shrink-0 items-center px-4 md:px-6 border-t bg-white/50 backdrop-blur-sm mt-8">
        <p className="text-xs text-gray-600">© 2023 Legalease. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-600 transition-colors" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}