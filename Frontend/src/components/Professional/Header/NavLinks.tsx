import {  NavLink} from 'react-router-dom';
import { IconLayoutDashboard, IconHexagonPlus,IconCalendarCheck, IconHistory } from '@tabler/icons-react';

const Navlinks = () => {

    const links = [
        {name: 'DashBoard', url: '/DashBoard', icon:<IconLayoutDashboard stroke={2} />},
        {name: 'Services', url: '/Services', icon:<IconHexagonPlus stroke={2} />},
        {name: 'Bookings', url: '/Bookings', icon: <IconCalendarCheck stroke={2} />},
        {name: 'History', url: '/History', icon: <IconHistory stroke={2} />},
        // {name: 'Customer', url: '/CustomerLogin'}
    ]


    return (
          <>
            {links.map((link,index) => 
               <NavLink  to = {link.url} key={index} className={ ({isActive}) => `flex items-center gap-3 w-full font-medium rounded-lg px-8 py-3 ${isActive ? 'bg-mine-shaft-700' : 'hover:bg-mine-shaft-800'}    `  }>
                  {link.icon} {link.name}
                  </NavLink>
          
           )
            }
        </>
        
    )
}

export default Navlinks;