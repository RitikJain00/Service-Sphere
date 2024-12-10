const Features = () => {

  const feature = [{
    name: '24/7 Support',
    description: "Get round-the-clock support tailored to your service needs. Whether it's a plumbing emergency or electrical troubleshooting, our team is available 24/7 to assist you promptly"
  },
  {
    name: 'Verified Professionals',
    description: "Rest assured with our vetted professionals. Each expert on our platform undergoes thorough verification to ensure top-quality service for your peace of mind"
  },
  {
    name: 'Industry Partership',
    description: "Benefit from our industry partnerships. We collaborate with trusted organizations to bring you access to a wider range of services and expertise, ensuring excellence in every aspect of your experience"
  },
  {
    name: 'Service Heading',
    description: "Experience swift service delivery tailored to your schedule. Our efficient team ensures timely completion without compromising quality.Experience lightning-fast service at your fingertips with our cutting-edge technology."
  },
  {
    name: 'Easy Refund & Cancellation',
    description: " Seamless refund and cancellation procedures for your convenience. Rest assured, we've got you covered with our easy-to-use system Simplify refunds and cancellations hassle-free." 
  },

  {
    name: 'Affordability',
    description: "Discover unbeatable affordability without compromise. Our transparent pricing, coupled with competitive rates, ensures you receive top-notch service without breaking the bank." 
  },

  {
    name: 'Pest Control',
    description: "Trust our skilled appliance technicians to keep your household running smoothly.With expertise in repair, maintenance, and installation,We ensure your appliances perform optimally,saving time and hassle" 
  }
]

  return (
     
   <div className="mt-32 mx-10">
        <div className="text-4xl font-bold text-mine-shaft-100 text-center mb-6">
          Discover What <span className="text-bright-sun-500"> Makes Us  </span>Unique
        </div>

        <div className="">

            {
              feature.map((feature, index) => <div key={index} className='hover:bg-bright-sun-600 flex flex-col items-center justify-around border-bright-sun-300 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] !shadow-bright-sun-300  border-2 w-96 mx-8 mt-8 gap-2 p-4 transition duration-500 ">
              <div className='rounded-full bg-bright-sun-500>
                  <div className='rounded-full bg-bright-sun-500'>
                  <img className="w-24 h-24  " src={`Services/${feature.name}.png`} alt="city" />
                 </div>
                  <div className="text-xl font-semibold  text-center text-amber-300">{feature.name}</div>

                <div className='text-center  text-mine-shaft-200 my-2'>
                 {feature.description}
                </div>
              </div>)
            }
        </div>
   </div>

  )
}

export default Features;