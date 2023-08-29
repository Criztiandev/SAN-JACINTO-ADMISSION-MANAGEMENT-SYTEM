import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { Variant } from './variants/Variants'
import tw from 'twin.macro'

interface InputProps {
  variant?: 'default' | 'outlined' | 'ghost'
  icon?: string
  dir?: 'left' | 'right'
  title?: string
}

interface BaseInputProps {
  theme: any
}

const BaseInput = styled.input<BaseInputProps>(({ theme }) => [
  `background: ${theme.colors.primary} !important;`,
  tw`cursor-pointer p-2 p-1 rounded-[5px]`
])

const Input = ({
  variant = 'default',
  title,
  icon,
  dir,
  ...props
}: InputProps) => {
  const theme = useTheme()
  const types: any = {
    default: BaseInput,
    outlined: Variant(BaseInput, 'outlined'),
    ghost: Variant(BaseInput, 'ghost')
  }

  const InputVariant = types[variant] || BaseInput
  return (
    <label>
      {dir === 'left' && icon && <span>{icon}</span>}
      <h4>{title}</h4>
      <InputVariant theme={theme} type='text' {...props} />
      {dir === 'right' && icon && <span>{icon}</span>}
    </label>
  )
}

export default Input
