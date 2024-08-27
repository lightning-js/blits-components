// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('ProgressBar', {
  template: `
    <Element w="$width" h="6" color="#888" :effects="[{type: 'radius', props: {radius: $radius}}]">
      <Element :w.transition="$progress" h="6" color="#fff" :effects="[{type: 'radius', props: {radius: $radius}}]" />
    </Element>
  `,
  props: [
    {
      key: 'progress',
      cast(v) {
        return v + '%'
      },
    },
  ],
  state() {
    return {
      radius: 3,
      width: 630,
    }
  },
})
