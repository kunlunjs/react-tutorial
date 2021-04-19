import type { FC, CSSProperties } from 'react'
import { SourceBox } from './SourceBox'
import { TargetBox } from './TargetBox'

const floatStyle: CSSProperties = {}

floatStyle.float = 'left'

export const Container: FC = () => {
  return (
    <>
      <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
        <div style={floatStyle}>
          <SourceBox showCopyIcon />
          <SourceBox />
        </div>
        <div style={floatStyle}>
          <TargetBox />
        </div>
      </div>
    </>
  )
}
