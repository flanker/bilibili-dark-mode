import { useState } from "react"
import { useStorage } from "@plasmohq/storage"

function IndexPopup() {
  const [data, setData] = useState("")
  let [darkBiliToggle, setDarkBiliToggle] = useStorage<boolean>("darkBiliToggle")
  if (typeof darkBiliToggle === "undefined") {
    darkBiliToggle = true
  }

  const toggleChecked = function(darkBiliToggle: boolean) {
    setDarkBiliToggle(darkBiliToggle)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {darkBiliToggle: darkBiliToggle})
    })
  }

  return (
    <div
      style={{
        minWidth: "180px",
        padding: 16
      }}>
      <div>
        <strong>DarkBili</strong>
      </div>
      <hr />
      <div>
        <label>
          <input
            type={"checkbox"}
            checked={darkBiliToggle}
            onChange={(e) => toggleChecked(e.target.checked)}
          />
          <span>Dark Mode</span>
        </label>
      </div>
    </div>
  )
}

export default IndexPopup
