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
      this.$trigger('focused')
    },
  },
  watch: {
    focused(value) {
      const focusItem = this.$select(`list-item-${this.items[value].id}`)
      if (focusItem && focusItem.$focus) {
        focusItem.$focus()
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
