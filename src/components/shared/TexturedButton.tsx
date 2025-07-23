import React from "react"
import BtnTexture from "@/assets/button_texture.png"
import BtnTextureDark from "@/assets/button_texture_dark.png"
import { cn } from "@/lib/utils"

interface TexturedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: React.ReactNode
  selected?: boolean
}

const TexturedButton = ({
  className,
  children,
  selected = false,
  ...props
}: TexturedButtonProps) => {
  return (
    <button
      className={cn(
        `inline-block px-6 pt-2 pb-3 font-bold items-center ${
          selected ? "text-white" : "text-darkorange"
        }`,
        className,
      )}
      style={{
        backgroundImage: `url(${selected ? BtnTextureDark : BtnTexture})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundImage = `url(${BtnTextureDark})`
          e.currentTarget.classList.add("text-white")
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundImage = `url(${BtnTexture})`
          e.currentTarget.classList.remove("text-white")
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default TexturedButton
