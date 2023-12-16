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

const isSkippedPage = () => {
  const pagesAlreadyInDark = ['/movie/', '/tv/', '/documentary/', '/variety/']
  const currentPath = window.location.pathname
  return pagesAlreadyInDark.includes(currentPath)
}

export const switchToggle = (darkBiliToggle: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (darkBiliToggle && !isSkippedPage()) {
    htmlElement.classList.add('dark-bili')
  } else {
    htmlElement.classList.remove('dark-bili')
  }

  console.log('Dark Mode switched to ' + darkBiliToggle)
}

const storage = new Storage()
storage.get<boolean>('darkBiliToggle').then((darkBiliToggle) => {
  if (typeof darkBiliToggle === 'undefined') {
    switchToggle(true)
  } else {
    switchToggle(darkBiliToggle)
  }
})

chrome.runtime.onMessage.addListener(function (request) {
  switchToggle(request.darkBiliToggle)
})
