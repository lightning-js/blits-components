// @ts-nocheck
import Blits from '@lightningjs/blits'
import Item from '../components/Item'

export default Blits.Component('List', {
  components: {
    Item,
  },
  template: `
    <Element :x.transition="$x">
      <Item
        :for="(item, index) in $items"
        item="$item"
        :x="$index * $totalWidth"
        :ref="'list-item-'+$item.id"
        :key="$item.id"
        width="$itemWidth"
        height="$itemHeight"
      />
    </Element>
  `,
  props: [
    'autoScroll',
    'autoscrollOffset',
    'itemOffset',
    'itemHeight',
    'itemWidth',
    'items',
    'looping',
  ],
  state() {
    return {
      focused: 0,
      x: 0,
    }
  },
  computed: {
    totalWidth() {
      return (this.itemWidth || 300) + (this.itemOffset || 0)
    },
  },
  hooks: {
    focus() {
      this.trigger('focused')
    },
  },
  watch: {
    focused(value) {
      const focusItem = this.select(`list-item-${this.items[value].id}`)
      if (focusItem && focusItem.focus) {
        focusItem.focus()
        this.scrollToFocus(value)
      }
    },
  },
  methods: {
    changeFocus(direction) {
      const nextFocus = this.looping
        ? (this.focused + direction + this.items.length) % this.items.length
        : Math.max(0, Math.min(this.focused + direction, this.items.length - 1))
      this.focused = nextFocus
    },
    scrollToFocus(index) {
      if (this.autoScroll) {
        const maxScrollIndex = Math.max(0, this.items.length - (this.autoscrollOffset || 0))
        this.x = -(index <= maxScrollIndex ? index : maxScrollIndex) * this.totalWidth
      }
    },
  },
  input: {
    left() {
      this.changeFocus(-1)
    },
    right() {
      this.changeFocus(1)
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
