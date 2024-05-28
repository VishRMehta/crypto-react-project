import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input, Spin } from 'antd';
import millify from 'millify';

import { useGetCurrencyQuery } from '../services/currencyAPI';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 15 : 50;
  const { data, isFetching } = useGetCurrencyQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState('');
  console.log(data);

  useEffect(() => {
    const filteredData = data?.data?.coins.filter((currency) =>
      currency.name.toLowerCase().includes(search.toLowerCase())
    );
    setCryptos(filteredData);
  }, [data, search]);

  if (isFetching) {
    return <Spin />;
  }

  return (
    <>
      <div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearch(e.target.value)} />
      </div>

      <Row gutter={[15, 15]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name} (${currency.symbol})`}
                extra={<img className='crypto-image' src={currency.iconUrl} alt='' />}
                hoverable
              >
                <p><strong>Price:</strong> ${millify(currency.price)}</p>
                <p><strong>Market Cap:</strong> ${millify(currency.marketCap)}</p>
                <p><strong>Daily Change:</strong> {currency.change}%</p>
                <p><strong>24 Hour Volume:</strong> ${millify(currency['24hVolume'])}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
