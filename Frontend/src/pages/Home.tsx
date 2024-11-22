import CitySlider from "../components/CitySlider";
import Header from "../components/Header";
import Hero from '../components/Hero'


const Home = () => {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 text-base">
           <Header></Header>
           <Hero></Hero>
           <CitySlider></CitySlider>
      </div>
       
  
    )
}


export default Home;