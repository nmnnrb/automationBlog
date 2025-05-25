'use client'
import { CirclePlus, Eye, Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = () => {
  const pathnamePosts = ["/all-post", "/daily-tracker-post"]
  const router = useRouter();
  const pathname = usePathname()

  const [mobileMenu, setMobileMenu] = useState(false)
  const linksData = [
    { link: "/create-blog", label: "Post", icon: <CirclePlus className="w-5 h-5" /> , bgColor: "bg-blue-600", bgColorHover: "hover:bg-blue-700" },
    { link: "/create-tracker-post", label: "Tracker", icon: <CirclePlus className="w-5 h-5" />, bgColor: "bg-blue-600", bgColorHover: "hover:bg-blue-700" },
    { link: "/all-post", label: "Blog", icon: <Eye className="w-5 h-5" />, bgColor: "bg-green-600", bgColorHover: "hover:bg-green-700" },
    { link: "/daily-tracker-post", label: "Tracker", icon: <Eye className="w-5 h-5" />, bgColor: "bg-green-600", bgColorHover: "hover:bg-green-700" }
  ]

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-violet-600 to-violet-800 shadow-md">
      <div className="flex items-center justify-between px-2 sm:px-4 h-14 sm:h-16">
        {/* Logo */}
        <div className="flex-shrink-0 text-white text-lg sm:text-2xl font-bold whitespace-nowrap">
          <span className="playpen-sans-hebrew-title">Blog Automation</span>
        </div>
        {/* Desktop Links */}
        <div className="hidden md:flex gap-2 sm:gap-5 items-center">
          {linksData.map((links, index) => (
            links.link !== pathname && (
              <button
                key={index}
                onClick={() => router.push(links.link)}
                className={`flex gap-1 items-center text-white ${links.bgColor} ${links.bgColorHover} font-black transition duration-300 px-3 py-1 rounded-xl`}
              >
                {links.icon} {links.label}
              </button>
            )
          ))}
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex items-center text-white justify-center p-2"
          onClick={() => setMobileMenu(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>
      {/* Mobile Slide Menu */}
      {mobileMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-50"
            onClick={() => setMobileMenu(false)}
          />
          {/* Slide Menu */}
          <div className="fixed top-0 left-0 h-full w-64 max-w-[80vw] bg-gradient-to-b from-violet-700 to-violet-900 shadow-lg z-50 flex flex-col p-6 animate-slidein">
          <div className="flex">
            <span className="playpen-sans-hebrew-title text-white text-md mb-4">Blog Automation</span>
              <button
              className="self-end mb-6 text-white text-2xl"
              onClick={() => setMobileMenu(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
             
          </div>
            {linksData.map((links, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMobileMenu(false);
                  router.push(links.link);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-2 font-bold text-white hover:bg-violet-800 transition w-full text-left ${
                  pathname === links.link ? "bg-violet-900" : ""
                }`}
              >
                {links.icon} {links.label}
              </button>
            ))}
          </div>
          {/* Slide-in animation */}
          <style jsx global>{`
            @keyframes slidein {
              from { transform: translateX(-100%); }
              to { transform: translateX(0); }
            }
            .animate-slidein {
              animation: slidein 0.25s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </>
      )}
    </nav>
  )
}

export default Navbar