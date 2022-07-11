import * as Popover from '@radix-ui/react-popover'
import * as React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import { observer } from 'mobx-react-lite'
import { useGame } from '~hooks/useGameContext'
import { GameSettings } from '~game'

export const Settings = observer(function Settings() {
  const { game } = useGame()

  const handleCasingValueChange = React.useCallback((value: GameSettings['casing']) => {
    game.dispatch({ type: 'change_setting', setting: { casing: value } })
  }, [])

  const handleIgnoreCasingValueChange = React.useCallback((value: GameSettings['ignoreCasing']) => {
    game.dispatch({ type: 'change_setting', setting: { ignoreCasing: value } })
  }, [])

  return (
    <Popover.Root>
      <Popover.Anchor className="settings-anchor">
        <Popover.Trigger asChild>
          <button className="settings-button">
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
        </Popover.Trigger>
      </Popover.Anchor>
      <Popover.Content className="settings-content" sideOffset={8}>
        <h3>Settings</h3>
        <h4>Casing</h4>
        <div className="section">
          <RadioGroup.Root
            dir="ltr"
            value={game.settings.casing}
            onValueChange={handleCasingValueChange}
          >
            <RadioGroup.Item value="lower">
              <span>Lowercase</span>
              <RadioCheckmark />
            </RadioGroup.Item>
            <RadioGroup.Item value="upper">
              <span>Uppercase</span>
              <RadioCheckmark />
            </RadioGroup.Item>
            <RadioGroup.Item value="start">
              <span>Startcase</span>
              <RadioCheckmark />
            </RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <Checkbox.Root
            dir="ltr"
            className="settings-button"
            checked={game.settings.ignoreCasing}
            onCheckedChange={handleIgnoreCasingValueChange}
          >
            <span>Ignore Casing</span>
            <CheckboxCheckmark />
          </Checkbox.Root>
        </div>
      </Popover.Content>
    </Popover.Root>
  )
})

const Checkmark = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="checkmark"
  >
    <path
      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
      fill="currentColor"
    ></path>
  </svg>
)

const RadioCheckmark = () => {
  return (
    <RadioGroup.Indicator asChild>
      <Checkmark />
    </RadioGroup.Indicator>
  )
}
const CheckboxCheckmark = () => {
  return (
    <Checkbox.Indicator asChild>
      <Checkmark />
    </Checkbox.Indicator>
  )
}
