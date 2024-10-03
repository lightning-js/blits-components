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

import Input from '../components/Input'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import List from '../components/List'
import ProgressBar from '../components/ProgressBar'
import Toggle from '../components/Toggle'
import Grid from '../components/Grid'
import Keyboard from '../components/Keyboard'

export default Blits.Component('Home', {
  components: {
    Input,
    Button,
    Checkbox,
    List,
    ProgressBar,
    Toggle,
    Grid,
    Keyboard,
  },
  template: `
    <Element w="1920" h="1080" color="#121212">
      <Element x="60" y="60">
        <Element x="360" w="400" y="-45" h="270" :y.transition="$keyboardY" :alpha.transition="$keyboardAlpha">
          <Keyboard margin="70" perRow="7" ref="keyboard" />
        </Element>
    
        <Input ref="name" :inputText="$name" placeholderText="name" />
        <Input ref="password" y="70" mask="true" :inputText="$password" placeholderText="password" />
        <Checkbox ref="checkbox" y="150" :checked="$checkbox" />
        <Button ref="button" y="210" buttonText="Submit" textAlign="center" />
        <List
          ref="list"
          y="290"
          items="$items"
          itemWidth="300"
          itemHeight="380"
          itemOffset="30"
          looping="true"
          autoScroll="true"
          autoscrollOffset="4"
        />
        <ProgressBar ref="progress" y="690" :progress="$progress" />
        <Toggle ref="toggle" y="720" :toggled="$toggle" />
        <Grid
          ref="grid"
          y="780"
          items="$gridItems"
          itemWidth="120"
          itemHeight="50"
          itemOffset="20"
          looping="false"
          refocusParent="true"
        />
      </Element>
    </Element>
  `,
  state() {
    return {
      name: '',
      password: '',
      index: 0,
      checkbox: false,
      keyboardAlpha: 0,
      keyboardY: 0,
      focusable: ['name', 'password', 'checkbox', 'button', 'list', 'progress', 'toggle', 'grid'],
      progress: 20,
      items: [
        { id: 1001, label: '0' },
        { id: 1002, label: '1' },
        { id: 1003, label: '2' },
        { id: 1004, label: '3' },
        { id: 1005, label: '4' },
        { id: 1006, label: '5' },
        { id: 1007, label: '6' },
        { id: 1008, label: '7' },
        { id: 1009, label: '8' },
        { id: 1010, label: '9' },
      ],
      gridItems: [
        { id: 1011, label: '0' },
        { id: 1012, label: '1' },
        { id: 1013, label: '2' },
        { id: 1014, label: '3' },
        { id: 1015, label: '4' },
        { id: 1016, label: '5' },
        { id: 1017, label: '6' },
        { id: 1018, label: '7' },
        { id: 1019, label: '8' },
        { id: 1020, label: '9' },
      ],
      toggle: false,
    }
  },
  hooks: {
    ready() {
      const name = this.$select('name')
      if (name && name.$focus) {
        name.$focus()
      }
    },
    focus() {
      if (this.keyboardAlpha) {
        this.keyboardAlpha = 0
        this.keyboardY = 0
      }
      this.setFocus()
    },
    init() {
      this.registerListeners()
    },
  },
  methods: {
    setFocus() {
      console.log('setting focus to:', this.focusable[this.index])
      const next = this.$select(this.focusable[this.index])
      if (next && next.$focus) {
        next.$focus()
      }
    },
    removeLastChar(str) {
      return str.substring(0, str.length - 1)
    },
    handleKey(char) {
      if (this.focusable[this.index] === 'name') {
        this.name += char
      } else if (this.focusable[this.index] === 'password') {
        this.password += char
      }
    },
    registerListeners() {
      this.$listen('onKeyboardInput', ({ key }) => {
        this.handleKey(key)
      })
    },
  },
  input: {
    up() {
      this.index = this.index === 0 ? this.focusable.length - 1 : this.index - 1
      this.setFocus()
    },
    down() {
      this.index = this.index === this.focusable.length - 1 ? 0 : this.index + 1
      this.setFocus()
    },
    right() {
      console.log("refocus child because we don't have a right focus")
      this.setFocus()
    },
    left() {
      console.log("refocus child because we don't have a left focus")
      this.setFocus()
    },
    enter() {
      const currentFocusable = this.focusable[this.index]
      let element = null
      switch (currentFocusable) {
        case 'button':
          console.log('submitting form:', this.name, this.password, this.checkbox)
          break
        case 'checkbox':
          this.checkbox = !this.checkbox
          break
        case 'progress':
          this.progress = this.progress === 100 ? 20 : this.progress + 20
          break
        case 'toggle':
          this.toggle = !this.toggle
          break
        case 'name':
        case 'password':
          this.keyboardAlpha = 1
          this.keyboardY = -45
          element = this.$select('keyboard')
          if (element && element.$focus) {
            element.$focus()
          }
          break
        default:
          console.warn('Unrecognized focusable element:', currentFocusable)
      }
    },
    back() {
      const currentFocusable = this.focusable[this.index]
      switch (currentFocusable) {
        case 'name':
          this.name = this.removeLastChar(this.name)
          break
        case 'password':
          this.password = this.removeLastChar(this.password)
          break
      }
    },
    any(e) {
      if (e.key.match(/^[\w\s.,;!@#$%^&*()_+\-=[\]{}|\\:'"<>,.?/~`]$/)) {
        this.handleKey(e.key)
      }
    },
  },
})
