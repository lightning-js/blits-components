// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('Toggle', {
  template: `
    <Element
      w="$width"
      h="$height"
      color="#121212"
      :effects="[{type: 'radius', props: {radius: $radius}}, {type: 'border', props:{width: $borderWidth, color: $borderColor}}]"
    >
      <Element
        w="$innerWidth"
        h="$innerHeight"
        mount="0.5"
        :x.transition="$toggled ? $width - $offset : $offset"
        y="$height/2"
        :color.transition="$toggled ? '#fff' : '#888'"
        :effects="[{type: 'radius', props: {radius: $innerRadius}}]"
      />
    </Element>
  `,
  props: ['toggled'],
  state() {
    return {
      borderColor: '#888',
      borderWidth: 2,
      height: 40,
      innerHeight: 18,
      innerRadius: 9,
      innerWidth: 18,
      radius: 20,
      width: 80,
      offset: 20,
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
