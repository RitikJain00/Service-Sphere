import CitySlider from "../components/CitySlider";
import Features from "../components/Features";
import Header from "../components/Header";
import Hero from '../components/Hero'
import Services from "../components/Services";




const Home = () => {
    return (
      <div className="min-h-[100vh] bg-mine-shaft-950 text-base">
           <Header></Header>
           <Hero></Hero>
           <CitySlider></CitySlider>
           <Services></Services>
           <Features></Features>

          
      </div>
       
  
    )
}


export default Home;