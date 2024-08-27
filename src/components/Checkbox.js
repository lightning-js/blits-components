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

export default Blits.Component('Checkbox', {
  template: `
    <Element
      w="$width"
      h="$height"
      color="#121212"
      :effects="[{type: 'radius', props: {radius: $radius}}, {type: 'border', props:{width: $borderWidth, color: $borderColor}}]"
    >
      <Element
        :show="$checked"
        w="$width - 24"
        h="$height - 24"
        mount="0.5"
        x="$width/2"
        y="$height/2"
        color="#fff"
        :effects="[{type: 'radius', props: {radius: $radius - 2}}]"
      />
    </Element>
  `,
  props: ['checked'],
  state() {
    return {
      borderColor: '#888',
      borderWidth: 2,
      height: 40,
      radius: 6,
      width: 40,
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
