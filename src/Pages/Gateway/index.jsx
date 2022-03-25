import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import ActionBtn from '../../Components/ActionBtn';
import Delete from '../../Assets/delete.png';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import './gateway.css';

const Gateway = (props) => {
  const [adpData, setADPData] = useState({
    vendor: '',
    dateCreated: '',
    status: 'offline',
  });
  const params = useParams();
  const [gateway, setGateway] = useState(null);
  const url = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getGateway = axios.get(`${url}gateway/${params.id}`);
    toast.promise(
      getGateway,
       {
         loading: 'Fetching Gateway...',
         success: (resp) => {
           setGateway(resp.data.data);
          return 'Gateway fetched Successfully!'
        },
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || 'Error Fetching Gateway.';
        },
       },
       {
        style: {
          minWidth: '250px',
          fontWeight: 'bold',
        },
      }
     );
  }, [params.id, url]);

  const addAdp = (event) => {
    event.preventDefault();
    const addADP = axios.post(`${url}gateway/${params.id}/adp`, adpData);
    toast.promise(
      addADP,
       {
         loading: 'Adding Adp...',
         success: (resp) => {
          setGateway(resp.data.data);
          setADPData({
            vendor: '',
            dateCreated: '',
            status: 'offline',
          })
          return 'Adp added Successfully!'
        },
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || 'Error adding Adp.';
        },
       },
       {
        style: {
          minWidth: '250px',
          fontWeight: 'bold',
        },
      }
     );
  };

  const removeAdp = (id) => {
    const removeADP = axios.delete(`${url}gateway/${params.id}/adp/${id}`);
    toast.promise(
      removeADP,
       {
         loading: 'Removing ADP...',
         success: (resp) => {
           setGateway(resp.data.data);
          return 'ADP removed Successfully!'
        },
        error: (err) => {
          const msg = err?.response?.data?.message;
          return msg || 'Error removing ADP.';
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

  const handleChange = (name, value) => {
    setADPData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  if (!gateway) {
    return null;
  }

  return (
    <div className='gateway'>
      <div className='gateway-header'>
        <div className='details'>
          <div className='logo'>{gateway.name[0]}</div>
          <div className='detail'>
            <span className='name'>{gateway.name}</span>
            <span className='ip'>{gateway.address}</span>
          </div>
        </div>
        <form onSubmit={addAdp} className='add-adp-btn-wrapper'>
          <Input onChange={handleChange} label="Vendor" required name="vendor" value={adpData.vendor} />
          <Input onChange={handleChange} type="date" label="Date Created" required name="dateCreated" value={adpData.dateCreated} />
          <Select onChange={handleChange} options={['offline', 'online']} label="Status" required name="status" value={adpData.status} />
          <button className='add-adp-btn' type='submit'>Add ADP</button>
        </form>
      </div>
      
      <div className='adp-wrapper'>
        <h3>ADPs</h3>
        <div className='table'>
          <div className='header'>
            <span className='id'>id</span>
            <span className='ip'> Vendor</span>
            <span className='name'>Date Created</span>
            <span className='name adp-name'>Status</span>
            <span className='actions'>Actions</span>
          </div>
          <div className='body'>
            {
              gateway.adp.length === 0 &&  <div className='row'><span>No ADP found for this Gateway</span></div>
            }
            {
              gateway.adp.map((adp) => (
                <div className='row'>
                  <span className='id'>{adp._id}</span>
                  <span className='ip'>{adp.vendor}</span>
                  <span className='name'>{adp.dateCreated}</span>
                  <span className='name adp-name'>{adp.status}</span>
                  <span className='actions'>
                    <ActionBtn icon={Delete} atn='Delete' onClick={() => removeAdp(adp._id)} />
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Link to="/gateways">Go Back</Link>
    </div>
  )
};

export default Gateway;
