
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const  CreateNewAccount = () => {
  return (
    (<div className="min-h-screen flex items-center justify-center bg-[#0a0e27]">
      <div
        className="flex flex-col md:flex-row items-center justify-between p-8 space-y-8 md:space-y-0 md:space-x-8 max-w-6xl w-full">
        <div className="text-white space-y-4 max-w-md">
          <div className="flex items-center space-x-2">
            <LogInIcon className="w-8 h-8" />
            <span className="text-xl font-bold">LegalEase</span>
          </div>
          <h1 className="text-4xl font-bold">Create New Account</h1>
          <p className="text-lg">
            Already Registered?{" "}
            <a href="#" className="underline">
              Login
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean semper mauris in magna venenatis suscipit.
          </p>
          <Button className="bg-[#ff5e3a] text-white px-6 py-2 rounded-md">Learn More</Button>
        </div>
        <Card
          className="bg-white bg-opacity-10 p-8 rounded-md backdrop-blur-md max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-white text-2xl font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Francois Mercer"
                className="bg-white bg-opacity-20 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                placeholder="hello@reallygreatsite.com"
                type="email"
                className="bg-white bg-opacity-20 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                placeholder="********"
                type="password"
                className="bg-white bg-opacity-20 text-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-white">
                Date of Birth
              </Label>
              <Select>
                <SelectTrigger
                  id="dob"
                  aria-label="Date of Birth"
                  className="bg-white bg-opacity-20 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-[#ff5e3a] text-white px-6 py-2 rounded-md">Sign Up</Button>
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}

function LogInIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>)
  );
}

export default CreateNewAccount;