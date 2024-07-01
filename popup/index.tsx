import React from 'react'
import { useStorage } from '@plasmohq/storage/hook'

import '@radix-ui/themes/styles.css'
import './index.css'
import { Container, Text, Flex, Heading, SegmentedControl, Theme, Link, Card } from '@radix-ui/themes'

function IndexPopup() {
  // for legacy config
  const [darkBiliToggle] = useStorage<boolean>('darkBiliToggle')

  // new config
  const [darkBiliMode, setDarkBiliMode] = useStorage<string>('darkBiliMode')

  const modeChanged = function (mode: string) {
    setDarkBiliMode(mode)

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { darkBiliMode: mode })
    })
  }

  const githubClicked = function () {
    chrome.tabs.create({ url: 'https://github.com/flanker/bilibili-dark-mode' })
  }

  const chromeStoreClicked = function () {
    chrome.tabs.create({
      url: 'https://chromewebstore.google.com/detail/darkbili-dark-mode-for-bi/kpjklikhldpeiibfhadeogaaeenhffba'
    })
  }

  const webSiteClicked = function () {
    chrome.tabs.create({ url: 'https://darkbili.com' })
  }

  const buymeacoffeeClicked = function () {
    chrome.tabs.create({ url: 'https://buymeacoffee.com/fengzhichao' })
  }

  return (
    <Theme appearance="dark">
      <Container p="3" style={{ width: '280px', backgroundColor: 'var(--gray-a2)' }}>
        <Heading size="4" align="center">
          DarkBili
        </Heading>
        <Text as="p" align="center" size="1" color="gray" my="3">
          一键切换，即可享受B站黑暗模式观看体验。
        </Text>
        <Card>
          <Flex my="2" justify="center">
            <Text as="label" size="2" align="center">
              <Flex align="center" gap="2">
                <SegmentedControl.Root
                  size="1"
                  value={
                    darkBiliMode || (typeof darkBiliToggle === 'undefined' ? 'dark' : darkBiliToggle ? 'dark' : 'light')
                  }
                  onValueChange={(value) => modeChanged(value)}>
                  <SegmentedControl.Item value="dark">暗色</SegmentedControl.Item>
                  <SegmentedControl.Item value="light">亮色</SegmentedControl.Item>
                  <SegmentedControl.Item value="system">跟随系统</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Flex>
            </Text>
          </Flex>
        </Card>
        <Flex mt="3" align="center" justify="center">
          <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
          </svg>
          <Link size="1" onClick={githubClicked} ml="1" mr="3" className="cursor-pointer">
            代码
          </Link>

          <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.89346 2.35248C3.49195 2.35248 2.35248 3.49359 2.35248 4.90532C2.35248 6.38164 3.20954 7.9168 4.37255 9.33522C5.39396 10.581 6.59464 11.6702 7.50002 12.4778C8.4054 11.6702 9.60608 10.581 10.6275 9.33522C11.7905 7.9168 12.6476 6.38164 12.6476 4.90532C12.6476 3.49359 11.5081 2.35248 10.1066 2.35248C9.27059 2.35248 8.81894 2.64323 8.5397 2.95843C8.27877 3.25295 8.14623 3.58566 8.02501 3.88993C8.00391 3.9429 7.98315 3.99501 7.96211 4.04591C7.88482 4.23294 7.7024 4.35494 7.50002 4.35494C7.29765 4.35494 7.11523 4.23295 7.03793 4.04592C7.01689 3.99501 6.99612 3.94289 6.97502 3.8899C6.8538 3.58564 6.72126 3.25294 6.46034 2.95843C6.18109 2.64323 5.72945 2.35248 4.89346 2.35248ZM1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.0084 1.35248 6.73504 1.76049 7.20884 2.2953C7.32062 2.42147 7.41686 2.55382 7.50002 2.68545C7.58318 2.55382 7.67941 2.42147 7.79119 2.2953C8.265 1.76049 8.99164 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
          </svg>
          <Link size="1" onClick={chromeStoreClicked} ml="1" mr="3" className="cursor-pointer">
            评价
          </Link>

          <svg width="12" height="12" viewBox="-1 -1 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
          </svg>
          <Link size="1" onClick={webSiteClicked} ml="1" className="cursor-pointer">
            官网
          </Link>
        </Flex>
        <Flex mt="3" align="center" justify="center">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82708 7.49972C1.82708 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82708 10.6327 1.82708 7.49972ZM5.03747 9.21395C4.87949 8.98746 4.56782 8.93193 4.34133 9.08991C4.11484 9.24789 4.05931 9.55956 4.21729 9.78605C4.93926 10.8211 6.14033 11.5 7.50004 11.5C8.85974 11.5 10.0608 10.8211 10.7828 9.78605C10.9408 9.55956 10.8852 9.24789 10.6587 9.08991C10.4323 8.93193 10.1206 8.98746 9.9626 9.21395C9.41963 9.99238 8.51907 10.5 7.50004 10.5C6.481 10.5 5.58044 9.99238 5.03747 9.21395ZM5.37503 6.84998C5.85828 6.84998 6.25003 6.45815 6.25003 5.97498C6.25003 5.4918 5.85828 5.09998 5.37503 5.09998C4.89179 5.09998 4.50003 5.4918 4.50003 5.97498C4.50003 6.45815 4.89179 6.84998 5.37503 6.84998ZM10.5 5.97498C10.5 6.45815 10.1083 6.84998 9.62503 6.84998C9.14179 6.84998 8.75003 6.45815 8.75003 5.97498C8.75003 5.4918 9.14179 5.09998 9.62503 5.09998C10.1083 5.09998 10.5 5.4918 10.5 5.97498Z"
              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
          </svg>
          <Link size="1" onClick={buymeacoffeeClicked} ml="1" mr="3" className="cursor-pointer">
            buy me a coffee
          </Link>
        </Flex>
      </Container>
    </Theme>
  )
}

export default IndexPopup
