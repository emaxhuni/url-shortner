import React from 'react'
import { useState } from 'react';
import UrlList from '../UrlList/UrlList.jsx';

import classes from './Main.module.css';

function Main() {
    const [list, setList] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [expiration, setExpiration] = useState('');

    const handleShortenUrl = async () => {
        if (!inputUrl) {
          alert('Please enter a URL.');
          return;
        }
    
        try {
          const payload = { url: inputUrl };
          if (expiration) {
            payload.experationDate = expiration;
          }
    
          const response = await fetch('/api/url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
    
          if (!response.ok) {
            throw new Error('Failed to shorten URL.');
          }
    
          const newUrl = await response.json();
    
          setList((prevList) => [...prevList, newUrl]);
    
          setInputUrl('');
          setExpiration('');
        } catch (error) {
          console.error('Error shortening URL:', error);
          alert('An error occurred while shortening the URL. Please try again.');
        }
    };

  return <main className={classes.main}>
  <UrlList list={list} />
  <div className={classes.urlShortner}>
    <h1 className={classes.title}>URL Shortner</h1>
    <div className={classes.urlInputContainer}>
        <input
            type="text"
            placeholder="Place the URL to be shortened"
            className={classes.urlInput}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
        />
        <select
          value={expiration}
          onChange={(e) => setExpiration(+e.target.value)}
          className={classes.expirationSelect}
        >
          <option className={classes.expirationOption} value="" disabled>
            Add expiration date
          </option>
          <option className={classes.expirationOption} value="1">1 minute</option>
          <option className={classes.expirationOption} value="5">5 minutes</option>
          <option className={classes.expirationOption} value="30">30 minutes</option>
          <option className={classes.expirationOption} value="60">1 hour</option>
          <option className={classes.expirationOption} value="300">5 hours</option>
        </select>
    </div>
    <button 
      className={classes.shortenBtn} 
      onClick={handleShortenUrl}
    >
      Shorten URL
    </button>
  </div>
</main>
}

export default Main
