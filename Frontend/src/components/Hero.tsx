import { Button } from '@mantine/core';



const Hero = () => {
    return  <div className="flex  px-20 ">

      {/* Left Section */}

      <div className= "flex flex-col items-center mt-6 pt-8 w-1/2 gap-8">

        <div className="text-bright-sun-400 text-xl font-bold">
          Very Proud To Introduce
          </div>

        <div className="text-center font-bold text-5xl text-white p-2">
            
          Home Services At Your <span className='text-bright-sun-500'> Doorstep </span>
          </div>

        <div className="text-mine-shaft-100 text-center text-lg">
          Your home's trusted ally. Expert solutions in electrical, plumbing, carpentry, and more. Transparent pricing, skilled professionals, hassle-free bookings. We're here to make your house a home, ensuring every service call brings peace of mind
        
          </div>


        <div className='w-48  mt-4'>
         <Button 
            fullWidth
            size='md'
            variant="filled" color="orange"
            
            >
           Explore Services
             </Button>
          </div>

        <div className="flex gap-16 mt-4 text-lg">
          <div className="flex gap-6">
            <div>
              <img src="starIcon.png" alt="" />
            </div>
            <div className='flex flex-col justify-center text-white '>
              <div className='text-center'>4.7</div>
              <div>Service Rating</div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div>
              <img src="group-users.png" alt="" />
            </div>
            <div className='flex flex-col justify-center text-white'>
              <div className='text-center'>5M+</div>
              <div>Customer Globally</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-1/2">
        <img src="Electritian.png" alt="" />
      </div>
    </div>
}

export default Hero;