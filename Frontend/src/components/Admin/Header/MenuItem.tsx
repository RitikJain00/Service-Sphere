
import { Menu,  rem, Avatar } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLogout2} from '@tabler/icons-react';


const MenuItem = () =>  {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
    localStorage.removeItem('Type')
    localStorage.removeItem('authToken')
    navigate('/home')
    }
  }

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

    </div>

  );
}

export default MenuItem