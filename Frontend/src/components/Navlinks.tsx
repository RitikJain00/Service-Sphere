import { Link, useLocation} from 'react-router-dom';

const Navlinks = () => {

    const links = [
        {name: 'Home', url: '/home'},
        {name: 'Partner', url: '/partner'},
        {name: 'Contact', url: '/contact'},
        {name: 'About Us', url: '/about'}
    ]

    const location = useLocation(); 
    return (
          <>
            {links.map((link,index) => 
             <div key = {index} className={`${location.pathname ==  link.url ? `border-bright-sun-400 text-bright-sun-400` : 'border-transparent'} border-t-2 h-full flex items-center`}>
                <Link  to = {link.url}>{link.name}</Link> 
            </div>
           )
            }
        </>
        
    )
}

export default Navlinks;