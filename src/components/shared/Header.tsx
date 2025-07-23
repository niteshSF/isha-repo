import HdrImg from "@/assets/header_img.png"
import HdrBg from "@/assets/header_bg.png"
import TexturedButton from "@/components/shared/TexturedButton"
import { useLocation, useNavigate } from "react-router-dom"
import HelpDropdown from "../app/HelpDropdown"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: "Home", path: "/chant" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
   
  ];

  return (
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
      
{/* Navigation Buttons */}
          <nav className="flex gap-1 pr-4">
            {navItems.map(({ label, path }) => (
              <TexturedButton
                key={path}
                selected={location.pathname === path}
                onClick={() => navigate(path)}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </TexturedButton>
            ))}
            <HelpDropdown />
          </nav>

    </header>
  )
}

export default Header
