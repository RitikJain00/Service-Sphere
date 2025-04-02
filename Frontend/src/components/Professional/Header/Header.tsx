

import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

const Header = () => {

  const location = useLocation()
  
    return(
      <div className="w-full h-20 px-6  bg-mine-shaft-950 flex justify-between items-center  text-cyan-50 ">

        <div className='text-2xl font-semibold text-mine-shaft-300'>
          {location.pathname.substring(1)}
        </div>
          <div className='flex gap-4 items-center'>
              <MenuItem></MenuItem>
            </div>
      </div>
    ) 
}

export default Header;