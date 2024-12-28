
import { Menu, Text, rem } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import {
 
  IconSearch,
  
  IconMessageCircle,
  IconInfoSquare,
  IconLogout2,
  IconUserCircle,
  IconSettings,
  IconHeart,
  IconShoppingCart
} from '@tabler/icons-react';
import Feedback from './Feedback';


const MenuItem = () =>  {
  

  const [opened, { open, close }] = useDisclosure(false);

  return ( 
   
    <div>
     
        <Menu trigger="hover" openDelay={100} closeDelay={400} shadow="md" width={200} >
      <Menu.Target>
      <Avatar src="Home/avatar-9.png" alt="it's me" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>User Dashboard</Menu.Label>
        <Link to={'/CustomerProfile'}>
        <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
          Profile
        </Menu.Item>
        </Link>
              
        
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
          Messages
        </Menu.Item>

        <Menu.Item leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
        Favorites
        </Menu.Item>

        <Menu.Item leftSection={<IconShoppingCart style={{ width: rem(14), height: rem(14) }} />}>
        My Orders
        </Menu.Item>

        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
          Settings
        </Menu.Item>
        

      
        <Menu.Item  onClick={open}  leftSection={<IconInfoSquare style={{ width: rem(14), height: rem(14) }} />}>
          Send Feedback
        </Menu.Item>

        
       

        <Menu.Divider />

        <Menu.Label>Account Actions</Menu.Label>
        
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
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