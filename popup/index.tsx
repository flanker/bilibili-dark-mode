import React from 'react'
import { useStorage } from '@plasmohq/storage/hook'
import { Button, Card, Space, Switch, Typography } from 'antd'

import './index.css'

const { Text, Title } = Typography

function IndexPopup() {
  const [darkBiliToggle, setDarkBiliToggle] = useStorage<boolean>('darkBiliToggle')

  const toggleChecked = function (darkBiliToggle: boolean) {
    setDarkBiliToggle(darkBiliToggle)

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { darkBiliToggle: darkBiliToggle })
    })
  }

  const websiteClicked = function () {
    chrome.tabs.create({ url: 'https://flanker.github.io/bilibili-dark-mode' })
  }

  const githubClicked = function () {
    chrome.tabs.create({ url: 'https://github.com/flanker/bilibili-dark-mode' })
  }

  return (
    <div
      style={{
        minWidth: '260px',
        padding: 16
      }}>
      <Title style={{ fontSize: 24 }}>DarkBili</Title>
      <Text>bilibili.com 夜间模式</Text>
      <Space direction="vertical" size="middle">
        <Card title="设置" size="small" style={{ width: 220 }}>
          <label>
            <Space>
              <Switch checked={darkBiliToggle} onChange={(checked) => toggleChecked(checked)} />
              <span>夜间模式</span>
            </Space>
          </label>
        </Card>
      </Space>
      <Space direction="vertical" size="middle">
        <Card title="插件信息" size="small" style={{ width: 220 }}>
          <Space>
            <Button onClick={websiteClicked}>访问网站</Button>
            <Button onClick={githubClicked}>Github</Button>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default IndexPopup
