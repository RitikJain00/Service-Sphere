
import { IconMapPin,  IconStar,IconBriefcase, IconSearch } from "@tabler/icons-react";
import SearchableMultiSelect from "./Multiselect";
import SelectComboboxData from "./Combobox";

import { RangeSlider } from '@mantine/core';
import { useState } from 'react';
import { useLocation } from "react-router-dom";



const SearchBox = () => {

  const [value, setValue] = useState<[number, number]>([0, 750]);
  const location = useLocation()

  

  const ComboboxData = [
  
    {
      title: 'Experience',
      icon: IconBriefcase ,
      options: ['1+ Years', '3+ Years', '5+ Years', '10+ Years', '20+ Years', '30+ Years']
    },

    {
      title: 'Rating',
      icon:  IconStar ,
      options: [ `4 \u2B50 & above`, '3 \u2B50 & above']
    }
  ]


    return <div className="flex flex-col gap-12 ">

      {/* Category & Location */}
     
      {location.pathname.slice(1) === 'Explore' && <SearchableMultiSelect Data = {
         {
          title: 'Search Category',
          icon: IconSearch,
          options: ['Carpenter' , 'Painter', 'HouseKeeping', 'Electrician', 'Contractor', 'Plumber', 'Technician', 'PestControl']
        }
      }/>}

      

      <SearchableMultiSelect Data = {
        {
          title: 'Search Location',
          icon: IconMapPin,
          options: ['Delhi','Mumbai','Kolkata','Chennai','Bengaluru','Hyderabad','Jaipur','Lukhnow','Pune',  'Guwahati','Ahemdabad','Bhubaneswar']
        }
      }/>

      {/* Expierience and Rating */}
      {
        ComboboxData.map((item,index) => <div key={index} className=""> 
        <SelectComboboxData Data = {item}/> 
        </div>)
      }

      {/* Price */}
      <div className="mr-8">
        
      <RangeSlider 
      color='bright-sun.4' 
      size='sm' value={value} 
      onChange={setValue} 

      min={0}
      max={1000}
      label={(value) => value.toFixed(1)}
      step={10}
      styles={{ markLabel: { display: 'none' } }}
     
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',}}
          />
     
      <div className="flex justify-between text-lg mt-2 text-mine-shaft-300">
          <div>Price</div>
          <div>&#8377;{value[0]} - &#8377;{value[1]}</div>
        </div>

        </div>
      
    </div> 
}

export default SearchBox;