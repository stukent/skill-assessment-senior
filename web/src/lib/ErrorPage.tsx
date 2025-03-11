import { InlineAlert } from '@adobe/react-spectrum'

export interface ErrorPageProps {
  message?: string
}
export function ErrorPage({ message = 'Something went wrong.' }: ErrorPageProps) {
  return (
    <InlineAlert margin={'size-1000'} variant={'negative'} alignSelf={'center'} width={400}>
      {message}
    </InlineAlert>
  )
}
