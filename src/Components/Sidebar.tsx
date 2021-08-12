interface SidebarProps {
  isSidebarOpen: boolean;
  children: React.ReactChild | React.ReactChild[];
}

function Sidebar({ isSidebarOpen, children }: SidebarProps) {
  const closedSidebar = isSidebarOpen ? '' : 'sidebar--closed';

  return <aside className={'sidebar ' + closedSidebar}>{children}</aside>;
}

export default Sidebar;
