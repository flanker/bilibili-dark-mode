import type { PlasmoCSConfig } from "plasmo"
import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
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

export const switchToggle = (darkBiliToggle: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (darkBiliToggle) {
    htmlElement.classList.add("dark-bili");
  } else {
    htmlElement.classList.remove("dark-bili");
  }

  console.log('Dark Mode swithed to ' + darkBiliToggle)
}

const storage = new Storage()
const darkBiliToggleString = storage.get<boolean>("darkBiliToggle").then((darkBiliToggle) => {
  if (typeof darkBiliToggle === "undefined") {
    switchToggle(true)
  } else {
    switchToggle(darkBiliToggle)
  }
})

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switchToggle(request.darkBiliToggle)
  }
);
