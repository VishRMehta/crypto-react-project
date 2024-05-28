import React from 'react';
import { useState } from 'react';
import moment from 'moment';
import { Select, Typography, Row, Col, Card } from 'antd';

import { useGetCurrencyNewsQuery } from '../services/currencyNewsAPI';

const News = () => {
  const [newsOutlet, setNewsOutlet] = useState('coindesk');
  const { data, isFetching } = useGetCurrencyNewsQuery(newsOutlet);
  

  console.log(data);
  if (isFetching) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>

      <Col span={24}>
        <Select showSearch className='select-news' 
                placeholder='Select a News Outlet' 
                optionFilterProp='children' 
                onChange={(value) => setNewsOutlet(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          <Select.Option value='coindesk'>Coindesk</Select.Option>
          <Select.Option value='cointelegraph'>Cointelegraph</Select.Option>
          <Select.Option value='bitcoinist'>Bitcoinist</Select.Option>
          <Select.Option value='decrypt'>Decrypt</Select.Option>
          <Select.Option value='bsc'>BSC</Select.Option>
          <Select.Option value='theguardian'>The Guardian</Select.Option>
        </Select>
      </Col>

      {data.data.map((newsItem) => (
        <Col xs={24} sm={12} lg={8} key={newsItem.url}>
          <Card hoverable className='news-card'>
            <a href={newsItem.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Typography.Title className='news-title' level={4}>{newsItem.title}</Typography.Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={newsItem.thumbnail || 'https://www.bing.com/th?id=OVFT.1B9m0o3X7q1v6Zq5r6wZ5w&pid=Api'}
                  alt='news'
                />
              </div>
              <p>
                {newsItem.description.length > 100
                  ? `${newsItem.description.substring(0, 100)}...`
                  : newsItem.description}
              </p>
              <div className='provider-container'>
                <Typography.Text><strong>{moment(newsItem.createdAt).format('MMMM Do, YYYY')}</strong></Typography.Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
