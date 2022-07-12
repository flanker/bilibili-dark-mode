import type { PlasmoContentScript } from "plasmo"
import { Storage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  matches: [
    "https://*.bilibili.com/*"
  ],
  run_at: 'document_start'
}

import cssText from "./dark-mode.css"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const swithToggle = (darkBiliToggle: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (darkBiliToggle) {
    htmlElement.classList.add("dark-bili");
  } else {
    htmlElement.classList.remove("dark-bili");
  }

  console.log('Dark Mode swithed to ' + darkBiliToggle)
}

const storage = new Storage()
const darkBiliToggleString = storage.get("darkBiliToggle").then((darkBiliToggleString) => {
  const darkBiliToggle = !(darkBiliToggleString === "false")
  swithToggle(darkBiliToggle)
})


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    swithToggle(request.darkBiliToggle)
  }
);
