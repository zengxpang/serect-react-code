import type { Preview } from '@storybook/react'
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      page: () => {
        return (
          <>
            12345678
            <Title />
            12345
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
            <Stories />
          </>
        )
      },
    },
  },
}

export default preview
