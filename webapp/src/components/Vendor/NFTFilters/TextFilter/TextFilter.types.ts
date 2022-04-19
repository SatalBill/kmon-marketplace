export type Props = {
  name?: string
  placeholder?: string
  value: string
  onChange: (newValue: string) => void,
  onFocus?: () => void
}
