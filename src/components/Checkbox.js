// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('Checkbox', {
  template: `
    <Element
      w="$width"
      h="$height"
      color="#121212"
      :effects="[{type: 'radius', props: {radius: $radius}}, {type: 'border', props:{width: $borderWidth, color: $borderColor}}]"
    >
      <Element
        :show="$checked"
        w="$width - 24"
        h="$height - 24"
        mount="0.5"
        x="$width/2"
        y="$height/2"
        color="#fff"
        :effects="[{type: 'radius', props: {radius: $radius - 2}}]"
      />
    </Element>
  `,
  props: ['checked'],
  state() {
    return {
      borderColor: '#888',
      borderWidth: 2,
      height: 40,
      radius: 6,
      width: 40,
    }
  },
  hooks: {
    focus() {
      this.borderColor = '#fff'
    },
    unfocus() {
      this.borderColor = '#888'
    },
  },
})
