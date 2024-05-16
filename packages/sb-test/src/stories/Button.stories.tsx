import type { Meta, StoryObj } from '@storybook/react'
import { expect, fn, userEvent, within } from '@storybook/test'
import { Button } from './Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: '曾小胖/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'radio', options: ['red', 'green'] },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: '你好',
    size: 'large',
  },
}

export const Secondary: Story = {
  args: {
    label: '哦哦哦哦哦',
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
}

export const Warning: Story = {
  args: {
    primary: true,
    label: 'Delete now',
    backgroundColor: 'red',
  },
}

export const Zxp: Story = {
  args: {
    label: 'ppp',
    size: 'large',
    backgroundColor: 'green',
  },
  render: (args, meta) => {
    console.log(meta, 'meta')
    const list = meta.loaded.list

    return (
      <div>
        <button>{list.join('、')}</button>
        <Button {...args} />
        <button>zxp333</button>
      </div>
    )
  },
  loaders: [
    async () => {
      await 'zxp'
      return {
        list: [111, 222, 333],
      }
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const btn = await canvas.getByRole('button', { name: /ppp/i })
    await userEvent.click(btn)
    await expect(btn.textContent).toEqual('ppp')
    await expect(btn.style.backgroundColor).toEqual('green')
    // btn.textContent = 'rongXue'
  },
}
