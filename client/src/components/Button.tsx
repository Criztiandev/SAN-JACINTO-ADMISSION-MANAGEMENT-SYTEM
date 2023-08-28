import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { ReactNode } from 'react'
import { Variant } from './variants/Variants'

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

const BaseButton = styled.button<BaseButtonProps>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ rounded }) => (rounded ? '24px' : '4px')};
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
`

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
