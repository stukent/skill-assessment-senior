import { View } from '@adobe/react-spectrum'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <View
      backgroundColor={'static-white'}
      borderRadius={'regular'}
      padding={'size-500'}
      width={400}
      alignSelf={'center'}
      marginTop={'size-1000'}
    >
      <Outlet />
    </View>
  )
}
