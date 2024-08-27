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

export default Blits.Component('Item', {
  template: `
    <Element
      w="$width"
      h="$height"
      :color="$hasFocus ? '#fff' : '#888'"
      :effects="[{type: 'radius', props: {radius: $radius}}]"
    >
      <Text content="$item.label" color="#121212" size="$height/2" mount="0.5" x="$width/2" y="$height/2" />
    </Element>
  `,
  props: ['item', 'width', 'height'],
  state() {
    return {
      radius: 6,
    }
  },
})
