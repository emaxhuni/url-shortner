import React, { useState, useEffect } from 'react';
import Url from '../Url/Url.jsx';
import logo from '../../svg/AnchorzUp_Logo.svg';

import classes from './UrlList.module.css';

const UrlList = ({ list }) => {
  const [urlList, setUrlList] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/url');
      if (!response.ok) {
        throw new Error('Failed to fetch URLs');
      }
      const urls = await response.json();
      setUrlList(urls);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  };

  const handleDelete = async (shortUrl) => {
    try {
      const response = await fetch('/api/url', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shortUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete URL');
      }

      setUrlList((prev) => prev.filter((url) => url.shortUrl !== shortUrl));
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  };

  const handleRedirect = async (url) => {

    try {
      const response = await fetch(`/api/url/${url.urlId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to increment click count');
      }

      fetchUrls();
      
    } catch (error) {
      console.error('Error incrementing click count:', error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [list]);

  return (
    <div className={classes.urlList}>
      <img className={classes.logo} src={logo} alt="logo" />
      <div className={classes.urlListContainer}>
        <h2 className={classes.sideUrlTitle}>My shortened URLs</h2>
        <>
          {urlList.map((url) => (
            <Url 
              key={url.urlId} 
              url={url} 
              onDelete={() => handleDelete(url.shortUrl)} 
              onRedirect={() => handleRedirect(url)}  
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default UrlList;
