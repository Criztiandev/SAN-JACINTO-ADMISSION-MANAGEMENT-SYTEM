import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

interface InputProps {
  type: string
  name: string
}

interface BaseInputProps {
  theme: any
}

const BaseInput = styled.input<BaseInputProps>`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 4px;
`

const Input = ({ type, name }: InputProps) => {
  const theme = useTheme()
  return <BaseInput theme={theme} type='text' />
}

export default Input
