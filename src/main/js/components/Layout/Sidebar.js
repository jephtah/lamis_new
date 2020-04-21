import logo200Image from 'assets/img/logo/lamislogo.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
} from 'react-icons/md';
// import { GiTreeBeehive} from 'react-icons/gi';
import { FaUserPlus, FaXRay} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';



const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};



const navItems = [
  { to: '/dashboard', name: 'Dashboard', exact: true, Icon: MdDashboard },
  { to: '/patients', name: 'Find Patient', exact: false, Icon: FaUserPlus },
  { to: '/laboratory', name: 'Laboratory', exact: false, Icon: FaXRay },
  { to: '/pharmacy', name: 'Pharmacy', exact: false, Icon: FaXRay },
  { to: '/admin', name: 'Admin', exact: false, Icon: FaXRay },
  { to: '/visual', name: 'Visual', exact: false, Icon: FaXRay },
  { to: '/Report', name: 'Report', exact: false, Icon: FaXRay },
];

//Make it a main menu { to: '/hts-list', name: 'HTS', exact: false, Icon: GiTreeBeehive },
// { to: '/index-Search', name: 'Index Contract Tracking', exact: false, Icon: GiTreeBeehive },
const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,

   
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                LamisPlus 
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}>
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
   
       {/* The Pharmacy Menu  */}         
            
      {/* The  Menu  Divider for Services*/}          
      
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;