import { Link } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { NavHashLink } from 'react-router-hash-link';import Input from '../../Components/Input';
import './home.css';

const Home = () => {
  const [gatewayData, setGatewayData] = useState({
    serialNumber: '',
    address: '',
    name: '',
  });

  const handleChange = (name, value) => {
    setGatewayData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const url = process.env.REACT_APP_BASE_URL;

  const addIPGateway = (event) => {
    event.preventDefault();
    const addGateway = axios.post(`${url}gateway`, gatewayData);
    toast.promise(
      addGateway,
       {
         loading: 'Adding Gateway...',
         success: () => {
           setGatewayData({
            serialNumber: '',
            address: '',
            name: '',
          });
          return 'Gateway added Successfully!'
        },
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || 'Error adding Gateway.';
        },
       },
       {
        style: {
          minWidth: '250px',
          fontWeight: 'bold',
        },
      }
     );
  }
  return (
    <div className='home'>
      <div className='left'>
        <h1>IP Gateway Manager</h1>
        <p>Manage(Add, View, Edit and Delete) all your IPs in one place alongside their Associated Peripheral Devices(APD).</p>
        <div>
          <button><Link to="/gateways">View IP Gatways</Link></button>
          <NavHashLink to="/#addGateway" smooth className='add-gateway'>
            <button >Add IP Gatway</button>
          </NavHashLink>
        </div>
      </div>
      <div className='right' id="addGateway">
        <h3>Add IP Gateway</h3>
        <form onSubmit={addIPGateway}>
          <div>
            <Input label="Serial Number" required  onChange={handleChange} name="serialNumber" value={gatewayData.serialNumber}  />
            <div className='form-grp'>
              <Input label="Name" required onChange={handleChange} name="name" value={gatewayData.name}  />
              <Input
                label="Address"
                required
                onChange={handleChange}
                name="address"
                value={gatewayData.address}
              />
            </div>
          </div>
          <button className='save-gateway' type='submit'>Save Gateway</button>
        </form>
      </div>
    </div>
  )
};

export default Home;
