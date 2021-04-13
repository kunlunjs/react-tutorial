import type { FC, CSSProperties } from 'react'
import { memo } from 'react'
import { SourceBox } from './SourceBox'
import { StatefulTargetBox as TargetBox } from './TargetBox'
import { Colors } from './Colors'

const floatStyle: CSSProperties = {}
floatStyle.float = 'left'

export const Container: FC = memo(function Container() {
  return (
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
      <div style={floatStyle}>
        <SourceBox color={Colors.BLUE}>
          <SourceBox color={Colors.YELLOW}>
            <SourceBox color={Colors.YELLOW} />
            <SourceBox color={Colors.BLUE} />
          </SourceBox>
          <SourceBox color={Colors.BLUE}>
            <SourceBox color={Colors.YELLOW} />
          </SourceBox>
        </SourceBox>
      </div>
      <div style={{ ...floatStyle, marginLeft: '5rem', marginTop: '.5rem' }}>
        <TargetBox />
      </div>
    </div>
  )
})
