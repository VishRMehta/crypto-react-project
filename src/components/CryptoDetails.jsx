import React from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined,  CheckOutlined, NumberOutlined, ThunderboltOutlined} from '@ant-design/icons';
import { useGetDetailsQuery } from '../services/currencyAPI';

const CryptoDetails = () => {

  const { coinId } = useParams();
  const { data, isFetching } = useGetDetailsQuery(coinId);
  const cryptoDetails = data?.data?.coin;
  console.log(data);
  console.log(cryptoDetails.name);
  console.log(cryptoDetails.description);

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className="coin-detail-container">
      
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </Typography.Title>
        <Typography.Text> Live price in US Dollar (USD). View value statistics, market cap and supply.</Typography.Text>
      </Col>

      <Col className="stats-container">
       <Col className="coin-value-statistics">
         <Col className="coin-value-statistics-heading">
           <Typography.Title level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</Typography.Title>
           <Typography.Text>An overview showing the statistics of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</Typography.Text>
         </Col>
         {stats.map(({ icon, title, value }) => (
           <Col className="coin-stats">
             <Col className="coin-stats-name">
               <Typography.Text>{icon}</Typography.Text>
              <Typography.Text>{title}</Typography.Text>
             </Col>
             <Typography.Text className="stats">{value}</Typography.Text>
           </Col>
        ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Typography.Title level={3} className="coin-details-heading">Other Stats Info</Typography.Title>
            <Typography.Text>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</Typography.Text>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Typography.Text>{icon}</Typography.Text>
                <Typography.Text>{title}</Typography.Text>
              </Col>
              <Typography.Text className="stats">{value}</Typography.Text>
            </Col>
          ))}
        </Col>

      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Typography.Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Typography.Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className="coin-links">
          <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Typography.Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
            </Row>
          ))}
        </Col>
      </Col>

    </Col>

    // <div>
    //   <h1>Crypto Details</h1>
    // </div>
  )
}

export default CryptoDetails