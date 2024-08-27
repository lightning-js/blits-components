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

export default Blits.Component('Button', {
  template: `
    <Element w="$width" h="$height" :color="$backgroundColor" :effects="[{type: 'radius', props: {radius: $radius}}]">
      <Text :content="$buttonText" color="#121212" lineheight="$height" size="$fontSize" :x="$x" :mount="{x: $mountX}" />
    </Element>
  `,
  props: ['buttonText', 'textAlign'],
  state() {
    return {
      backgroundColor: '#888',
      fontSize: 21,
      height: 60,
      radius: 6,
      width: 300,
    }
  },
  computed: {
    mountX() {
      return this.textAlign === 'right' ? 1 : this.textAlign === 'center' ? 0.5 : 0
    },
    x() {
      return this.textAlign === 'right'
        ? this.width - 20
        : this.textAlign === 'center'
        ? this.width / 2
        : 20
    },
  },
  hooks: {
    focus() {
      this.backgroundColor = '#fff'
    },
    unfocus() {
      this.backgroundColor = '#888'
    },
  },
})
