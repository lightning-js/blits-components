/*
 * Copyright 2024 Comcast Cable Communications Management, LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  props: ['itemHeight', 'itemWidth', 'itemOffset', 'items', 'columns', 'looping', 'refocusParent'],
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
      } else if (this.looping) {
        // first see if we can go to the last row on this column
        const lastRow = this.items.length - (this.items.length % columns)
        const lastRowColumn = lastRow + (this.focused % columns)
        this.focused = lastRowColumn < this.items.length ? lastRowColumn : lastRowColumn - columns
      } else if (this.refocusParent) {
        this.parent.focus(e)
      }
    },
    down(e) {
      const columns = this.columns || this.baseColumns
      const nextIndex = this.focused + columns

      if (nextIndex < this.items.length) {
        this.focused = nextIndex
      } else if (this.looping) {
        this.focused = nextIndex % columns
      } else if (this.refocusParent) {
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
      } else if (this.refocusParent) {
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
      } else if (this.refocusParent) {
        this.parent.focus(e)
      }
    },
    enter() {
      console.log('Selected item:', this.items[this.focused])
    },
  },
})
