import React, { useEffect, useState } from 'react'
import { useStorage } from '@plasmohq/storage/hook'

import { version } from '../package.json'

import './index.css'

type Mode = 'dark' | 'light' | 'system'

const LINKS = {
  github: 'https://github.com/flanker/bilibili-dark-mode',
  website: 'https://darkbili.com',
  coffee: 'https://zhichao.jsjform.com/f/Ah3ZWx'
}

const STORE_LINKS = {
  chrome: 'https://chromewebstore.google.com/detail/darkbili-dark-mode-for-bi/kpjklikhldpeiibfhadeogaaeenhffba',
  edge: 'https://microsoftedge.microsoft.com/addons/detail/darkbili-dark-mode-for-/nbabimeobioggknlhdndgigjndphjmbi',
  firefox: 'https://addons.mozilla.org/zh-CN/firefox/addon/darkbili/'
}

// review in the store the extension was installed from
const reviewLink = () => {
  const ua = navigator.userAgent
  if (ua.includes('Firefox/')) return STORE_LINKS.firefox
  if (ua.includes('Edg/')) return STORE_LINKS.edge
  return STORE_LINKS.chrome
}

const openTab = (url: string) => chrome.tabs.create({ url })

const useSystemDark = () => {
  const query = '(prefers-color-scheme: dark)'
  const [dark, setDark] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setDark(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return dark
}

// Same drawing as images/logo.svg; awake = eyes open (dark mode off)
const TvLogo = ({ awake }: { awake: boolean }) => (
  <svg className="logo" viewBox="0 0 128 128" aria-hidden="true">
    <path d="M55 30 L38 11" stroke="#2AABE8" strokeWidth="9" strokeLinecap="round" />
    <path d="M73 30 L90 11" stroke="#2AABE8" strokeWidth="9" strokeLinecap="round" />
    <rect x="27" y="100" width="18" height="16" rx="6" fill="#2AABE8" />
    <rect x="83" y="100" width="18" height="16" rx="6" fill="#2AABE8" />
    <rect x="8" y="27" width="112" height="82" rx="24" fill="#2AABE8" />
    <rect x="20" y="39" width="88" height="58" rx="13" fill="#151A2E" />
    {awake ? (
      <g fill="#FFFFFF">
        <circle cx="45" cy="68" r="7" />
        <circle cx="83" cy="68" r="7" />
      </g>
    ) : (
      <>
        <g fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round">
          <path d="M36 67 Q45 76 54 67" />
          <path d="M74 67 Q83 76 92 67" />
        </g>
        <path
          className="logo-z"
          d="M86 47 H96 L86 57 H96"
          fill="none"
          stroke="#FFD66B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </g>
  </svg>
)

const SystemIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 4h6.5A2.5 2.5 0 0 1 21 6.5v8a2.5 2.5 0 0 1-2.5 2.5H12Z" fill="currentColor" />
    <path d="M8.5 21h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 15 15" aria-hidden="true">
    <path
      d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9h12v5.5A4.5 4.5 0 0 1 11.5 19h-3A4.5 4.5 0 0 1 4 14.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

const MODES: { value: Mode; label: string; icon: () => JSX.Element }[] = [
  { value: 'dark', label: '暗色', icon: MoonIcon },
  { value: 'light', label: '亮色', icon: SunIcon },
  { value: 'system', label: '跟随系统', icon: SystemIcon }
]

function IndexPopup() {
  // for legacy config
  const [darkBiliToggle] = useStorage<boolean>('darkBiliToggle')

  // new config
  const [darkBiliMode, setDarkBiliMode] = useStorage<string>('darkBiliMode')

  const systemDark = useSystemDark()

  const mode = (darkBiliMode ||
    (typeof darkBiliToggle === 'undefined' ? 'dark' : darkBiliToggle ? 'dark' : 'light')) as Mode
  const darkOn = mode === 'dark' || (mode === 'system' && systemDark)

  const hints: Record<Mode, string> = {
    dark: 'B 站页面始终使用暗色',
    light: '已暂停，显示 B 站原本的样子',
    system: `跟随系统外观，现在是${systemDark ? '深色' : '浅色'}`
  }

  const modeChanged = (value: Mode) => {
    setDarkBiliMode(value)

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (tabId === undefined) return
      // the active tab may not be a bilibili page (no content script there)
      chrome.tabs.sendMessage(tabId, { darkBiliMode: value }, () => void chrome.runtime.lastError)
    })
  }

  return (
    <main className="popup">
      <header className="header">
        <TvLogo awake={!darkOn} />
        <div>
          <h1 className="title">DarkBili</h1>
          <p className="subtitle">B 站暗色模式，深夜刷视频不刺眼</p>
        </div>
      </header>

      <div className="modes" role="radiogroup" aria-label="模式">
        {MODES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={mode === value}
            className={`mode${mode === value ? ' active' : ''}`}
            onClick={() => modeChanged(value)}>
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <p className="hint">{hints[mode]}</p>

      <nav className="links">
        <button type="button" className="link" onClick={() => openTab(LINKS.github)}>
          <GithubIcon />
          代码
        </button>
        <button type="button" className="link" onClick={() => openTab(reviewLink())}>
          <StarIcon />
          评价
        </button>
        <button type="button" className="link" onClick={() => openTab(LINKS.website)}>
          <HomeIcon />
          官网
        </button>
      </nav>
      <button type="button" className="coffee" onClick={() => openTab(LINKS.coffee)}>
        <CoffeeIcon />
        请开发者喝一杯咖啡
      </button>

      <footer className="footer">v{version}</footer>
    </main>
  )
}

export default IndexPopup
