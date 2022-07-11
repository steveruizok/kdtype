import * as Popover from '@radix-ui/react-popover'
import * as React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import { observer } from 'mobx-react-lite'
import { useGame } from '~hooks/useGameContext'
import { GameSettings } from '~game'
import { CheckmarkIcon } from '~components/icons/CheckmarkIcon'
import { SettingsIcon } from '~components/icons/SettingsIcon'

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
            <SettingsIcon />
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
              <span>Lower</span>
              <RadioCheckmark />
            </RadioGroup.Item>
            <RadioGroup.Item value="upper">
              <span>Upper</span>
              <RadioCheckmark />
            </RadioGroup.Item>
            <RadioGroup.Item value="start">
              <span>Start </span>
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

const RadioCheckmark = () => {
  return (
    <RadioGroup.Indicator asChild>
      <CheckmarkIcon />
    </RadioGroup.Indicator>
  )
}
const CheckboxCheckmark = () => {
  return (
    <Checkbox.Indicator asChild>
      <CheckmarkIcon />
    </Checkbox.Indicator>
  )
}
