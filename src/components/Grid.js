// @ts-nocheck
import Blits from '@lightningjs/blits'
import Item from '../components/Item'

export default Blits.Component('Grid', {
  components: {
    Item,
  },
  template: `
    <Element :x.transition="$x">
      <Item
        :for="(item, index) in $items"
        item="$item"
        :x="($index % ($columns || $baseColumns)) * $totalWidth"
        :y="Math.floor($index / ($columns || $baseColumns)) * $totalHeight"
        :ref="'grid-item-'+$item.id"
        :key="$item.id"
        width="$itemWidth"
        height="$itemHeight"
      />
    </Element>
  `,
  props: ['itemHeight', 'itemWidth', 'itemOffset', 'items', 'columns', 'looping'],
  state() {
    return {
      focused: 0,
      x: 0,
      baseColumns: 4,
    }
  },
  computed: {
    totalWidth() {
      return (this.itemWidth || 300) + (this.itemOffset || 0)
    },
    totalHeight() {
      return (this.itemHeight || 300) + (this.itemOffset || 0)
    },
  },
  hooks: {
    focus() {
      this.focused = 0
      this.trigger('focused')
    },
  },
  watch: {
    focused(value) {
      const focusItem = this.select(`grid-item-${this.items[value].id}`)
      if (focusItem && focusItem.focus) {
        focusItem.focus()
      }
    },
  },
  input: {
    up(e) {
      const columns = this.columns || this.baseColumns
      const previousIndex = this.focused - columns

      if (previousIndex >= 0) {
        this.focused = previousIndex
      } else {
        this.parent.focus(e)
      }
    },
    down(e) {
      const columns = this.columns || this.baseColumns
      const nextIndex = this.focused + columns

      if (nextIndex < this.items.length) {
        this.focused = nextIndex
      } else {
        this.parent.focus(e)
      }
    },
    left(e) {
      const columns = this.columns || this.baseColumns

      const isNotFirstInRow = this.focused % columns > 0
      const isWithinBounds = this.focused + columns - 1 < this.items.length

      if (isNotFirstInRow) {
        this.focused -= 1
      } else if (this.looping) {
        this.focused = isWithinBounds ? this.focused + columns - 1 : this.items.length - 1
      } else {
        this.parent.focus(e)
      }
    },
    right(e) {
      const columns = this.columns || this.baseColumns

      const isNotLastInRow = this.focused % columns < columns - 1
      const isNotLastItem = this.focused < this.items.length - 1

      if (isNotLastInRow && isNotLastItem) {
        this.focused += 1
      } else if (this.looping) {
        const index = this.focused - columns + 1
        this.focused = isNotLastItem ? index : Math.floor(this.focused / columns) * columns
      } else {
        this.parent.focus(e)
      }
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
