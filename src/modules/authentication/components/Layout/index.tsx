import ResponsiveDrawer from '../../../../shared/components/Sidebar/Sidebar'

interface HomeProps {
  children: React.ReactNode
}

const Layout: React.FC<HomeProps> = ({ children }) => {
  return (
    <div>
      <ResponsiveDrawer />
      <main>{children}</main>
    </div>
  )
}

export default Layout
