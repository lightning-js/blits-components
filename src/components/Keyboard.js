import Blits from '@lightningjs/blits'

const Key = Blits.Component('Key', {
  template: `
    <Element w="50" h="50">
      <Text :content="$inputValue" size="32" align="center" w="50" />
    </Element>
  `,
  props: ['value'],
  state() {
    return {
      layout: 'lower',
    }
  },
  computed: {
    inputValue() {
      return this.layout === 'upper' ? this.value.toUpperCase() : this.value
    },
  },
  hooks: {
    init() {
      this.$listen('layoutChange', ({ layout }) => {
        this.layout = layout
      })
    },
  },
})

export default Blits.Component('Keyboard', {
  components: {
    Key,
  },
  template: `
    <Element>
      <Element w="60" h="60" mount="{x:0.5, y:0.5}" :x.transition="$focusX" :y.transition="$focusY" color="0xffffff33" />
      <Key :for="(item, index) in $keys" :x="$keyX" ref="key" key="$item" value="$item" :y="$keyY" />
    </Element>
  `,
  props: ['margin', 'perRow'],
  computed: {
    focusX() {
      return (this.focusIndex % this.perRow) * this.margin + 8
    },
    focusY() {
      return ~~(this.focusIndex / this.perRow) * this.margin + 70
    },
    keyX() {
      return (this.index % this.perRow) * this.margin
    },
    keyY() {
      return Math.floor(this.index / this.perRow) * this.margin + 50
    },
  },
  state() {
    return {
      focusIndex: 0,
      layout: 'lower',
      keys: [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        '-',
        '_',
      ],
    }
  },
  input: {
    left() {
      if (this.focusIndex % this.perRow === 0) {
        this.focusIndex = Math.min(this.focusIndex + this.perRow - 1, this.keys.length - 1)
      } else {
        this.focusIndex = Math.max(this.focusIndex - 1, 0)
      }
    },
    right() {
      if (this.focusIndex % this.perRow === this.perRow - 1) {
        this.focusIndex -= this.perRow - 1
      } else {
        this.focusIndex = Math.min(this.focusIndex + 1, this.keys.length - 1)
      }
    },
    up() {
      this.focusIndex = Math.max(this.focusIndex - this.perRow, 0)
    },
    down() {
      this.focusIndex = Math.min(this.focusIndex + this.perRow, this.keys.length - 1)
    },
    enter(e) {
      const key = this.keys[this.focusIndex]
      this.$emit('onKeyboardInput', {
        key: this.layout === 'upper' ? key.toUpperCase() : key,
      })
    },
    any(e) {
      if (e.key === 'Shift') {
        this.layout = this.layout === 'lower' ? 'upper' : 'lower'
        this.$emit('layoutChange', {
          layout: this.layout,
        })
      }
    },
    back(e) {
      this.parent.$focus(e)
    },
  },
})
