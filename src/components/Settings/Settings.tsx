import { useState } from 'react'

type Props = {
  setCasingSetting: (value: string) => void
}

export const Settings = ({ setCasingSetting }: Props) => {
  const [settingsActive, setSettingsActive] = useState<boolean>(false)

  const renderSettingsButton = () => {
    return (
      <button className="settings-button" onClick={() => setSettingsActive(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    )
  }

  const renderSettings = () => {
    return (
      <div className="settings-content">
        <h3>Settings</h3>
        <h4>Lower or uppercase?</h4>
        <div className="casing-setting" onChange={() => setCasingSetting('lowercase')}>
          <label htmlFor="lowercase">Lowercase</label>
          <input id="lowercase" type="radio" defaultChecked name="casing-setting" />
        </div>
        <div className="casing-setting" onChange={() => setCasingSetting('uppercase')}>
          <label htmlFor="uppercase">Uppercase</label>
          <input id="uppercase" type="radio" name="casing-setting" />
        </div>
      </div>
    )
  }
  return (
    <div className="settings-container" onMouseLeave={() => setSettingsActive(false)}>
      {settingsActive ? renderSettings() : renderSettingsButton()}
    </div>
  )
}
