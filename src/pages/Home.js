// @ts-nocheck
import Blits from '@lightningjs/blits'

import Input from '../components/Input'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import List from '../components/List'
import ProgressBar from '../components/ProgressBar'
import Toggle from '../components/Toggle'
import Grid from '../components/Grid'

export default Blits.Component('Home', {
  components: {
    Input,
    Button,
    Checkbox,
    List,
    ProgressBar,
    Toggle,
    Grid,
  },
  template: `
    <Element w="1920" h="1080" color="#121212">
      <Element x="60" y="60">
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
        <Grid ref="grid" y="780" items="$gridItems" itemWidth="120" itemHeight="50" itemOffset="20" looping="true" />
      </Element>
    </Element>
  `,
  state() {
    return {
      name: '',
      password: '',
      index: 0,
      checkbox: false,
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
      this.select('name').focus()
    },
  },
  methods: {
    setFocus() {
      console.log('setting focus to:', this.focusable[this.index])
      this.select(this.focusable[this.index]).focus()
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
    enter() {
      if (this.focusable[this.index] === 'button') {
        console.log('submitting form:', this.name, this.password, this.checkbox)
      } else if (this.focusable[this.index] === 'checkbox') {
        this.checkbox = !this.checkbox
      } else if (this.focusable[this.index] === 'progress') {
        this.progress = this.progress === 100 ? 20 : this.progress + 20
      } else if (this.focusable[this.index] === 'toggle') {
        this.toggle = !this.toggle
      }
    },
    any(e) {
      if (e.key.match(/^[\w\s.,;!@#$%^&*()_+\-=[\]{}|\\:'"<>,.?/~`]$/)) {
        if (this.focusable[this.index] === 'name') {
          this.name += e.key
        } else if (this.focusable[this.index] === 'password') {
          this.password += e.key
        }
      }
    },
  },
})