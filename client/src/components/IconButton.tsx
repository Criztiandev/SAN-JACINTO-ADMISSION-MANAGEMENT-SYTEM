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

const BaseIconButton = styled.button<BaseIconProps>`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ rounded }) => (rounded ? '24px' : '5px')};
  padding: ${({ size }) => (size ? `${size}px` : '4px')};
`

const IconButton = ({ variant = 'default', ...props }: IconButtonProps) => {
  const theme = useTheme()

  const IconVariant = BaseIconButton
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
