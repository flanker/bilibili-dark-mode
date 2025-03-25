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

const isBlackboardPage = () => {
  const currentPath = window.location.pathname
  return currentPath.includes('/blackboard/')
}

// actually switch dark toggle (dark/light)
export const switchToggle = (darkBiliToggle: boolean) => {
  const htmlElement = document.getElementsByTagName('html')[0]
  if (darkBiliToggle && !isSkippedPage()) {
    htmlElement.classList.add('dark-bili')

    if (isBlackboardPage()) {
      htmlElement.classList.add('dark-bili-blackboard')
    }
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

/* User space: Handle .h-inner (https://github.com/flanker/bilibili-dark-mode/issues/28) */

// Constants
const DEBOUNCE_DELAY = 100;
const SELECTORS = {
  H_INNER: '.h-inner',
  BACKGROUND_LAYER: 'h-inner-background'
} as const;

// Debounce function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
}

// Handle user space background image
function handleProfileBackground(): void {
  try {
    const hInner = document.querySelector<HTMLElement>(SELECTORS.H_INNER);
    if (!hInner) return;

    // Avoid duplicate processing
    if (hInner.querySelector(`.${SELECTORS.BACKGROUND_LAYER}`)) return;

    // Get background image URL
    const style = window.getComputedStyle(hInner);
    const backgroundImage = style.backgroundImage;
    if (!backgroundImage || backgroundImage === 'none') return;

    // Create background layer
    const backgroundLayer = document.createElement('div');
    backgroundLayer.className = SELECTORS.BACKGROUND_LAYER;
    backgroundLayer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: ${backgroundImage};
      background-size: cover;
      background-position: center;
      z-index: -1;
    `;

    // Clear original background image
    hInner.style.backgroundImage = 'none';

    // Add background layer
    hInner.appendChild(backgroundLayer);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error handling user space background:', error.message);
    } else {
      console.error('Error handling user space background:', error);
    }
  }
}

// Use debounce for DOM changes
const debouncedHandleProfileBackground = debounce(handleProfileBackground, DEBOUNCE_DELAY);

// Initialize observer
function initObserver(): void {
  // Execute after page load
  document.addEventListener('DOMContentLoaded', handleProfileBackground);

  // Watch DOM changes for dynamic content loading
  const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        debouncedHandleProfileBackground();
        break;
      }
    }
  });

  // Start observing after DOM is ready
  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}

// Initialize
initObserver();

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
