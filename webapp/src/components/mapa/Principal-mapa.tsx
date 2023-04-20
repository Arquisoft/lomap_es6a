import React, { useRef, useEffect, useState } from 'react';
import Form from './form'
import Menu from './menu';
import '../../hojasEstilo/MapaPrincipal.css';
import {SessionType} from "../../shared/shareddtypes";

function MapaPrincipal({ session }: SessionType){
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  const handleFilter = (option: string) => {
    if (option === 'All') {
      setFilteredItems(allItems);
    } else {
      const filtered = allItems.filter(item => item.includes(option));
      setFilteredItems(filtered);
    }
  }
  return (
    <div className='contenedor-principal-mapa'>
      <Form session={session}/>
      <div>
      <Menu options={['All', '1', '2', '3']} onFilter={handleFilter} />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
    </div>
  );
  
}

export default MapaPrincipal