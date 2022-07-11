import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const ProgressBar = () => {
  const percentage = 90

  return (
    <div style={{ width: 200, height: 200, marginBottom: '-10px' }}>
      <CircularProgressbarWithChildren
        className="progressbar"
        value={percentage}
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          // rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: 'round',

          // Text size
          // textSize: '16px',

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.5,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: `rgba(38, 145, 252, ${percentage / 100})`,
          // textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      >
        <img
          style={{ width: 100, marginTop: -10 }}
          src="https://i.imgur.com/b9NyUGm.png"
          alt="doge"
        />
        <div style={{ fontSize: 14, marginTop: -10 }}>
          <strong>{percentage}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  )
}
