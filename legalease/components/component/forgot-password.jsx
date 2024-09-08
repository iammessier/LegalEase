import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 text-white mb-8 md:mb-0 md:pr-8">
          <div className="mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF6B4A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-[#FF6B4A]">LegalEase</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Forgot The Password</h1>
          <h2 className="text-2xl mb-4">New Password</h2>
          <p className="mb-6 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.
          </p>
          <Button className="bg-[#FF6B4A] hover:bg-[#FF6B4A]/90 text-white">Learn More</Button>
        </div>
        <Card className="w-full md:w-1/2 bg-[#2A3A5F]/50 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  EMAIL
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@reallygreatsite.com"
                  className="bg-[#2A3A5F] border-[#2A3A5F] text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium">
                  OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="bg-[#2A3A5F] border-[#2A3A5F] text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">
                  NEW PASSWORD
                </label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-[#2A3A5F] border-[#2A3A5F] text-white placeholder-gray-400"
                />
              </div>
              <Button className="w-full bg-[#FF6B4A] hover:bg-[#FF6B4A]/90 text-white">Send</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}