import { observer } from 'mobx-react-lite'
import { useWindowSize } from 'react-use'
import { useConfetti } from '~hooks/useConfetti'
import Confetti from 'react-confetti'

export const Celebration = observer(function Celebration() {
  const { width, height } = useWindowSize()
  const { run, recycle } = useConfetti()

  return <Confetti width={width} height={height} recycle={recycle} run={run} />
})
