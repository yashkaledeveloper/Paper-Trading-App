import React, { useEffect, useState } from 'react'
import "./BuyActionWindow.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BuyActionWindow = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
      axios.get(`http://localhost:4000/buystockdata/${id}`).then((res) => {
        setData(res.data);
      })
    }, [id])

  return (
    <form className="buy-action-window">
      <h2>BUY STOCK</h2>
      <h3>{data.name}</h3>
      <div className='flex'>
        <div className='input'>
          <label htmlFor="quantity">QTY</label>
          <input type="number" value={1}/>
        </div>
        <div className='input'>
          <label htmlFor="quantity">PRICE</label>
          <input type="number" value={data.price}/>
        </div>
      </div>
      <button>BUY NOW!</button>
    </form>
  )
}

export default BuyActionWindow
