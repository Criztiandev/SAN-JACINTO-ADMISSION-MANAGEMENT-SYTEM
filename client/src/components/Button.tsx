import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

interface ButtonProps {
  variant?: 'default' | 'outlined' | 'ghost'
  rounded?: boolean
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

const Outlined = styled(BaseButton)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const GhostButton = styled(BaseButton)`
  background-color: transparent;
  border: none;
`

const Button = ({
  variant = 'default',
  children,
  onClick,
  rounded
}: ButtonProps) => {
  const theme = useTheme()
  const types: any = {
    default: BaseButton,
    outlined: Outlined,
    ghost: GhostButton
  }
  const ButtonVariant = types[variant] || BaseButton

  return (
    <ButtonVariant theme={theme} rounded={rounded} onClick={onClick}>
      {children}
    </ButtonVariant>
  )
}

export default Button
