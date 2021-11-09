export type Props = {
  min: number
  max: number
  onChange: ({ min, max }: { min: number; max: number }) => void
}
