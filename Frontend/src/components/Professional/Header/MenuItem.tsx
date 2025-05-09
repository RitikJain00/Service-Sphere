
import { Menu,  rem } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import {
  IconInfoSquare,
  IconLogout2,
  IconUserCircle,
} from '@tabler/icons-react';

import Feedback from '../../Customer/Header/Feedback';
import { useProfile } from '../../../Context/ProfileContext';

const MenuItem = () =>  {
  
  const navigate = useNavigate();
  const Detail = useProfile();

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
      <Avatar src={Detail.image || "Model/user.png"} alt="it's me" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>User Dashboard</Menu.Label>
        <Link to={'/ProfessionalProfile'}>
        <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
          Profile
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