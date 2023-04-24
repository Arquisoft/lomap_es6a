import { useState } from 'react';
import {Navigate } from 'react-router-dom';
import Form from './form'
import Menu from './menu';
import '../../hojasEstilo/MapaPrincipal.css';
import {SessionType} from "../../shared/shareddtypes";

function MapaPrincipal({ session }: SessionType){
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }
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
    </div>
  );
  
}

export default MapaPrincipal