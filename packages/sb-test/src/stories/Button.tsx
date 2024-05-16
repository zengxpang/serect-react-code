import React from 'react'
import './button.css'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * Is this the principal call to action on the page?
   */
  backgroundColor?: string
  /**
   * Is this the principal call to action on the page?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Is this the principal call to action on the page?
   */
  label: string
  /**
   * Is this the principal call to action on the page?
   */
  onClick?: () => void
}

export const Button = (props: ButtonProps) => {
  const {
    primary = false,
    size = 'medium',
    backgroundColor,
    label,
    ...otherProps
  } = props

  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(
        ' ',
      )}
      style={{ backgroundColor }}
      {...otherProps}
    >
      {label}
    </button>
  )
}
