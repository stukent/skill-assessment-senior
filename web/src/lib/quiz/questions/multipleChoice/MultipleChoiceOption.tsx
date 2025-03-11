import { Checkbox, Flex, Text } from '@adobe/react-spectrum'

export interface MultipleChoiceOptionProps {
  label: string
  selected?: boolean
  onSelected: () => void
  disabled?: boolean
}
export function MultipleChoiceOption({
  disabled,
  label,
  selected,
  onSelected,
}: MultipleChoiceOptionProps) {
  return (
    <Flex gap={'size-200'} direction={'row'} alignItems={'center'}>
      <Checkbox
        isSelected={!!selected}
        isDisabled={disabled}
        onChange={selected => {
          if (selected) {
            onSelected()
          }
        }}
        aria-label={label}
      />
      <Text>{label}</Text>
    </Flex>
  )
}
