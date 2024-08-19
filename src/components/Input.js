// @ts-nocheck
import Blits from '@lightningjs/blits'

export default Blits.Component('Input', {
  template: `
    <Element
      w="$width"
      h="$height"
      color="#121212"
      :effects="[{type: 'radius', props: {radius: $radius}}, {type: 'border', props:{width: $borderWidth, color: $borderColor}}]"
    >
      <Text
        :content="$inputText ? $input : $placeholder"
        :color="$inputText ? '#fff' : '#888'"
        lineheight="$height"
        size="$fontSize"
        x="20"
        @loaded="$textLoaded"
      ></Text>
      <Element w="2" h="$fontSize" mount="{y: 0.5}" y="$height/2" :x="$x" :alpha="$alpha" color="#fff" />
    </Element>
  `,
  props: ['mask', 'placeholderText', 'inputText'],
  state() {
    return {
      alpha: 0,
      borderColor: '#888',
      borderWidth: 2,
      cursorBlink: null,
      fontSize: 21,
      height: 60,
      hide: null,
      radius: 6,
      width: 300,
      x: 20,
    }
  },
  computed: {
    placeholder() {
      return this.hasFocus ? '' : this.placeholderText
    },
    input() {
      return this.mask
        ? '*'.repeat(this.inputText.length - 1) + this.inputText.slice(-1) // Mask characters if true
        : this.inputText || ''
    },
  },
  hooks: {
    focus() {
      this.borderColor = '#fff'
      this.alpha = 1
      this.cursorBlink = this.$setInterval(() => {
        this.alpha = this.alpha === 1 ? 0 : 1 // Toggle alpha between 1 and 0
      }, 300)
    },
    unfocus() {
      this.$clearInterval(this.cursorBlink)
      this.borderColor = '#888'
      this.alpha = 0
    },
  },
  methods: {
    textLoaded(dimensions) {
      this.x = this.inputText && this.inputText.length > 0 ? dimensions.w + 23 : 20 // position cursor after text
    },
  },
})
