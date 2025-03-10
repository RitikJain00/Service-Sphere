
import { Menu,  rem } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

import {
  IconInfoSquare,
  IconLogout2,
  IconUserCircle,

} from '@tabler/icons-react';
import Feedback from '../../Customer/Header/Feedback';


const MenuItem = () =>  {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
    localStorage.removeItem('Type')
    localStorage.removeItem('authToken')
    navigate('/home')
    }
  }

  const [opened, { open, close }] = useDisclosure(false);

  return ( 
   
    <div>
     
      <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={200} >
      <Menu.Target>
      <Avatar src="Home/avatar-9.png" alt="it's me" />
      </Menu.Target>

      <Menu.Dropdown>
      
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