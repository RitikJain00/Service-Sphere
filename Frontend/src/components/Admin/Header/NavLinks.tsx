import {  NavLink} from 'react-router-dom';
import { IconLayoutDashboard, IconUsers,IconBriefcase, IconDatabaseDollar, IconBrandMessenger  } from '@tabler/icons-react';

const Navlinks = () => {

    const links = [
        {name: 'DashBoard', url: '/Admin', icon:<IconLayoutDashboard stroke={2} />},
        {name: 'Customers', url: '/Customers', icon:<IconUsers stroke={2} />},
        {name: 'Professionals', url: '/Professionals', icon: <IconBriefcase stroke={2} />},
        {name: 'Accounts', url: '/Accounts', icon: <IconDatabaseDollar stroke={2} />},
        {name: 'Messages', url: '/Messages', icon: <IconBrandMessenger  stroke={2} />},

      
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