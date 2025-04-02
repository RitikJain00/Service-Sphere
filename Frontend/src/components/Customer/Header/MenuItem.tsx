
import { Menu,  rem, Avatar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate,  Link } from 'react-router-dom';
import { useProfile } from '../../../Context/ProfileContext';
import Feedback from './Feedback';

import {
  IconInfoSquare,
  IconLogout2,
  IconUserCircle,
  IconBook,
  IconHeart,
  IconShoppingCart
} from '@tabler/icons-react';


const MenuItem = ( {setUser}: any ) =>  {
  
  const navigate = useNavigate();
 
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
    localStorage.removeItem('Type')
    localStorage.removeItem('authToken')
    setUser({
      token: '',
      type: '',
    })
    navigate('/home')
    }
  }

  const [opened, { open, close }] = useDisclosure(false);
  const Detail = useProfile();

  return ( 
   
    <div>
     
        <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={200} >
      <Menu.Target>
      <Avatar  src={Detail.image || "Model/user.png"} alt="it's me" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>User Dashboard</Menu.Label>
        <Link to={'/CustomerProfile'}>
       
        <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
          
          Profile
        </Menu.Item>
        </Link>
              
  
        <Link to={'/Favorate'}>
        <Menu.Item leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
        Favorites
        </Menu.Item>
        </Link>

        <Link to={'/customerBookings'}>
        <Menu.Item leftSection={<IconBook style={{ width: rem(14), height: rem(14) }} />}>
        Bookings
        </Menu.Item>
        </Link>

        <Link to={'/MyOrders'}>
        <Menu.Item leftSection={<IconShoppingCart style={{ width: rem(14), height: rem(14) }} />}>
        My Orders
        </Menu.Item>
        </Link>

        <Menu.Item  onClick={open}  leftSection={<IconInfoSquare style={{ width: rem(14), height: rem(14) }} />}>
          Send Feedback
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Account Actions</Menu.Label>
        
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>

    { <Feedback opened={opened} close={close} /> }
    </div>

    
  );
}

export default MenuItem