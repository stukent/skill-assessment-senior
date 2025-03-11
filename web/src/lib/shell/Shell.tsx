import { styled } from '@linaria/react'
import { LogOut } from 'iconoir-react'
import { NavLink } from 'react-router-dom'

export interface LeftNavItem {
  label: string
  icon: React.ReactElement
  path: string
}
export interface ShellProps {
  leftNavItems: LeftNavItem[]
  children: React.ReactNode
}
export function Shell({ leftNavItems, children }: ShellProps) {
  return (
    <Container>
      <Sidebar>
        {leftNavItems.map(navItem => {
          return (
            <NavigationItem key={navItem.path} to={navItem.path}>
              {navItem.icon}
              <span>{navItem.label}</span>
            </NavigationItem>
          )
        })}
        <NavigationItem to={'/auth/logout'} style={{ marginTop: 'auto' }}>
          <LogOut />
          <span>Logout</span>
        </NavigationItem>
      </Sidebar>
      <Content>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100vh;
  width: 100%;
`
const Sidebar = styled.div`
  width: 250px;
  background: var(--spectrum-gray-200);
  padding: var(--spectrum-global-dimension-size-200);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-top: var(--spectrum-global-dimension-size-1000);
`
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: var(--spectrum-global-dimension-size-500);
`

// Casted to any because the className prop is typed as an optional function.
const NavigationItem = styled(NavLink as any)`
  border-radius: 4px;
  background: transparent;
  transition:
    background 0.1s linear,
    color 0.1s linear;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  text-decoration: none;
  color: var(--spectrum-gray-800);
  &:hover,
  &.active {
    background: var(--spectrum-gray-300);
    color: var(--spectrum-blue-1000);
  }
`
