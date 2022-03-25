import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ActionBtn from '../../Components/ActionBtn';
import View from '../../Assets/view.png';
import './gateways.css';
const Gateways = () => {
  const [gateways, setGateways] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_BASE_URL;
    const update = axios.get(`${url}gateways`);
    toast.promise(
      update,
       {
         loading: 'Fetching Gateways...',
         success: (resp) => {
           setGateways(resp.data.data);
          return 'Gateways fetched Successfully!'
        },
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || 'Error Fetching Gateways.';
        },
       },
       {
        style: {
          minWidth: '250px',
          fontWeight: 'bold',
        },
      }
     );
  }, []);

  return (
    <div className='gateways'>
      <div>
        <h2>Gateways</h2>
        <div className='table'>
          <div className='header'>
            <span className='id'>id</span>
            <span className='ip'>IP Address</span>
            <span className='name'>Name</span>
            <span className='actions'>Actions</span>
          </div>
          <div className='body'>
            {
              gateways.length && gateways.map((gateway, index) => (
                <div className='row' key={index}>
                  <span className='id'>{gateway.serialNumber}</span>
                  <span className='ip'>{gateway.address}</span>
                  <span className='name'>{gateway.name}</span>
                  <span className='actions'>
                    <Link to={`/gateway/${gateway._id}`}><ActionBtn icon={View} atn='View' /></Link>
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      <Link to="/">Go Back</Link>
    </div>
  )
};

export default Gateways;
