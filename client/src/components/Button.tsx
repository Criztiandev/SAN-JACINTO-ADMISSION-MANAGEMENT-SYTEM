import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { ReactNode } from 'react'
import { Variant } from './variants/Variants'
import tw, { theme } from 'twin.macro'

interface ButtonProps {
  variant?: 'default' | 'outlined' | 'ghost'
  rounded?: boolean
  icon?: string | ReactNode
  dir?: 'left' | 'right'
  children: string

  onClick?: () => void
}

interface BaseButtonProps {
  theme: any
  rounded?: boolean
}

const BaseButton = styled.button<BaseButtonProps>(({ theme, rounded }) => [
  `background: ${theme.colors.primary} !important;
  border-radius: ${rounded ? '24px' : '4px'}
  `,
  tw`cursor-pointer px-4 py-2 font-bold text-lg `
])

interface ButtonType {
  default: typeof BaseButton
  outlined: any
  ghost: any
}

const Button = ({
  variant = 'default',
  dir = 'left',
  icon,
  children,
  onClick,
  rounded
}: ButtonProps) => {
  const theme = useTheme()

  const types: ButtonType = {
    default: BaseButton,
    outlined: Variant(BaseButton, 'outlined'),
    ghost: Variant(BaseButton, 'ghost')
  }
  const ButtonVariant = types[variant] || BaseButton

  return (
    <ButtonVariant theme={theme} rounded={rounded} onClick={onClick}>
      {dir === 'left' && icon && <span>{icon}</span>}
      {children}
      {dir === 'right' && icon && <span>{icon}</span>}
    </ButtonVariant>
  )
}

export default Button
