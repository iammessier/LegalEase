'use client'

import { useState, useEffect } from 'react'
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
  const [lawType, setLawType] = useState('')
  const [expandedResources, setExpandedResources] = useState(null)
  const [loading, setLoading] = useState(false)
  const [legalDocuments, setLegalDocuments] = useState([])

  const handleSubmitQuestion = (e) => {
    e.preventDefault()
    // Handle question submission logic here
    console.log('Question submitted:', { legalTopic, questionTitle, questionDescription })
  }

  useEffect(() => {
    // Simulating an API call that fetches legal documents
    setLoading(true);
    fetch('/api/auth/legal-documents') // Your API endpoint for fetching documents
      .then((response) => response.json())
      .then((data) => {
        setLegalDocuments(data.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching legal documents:', error);
        setLoading(false); // Stop loading even in case of an error
      });
  },[searchQuery, expandedResources]);

  const toggleResources = (resource) => {
    setExpandedResources(expandedResources === resource ? null : resource);
    setLegalTopic(resource);
    handleSearch();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
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
        <CardTitle>Legal Library</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Search legal documents..." 
          className="mb-4" 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <Button onClick={handleSearch}>Search</Button> {/* Search Button */}
          <h3 className="font-semibold mb-2">Popular Resources</h3>
          {/* Legal Resources Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Button 
              variant="outline"
              className="justify-start w-full bg-white text-black border border-gray-300"
              onClick={() => toggleResources('tenantRights')}>
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Tenant Rights Guide
            </Button>
            <Button 
              variant="outline"
              className="justify-start w-full bg-white text-black border border-gray-300"
              onClick={() => toggleResources('Small Business Regulations')}>
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Small Business Regulations
            </Button>
            <Button 
              variant="outline"
              className="justify-start w-full bg-white text-black border border-gray-300"
              onClick={() => toggleResources('NDPS')}>
              <BookOpenIcon className="h-4 w-4 mr-2" />
              NDPS
            </Button>
            <Button 
              variant="outline"
              className="justify-start w-full bg-white text-black border border-gray-300"
              onClick={() => toggleResources('Traffic Rules')}>
              <BookOpenIcon className="h-4 w-4 mr-2" />
              Traffic Rules
            </Button>
          </div>

          {/* Display Loading or Fetched Legal Documents */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {legalDocuments.map((doc) => (
            <li key={doc.id}>{doc.title}</li>
          ))}
        </ul>
      )}

              {expandedResources === 'tenantRights' && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-bold text-black mb-2"><strong>Rent:</strong></h3>
                   <p className="text-black mb-4">
                   If a landlord doesn't accept rent or provide a receipt,
                    or if there's uncertainty about who should receive the rent,
                    tenants can deposit the rent with the Rent Controlling Authority. 
                    This relieves the tenant of their obligation to pay the landlord.
                   </p>
                   <h3 className="font-bold text-black mb-2">Notice</h3>
                  <p className="text-black mb-4">
                    Tenants must provide notice to their landlord before vacating the premises,
                     as specified in the tenancy contract. If there's no contract or no notice provision, 
                     tenants should provide at least one month's notice.
                  </p>
                  <h3 className="font-bold text-black mb-2">Sub-letting</h3>
                  <p className="text-black">
                    Tenants can't sub-let or transfer their tenancy rights without the landlord's written consent.
                  </p>
                </div> 
              )}
              
              {expandedResources === 'NDPS' && (
                 <div className="p-4 mt-2 bg-white border shadow-md">
                 <h3 className="font-bold text-black mb-4">NDPS</h3>
                 <p className="text-black">
                 The Narcotic Drugs and Psychotropic Substances (NDPS) Act, 1985, is an Act of the Parliament of India that prohibits a person from producing,
                  manufacturing, possessing, selling, purchasing, transporting, storing, and distributing any narcotic drug 
                  or psychotropic substance. The Act extends to the whole of India, including the state of Madhya Pradesh.
                  In Madhya Pradesh, the NDPS Act is supplemented by various rules and regulations, including:
                 </p>
                 <h3 className="font-bold text-black mb-4">The Madhya Pradesh Narcotic Drugs and Psychotropic Substances Rules, 1989:</h3>
                 <p className="text-black">
                  These rules provide for the implementation of the NDPS Act in the state of Madhya Pradesh.
                  They cover aspects such as the licensing of opium cultivators, the regulation of opium trade,
                  and the disposal of seized drugs.
                 </p>
                 <h3 className="font-bold text-black mb-4">The Madhya Pradesh Excise Act, 1915:</h3>
                 <p className="text-black">
                 Although primarily an excise law, this Act also deals with certain aspects of drug control,
                 including the regulation of intoxicating drugs and the punishment for offenses related to drug abuse
                 </p>
               </div>
              )}
              {expandedResources === 'Small Business Regulations' && (
                 <div className="p-4 mt-2 bg-white border shadow-md">
                 <h3 className="font-bold text-black mb-4">Small Business Regulations</h3>
                 <p className="text-black">
                 To start a small business in Madhya Pradesh, you need to follow certain regulations
                  and obtain necessary licenses and registrations. Here are the key steps:
                 </p>
                 <h3 className="font-bold text-black mb-4">Obtain a Trade License:</h3>
                 <p className="text-black">
                 you need to obtain a trade license from the local municipal
                corporation or municipality to operate your business legally.
                 </p>
                 <h3 className="font-bold text-black mb-4">Register Your Business:</h3>
                 <p className="text-black">
                 You need to register your business with the Registrar of Firms (RoF) or the Shops and Establishments Act, 
                 depending on the type of business you are starting.
                 </p>
               </div>
              )}
              {expandedResources === 'Traffic Rules' && (
                 <div className="p-4 mt-2 bg-white border shadow-md">
                 <h3 className="font-bold text-black mb-4">Traffic Rules</h3>
                 <p className="text-black">
                 In India, traffic rules and regulations are governed by the Motor Vehicles Act, 1988,
                 and the Central Motor Vehicles Rules, 1989. Here are some key traffic rules and regulations in India,
                 including fast lanes and overtaking regulations:
                 </p>
                 <p className="text-black">
                 ** General Traffic Rules**:

Drive on the Left: In India, vehicles must drive on the left side of the road.

Right-Hand Traffic: In India, traffic keeps to the right, except when overtaking.

Speed Limits: Speed limits vary by state and type of vehicle, but generally, the maximum speed limit is 120 km/h on highways and 50 km/h in urban areas.

Use of Horns: Horns should only be used when necessary, and not in silent zones or between 10 pm and 6 am.

Use of Headlights: Headlights must be used at night, and dimmed when approaching oncoming traffic.

Fast Lanes and Overtaking:

Fast Lanes: Fast lanes are designated for faster-moving traffic, and slower-moving vehicles should keep to the left lane.

Overtaking: Overtaking is allowed on the right side, except when the vehicle in front is signaling to turn right or is stationary.

Lane Discipline: Vehicles must stay in their designated lane, and not change lanes without signaling.

Use of Indicators: Indicators must be used when changing lanes or turning.

Overtaking Prohibited: Overtaking is prohibited in certain areas, such as near schools, hospitals, and construction zones.

Additional Regulations:

Seat Belts: Seat belts are mandatory for drivers and front-seat passengers.

Helmets: Helmets are mandatory for two-wheeler riders and pillion riders.

Mobile Phone Use: Mobile phone use while driving is prohibited.

Parking: Parking is prohibited in certain areas, such as near traffic signals, pedestrian crossings, and bus stops.

Penalties for Violating Traffic Rules:

Penalties for violating traffic rules in India vary by state, but can include fines, imprisonment, or both.

Myths About Traffic Rules in India:

Myth: Traffic rules are not enforced in India.: Reality: Traffic rules are enforced in India, and violators can face penalties.

Myth: Traffic rules are not clear in India.: Reality: Traffic rules are clear in India, and are governed by the Motor Vehicles Act, 1988, and the Central Motor Vehicles Rules, 1989.

City-Based Traffic Laws in India:

Delhi: In Delhi, there are specific rules for parking, and vehicles are not allowed to park in certain areas.

Mumbai: In Mumbai, there are specific rules for using high-beam headlights, and vehicles are not allowed to use high-beam headlights in certain areas.

Chennai: In Chennai, there are specific rules for borrowing a car, and the owner of the car must be informed.

Kolkata: In Kolkata, there are specific rules for parking in front of public utility buildings or service spots.

Lane Driving Regulations in India:

Regulations Related to Driving: Drivers must keep to the left, and not drive against the flow of traffic.

Regulations Related to Overtaking: Overtaking is allowed on the right side, except when the vehicle in front is signaling to turn right or is stationary.

Regulations Related to Taking Turns: Drivers must signal before taking a turn, and must give way to pedestrians and other vehicles.

Remember to always follow traffic rules and regulations to ensure your safety and the safety of others on the road.
                 </p>
               </div>
              )}

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

        <div className="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <UserIcon className="h-6 w-6 mr-2 text-purple-600" />
        Find a Lawyer
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[300px] pr-4">
        <ul className="space-y-4">
          <li className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Lawyer 1" />
              <AvatarFallback>1</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Vishesh Bairagi</p>
              <p className="text-sm text-gray-600">Specialized in Criminal Law</p>
            </div>
          </li>
          <li className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/6.jpg" alt="Lawyer 2" />
              <AvatarFallback>2</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Divyansh Tiwari</p>
              <p className="text-sm text-gray-600">Specialized in Family Law</p>
            </div>
          </li>
          <li className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" alt="Lawyer 3" />
              <AvatarFallback>3</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Ashmit Singh Parihar</p>
              <p className="text-sm text-gray-600">Specialized in Business Law</p>
            </div>
          </li>
          <li className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/18.jpg" alt="Lawyer 4" />
              <AvatarFallback>4</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Hussain Kanchwala</p>
              <p className="text-sm text-gray-600">Specialized in Real Estate Law</p>
            </div>
          </li>
          <li className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://randomuser.me/api/portraits/men/3.jpg" alt="Lawyer 5" />
              <AvatarFallback>5</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Jayesh Fulgade</p>
              <p className="text-sm text-gray-600">Specialized in Employment Law</p>
            </div>
          </li>
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle className="flex items-center">
        <MessageCircleIcon className="h-6 w-6 mr-2 text-purple-600" />
        Real-Time Chat
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-4">
        Connect with a law student or legal professional for immediate assistance.
      </p>
      <Button className="w-full">Start Chat</Button>
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
      <p className="text-sm text-gray-600 mb-4">
        Quick access to legal rights information based on your location and topic.
      </p>
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
      <Button className="w-full mt-4">Get Information</Button>
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
              <p className="font-semibold">Arpit Raikwar</p>
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
    </div>
  );
}