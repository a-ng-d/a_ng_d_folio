import type { App } from 'vue'
import VLazyImage from 'v-lazy-image'

import OneColumn from '@/components/layouts/OneColumn.vue'
import TwoColumns from '@/components/layouts/TwoColumns.vue'
import ThreeColumns from '@/components/layouts/ThreeColumns.vue'
import WrapColumn from '@/components/layouts/WrapColumn.vue'
import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
import Figure from '@/components/patterns/Figure.vue'
import ContentContainer from '@/components/patterns/ContentContainer.vue'
import LinkContainer from '@/components/patterns/LinkContainer.vue'
import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
import RichExternalLink from '@/components/ui/RichExternalLink.vue'
import Label from '@/components/ui/Label.vue'
import Button from '@/components/ui/Button.vue'

const COMPONENTS = {
  VLazyImage,
  OneColumn,
  TwoColumns,
  ThreeColumns,
  WrapColumn,
  FullWidthFigure,
  Figure,
  ContentContainer,
  LinkContainer,
  SimpleExternalLink,
  RichExternalLink,
  Label,
  Button,
}

export const registerContentComponents = (app: App) => {
  for (const [name, component] of Object.entries(COMPONENTS))
    app.component(name, component)
}
