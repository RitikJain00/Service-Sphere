import Header from "../../components/Customer/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../Context/CartContext";
import ServiceCard from "../../components/Services/JobCards/ServiceCard";
import { Divider } from "@mantine/core"
import { Grid } from '@mantine/core';


const Favorite = () => {
  const { Favorate } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-mine-shaft-950">
      <Header />
      <Divider mx="md" mb="xl" />

      <div className="px-2 sm:px-4 xs:px-8 flex-grow ">
        {Favorate.length > 0 ? (
          <Grid gutter="2xl" className="w-full">
            {Favorate.map((job) => (
              <Grid.Col key={job.id} span={{ 
                 sm: 9, md: 6, xl: 4 }} className="flex">
                <ServiceCard job={job} className="w-full" />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <div className="text-center font-bold text-mine-shaft-300 text-4xl mt-8">
            No Favorites Added Yet.
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorite;
