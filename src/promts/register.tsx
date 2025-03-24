import Link from "next/link"
import { Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function CreateAccount() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#dddddd] p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-[#ff385c] font-bold text-2xl">
            <span className="flex items-center gap-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.5 9.5L12 6L8.5 9.5"
                  stroke="#ff385c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 6V14" stroke="#ff385c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M19.5 15.5C19.5 19.09 16.59 22 13 22L14.5 20"
                  stroke="#ff385c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.5 8.5C4.5 4.91 7.41 2 11 2L9.5 4"
                  stroke="#ff385c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                Air<span className="font-normal">Booking</span>
              </span>
            </span>
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-2">
              <Menu className="h-6 w-6 text-black" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link href="#" className="w-full">
                Contact
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#" className="w-full">
                About
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="#" className="w-full">
                Features
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Help Center</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Link href="#" className="w-full">
                    FAQs
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="w-full">
                    Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#" className="w-full">
                    Contact Support
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md border border-[#dddddd] rounded-lg p-8">
          <h1 className="text-[#ff385c] text-2xl font-medium mb-6">Create account</h1>

          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[#222222] mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="your full name her ..."
                className="w-full p-3 border border-[#dddddd] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff385c]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-[#222222] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="w-full p-3 border border-[#dddddd] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff385c]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-[#222222] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="strong password"
                className="w-full p-3 border border-[#dddddd] rounded-md focus:outline-none focus:ring-1 focus:ring-[#ff385c]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff385c] text-white py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
            >
              Continue
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#dddddd]"></div>
            <span className="px-4 text-[#717171]">or</span>
            <div className="flex-1 border-t border-[#dddddd]"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full border border-[#dddddd] rounded-md p-3 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>

            <button className="w-full border border-[#dddddd] rounded-md p-3 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="#0866ff"
                  d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9 21.59 18.03 20.4 19.6 18.64C21.18 16.88 22.1 14.64 22.1 12.33C22.1 6.53 17.5 2.04 12 2.04Z"
                />
              </svg>
            </button>

            <button className="w-full border border-[#dddddd] rounded-md p-3 flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-[#717171]">
            <p>
              By signing in or creating an account, you agree with our{" "}
              <Link href="#" className="text-[#222222] underline">
                Terms & conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-[#222222] underline">
                Privacy statement
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

