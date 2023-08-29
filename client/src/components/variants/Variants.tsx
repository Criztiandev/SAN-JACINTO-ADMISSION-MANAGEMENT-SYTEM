import styled from '@emotion/styled'

export const Variant = (base: any, variant: 'outlined' | 'ghost') => {
  const Outlined = styled(base)`
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.colors.border};
  `

  const GhostButton = styled(base)`
    background-color: transparent;
    border: none;
  `

  return variant === 'outlined' ? Outlined : GhostButton
}
