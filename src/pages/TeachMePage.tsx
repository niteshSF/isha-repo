import BaseLayout from "@/layouts/BaseLayout"
import LeftScroll from "@/components/app/LeftScroll"
import SearchBar from "@/components/app/SearchBar"
import RightScroll from "@/components/app/RightScroll"
import SutraView from "@/components/app/SutraView"
import MeaningView from "@/components/app/MeaningView"
import ButtonsPanel from "@/components/app/ButtonsPanel"

import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import TexturedButton from "@/components/shared/TexturedButton";
import HdrImg from "@/assets/header_img.png"
import HdrBg from "@/assets/header_bg.png"
import dropdownImg from "@/assets/light_bar.png"

export default function TeachMePage() {

  const navigate = useNavigate()
  const location = useLocation()

  const [openDropdown, setOpenDropdown] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
    {
      label: "Help",
      subItems: [
        {
          label: "Scheme Of Diacritical Marks",
          path: "/help/SchemeOfDiacriticalMarks",
        },
        { label: "Contact Us", path: "/help/ContactUS" },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <BaseLayout>
      {/* <Header /> */}

      {/* ================= Header ================= */}
<header
      className="flex justify-between items-center drop-shadow-lg"
      style={{
        backgroundImage: `url(${HdrBg})`,
      }}
    >
      <div className="flex gap-6 items-center justify-between">
        <img src={HdrImg} alt="Header Image" className="h-24" />
        <div
          className="text-center hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h2 className="text-darkbrown font-bold text-2xl">ईशावास्योपनिषद्</h2>
          <h2 className="text-darkorange font-bold text-2xl">
            Īśāvāsyopaniṣad
          </h2>
        </div>
      </div>
      <div
        className="text-center hover:cursor-pointer"
      >
        <h1 className="text-darkbrown font-bold text-2xl">
          Sanskrit Knowledge Accessor
        </h1>
        <h2 className="text-darkorange font-bold text-xl">Upanishad Reader</h2>
      </div>
      {/* Right – Navigation */}
          <nav className="flex gap-1 pr-4 relative" ref={dropdownRef}>
            {navItems.map((item) => {
              if (!item.subItems) {
                return (
                  <TexturedButton
                    key={item.path}
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </TexturedButton>
                )
              }

              return (
                <div key={item.label} className="relative">
                  <TexturedButton
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === item.label ? "" : item.label
                      )
                    }
                    aria-haspopup="menu"
                  >
                    {item.label} ▾
                  </TexturedButton>

                  {openDropdown === item.label && (
                    <div
                      role="menu"
                      className="absolute right-0 -mt-1.5 z-10 rounded-md shadow-lg border-gray-300"
                      style={{
                        minWidth: "230px",
                        backgroundImage: `url(${dropdownImg})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      {item.subItems.map((sub, idx) => (
                        <React.Fragment key={sub.path}>
                          <button
                            onClick={() => {
                              navigate(sub.path)
                              setOpenDropdown("")
                            }}
                            className="px-4 py-2 text-left text-sm text-black hover:bg-white font-bold w-full"
                          >
                            {sub.label}
                          </button>
                          {idx < item.subItems.length - 1 && (
                            <div className="border-t border-gray-300 mx-2" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
    </header>

      {/* ===================================================================================== */}
      <div className="flex justify-center gap-4 mt-5">
        <LeftScroll />
        <div className="flex-grow max-w-4xl">
          {/* <SearchBar /> */}
          <SutraView />
          <MeaningView />
          <ButtonsPanel />
        </div>
        <RightScroll isCommentary={false}/>
      </div>
    </BaseLayout>
  )
}
