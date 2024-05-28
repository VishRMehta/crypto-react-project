import React from 'react'
import { Typography, Row, Col, Statistic, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCurrencyQuery } from '../services/currencyAPI'
import CryptoCurrencies from './Cryptocurrencies'
import News from './News'

const Homepage = () => {

  const { data, isFetching } = useGetCurrencyQuery(15);
 
  if (isFetching) {
    return <Spin />;
  }
  const globalStats = data?.data?.stats;

  return (
    <>
      <Typography.Title level={2} className='heading'>Global Crypto Stats</Typography.Title>
      <Row>
        <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats.total} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value={globalStats.totalExchanges} /></Col>
        <Col span={12}><Statistic title='Total Market Cap' value={globalStats.totalMarketCap} /></Col>
        <Col span={12}><Statistic title='Total 24h Volume' value={globalStats.total24hVolume} /></Col>
        <Col span={12}><Statistic title='Total Markets' value={globalStats.totalMarkets} /></Col>
      </Row>

      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Top 15 Cryptos In The World</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
      </div>
      <CryptoCurrencies simplified />
      
      <div className='home-heading-container'>
        <Typography.Title level={2} className='home-title'>Latest News</Typography.Title>
        <Typography.Title level={3} className='show-more'><Link to='/news'>Show More</Link></Typography.Title>
      </div>

      <News simplified />
    </>
  )
}

export default Homepage