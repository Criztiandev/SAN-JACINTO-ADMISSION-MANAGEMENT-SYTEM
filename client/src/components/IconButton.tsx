import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

interface IconButtonProps {
  variant?: 'default' | 'outlined' | 'ghost'
  rounded?: boolean
  size?: number
  icon: string
}

interface BaseIconProps {
  theme: any
  rounded?: boolean
  size?: number
}

interface IconButtonType {
  default: typeof BaseIconButton
  outlined: typeof Outlined
  ghost: typeof Ghost
}

const BaseIconButton = styled.button<BaseIconProps>`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ rounded }) => (rounded ? '24px' : '5px')};
  padding: ${({ size }) => (size ? `${size}px` : '4px')};
`

const Outlined = styled(BaseIconButton)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const Ghost = styled(BaseIconButton)`
  background-color: transparent;
  border: none;
`

const IconButton = ({ variant = 'default', ...props }: IconButtonProps) => {
  const theme = useTheme()
  const types: IconButtonType = {
    default: BaseIconButton,
    outlined: Outlined,
    ghost: Ghost
  }

  const IconVariant = types[variant] || BaseIconButton

  return (
    <IconVariant theme={theme} {...props}>
      <img
        style={{ width: '24px', height: '24px' }}
        src={props.icon}
        alt='icons'
      />
    </IconVariant>
  )
}

export default IconButton
