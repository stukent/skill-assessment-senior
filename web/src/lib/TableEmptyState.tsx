import { Heading, IllustratedMessage } from '@adobe/react-spectrum'
import NotFound from '@spectrum-icons/illustrations/NotFound'

export interface TableEmptyStateProps {
  children: string
}
export function TableEmptyState({ children }: TableEmptyStateProps) {
  return (
    <IllustratedMessage>
      <NotFound />
      <Heading>{children}</Heading>
    </IllustratedMessage>
  )
}
