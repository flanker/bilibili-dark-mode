import { useState } from "react"
import { useStorage } from "@plasmohq/storage"

function IndexPopup() {
  const [data, setData] = useState("")
  let [darkBiliToggle, setDarkBiliToggle] = useStorage<boolean>({key: "darkBiliToggle", area: "local"})
  if (typeof darkBiliToggle === "undefined") {
    darkBiliToggle = true
  }

  const toggleChecked = function(darkBiliToggle: boolean) {
    setDarkBiliToggle(darkBiliToggle)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {darkBiliToggle: darkBiliToggle})
    })
  }

  const linkClicked = function() {
    chrome.tabs.create({url: "https://flanker.github.io/bilibili-dark-mode"});
    return false;
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
      <div>
        <p>
          <a href={"https://flanker.github.io/bilibili-dark-mode"}
            onClick={(e) => linkClicked()}
          >
            网站
          </a>
        </p>
      </div>
    </div>
  )
}

export default IndexPopup
