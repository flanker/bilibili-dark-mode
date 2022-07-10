import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: [
    "https://*.bilibili.com/*"
  ]
}

import cssText from "./dark-mode.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const initDarkMode = () => {
  console.log('Dark Mode initialized.')
}

window.addEventListener("load", () => {
  initDarkMode();
})
