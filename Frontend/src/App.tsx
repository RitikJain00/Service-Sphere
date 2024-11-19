
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Home from './pages/Home'

export default function App() {
  return (   
      <MantineProvider>
          <Home></Home>
      </MantineProvider>
  )
}