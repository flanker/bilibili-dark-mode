import { Storage } from '@plasmohq/storage'
import type { PlasmoCSConfig } from 'plasmo'

export const config: PlasmoCSConfig = {
  matches: ['https://*.bilibili.com/*'],
  run_at: 'document_start'
}

import cssText from './dark-mode.css'

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

// following pages are already in dark mode
const isSkippedPage = () => {
  const pagesAlreadyInDark = ['/movie/', '/tv/', '/documentary/', '/variety/']
  const currentPath = window.location.pathname
  return pagesAlreadyInDark.includes(currentPath)
}

// actually switch dark toggle (dark/light)
export const switchToggle = (darkBiliToggle: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (darkBiliToggle && !isSkippedPage()) {
    htmlElement.classList.add('dark-bili')
  } else {
    htmlElement.classList.remove('dark-bili')
  }

  console.log('Dark Toggle switched to ' + darkBiliToggle)
}

// switch dark mode (dark/light/system)
export const switchMode = (darkBiliMode: string) => {
  console.log('Dark Mode is ' + darkBiliMode)

  if (darkBiliMode === 'dark') {
    switchToggle(true)
  } else if (darkBiliMode === 'light') {
    switchToggle(false)
  } else {
    const isDarkMode = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    switchToggle(isDarkMode())
  }
}

// load or reload dark mode
const loadDarkMode = () => {
  const storage = new Storage()
  storage.get<string>('darkBiliMode').then((darkBiliMode) => {
    if (typeof darkBiliMode === 'undefined') {
      storage.get<boolean>('darkBiliToggle').then((darkBiliToggle) => {
        if (typeof darkBiliToggle === 'undefined') {
          switchMode('dark')
        } else {
          switchMode(darkBiliToggle ? 'dark' : 'light')
        }
      })
    } else {
      switchMode(darkBiliMode)
    }
  })
}

// init dark mode
loadDarkMode()

// when popup changes the mode
chrome.runtime.onMessage.addListener(function (request) {
  switchMode(request.darkBiliMode)
})

// when system dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  loadDarkMode()
})
