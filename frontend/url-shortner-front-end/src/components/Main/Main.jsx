import React from 'react'
import { useState, useRef } from 'react';
import UrlList from '../UrlList/UrlList.jsx';
import CustomDropdown from '../CustomDropdown/CustomDropdown.jsx';

import classes from './Main.module.css';

function Main() {
    const [list, setList] = useState([]);
    const [inputUrl, setInputUrl] = useState('');
    const [expiration, setExpiration] = useState('');
    const [selectedOption, setSelectedOption] = useState('Add expiration date');


    const options = [
      { value: 1, label: '1 minute' },
      { value: 5, label: '5 minutes' },
      { value: 30, label: '30 minutes' },
      { value: 60, label: '1 hour' },
      { value: 300, label: '5 hours' },
    ];

    const handleSelect = (option) => {
      setExpiration(+option.value)
      setSelectedOption(option.label);
    };

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
          setSelectedOption('Select an Option');
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
        <CustomDropdown options={options} onOptionSelect={handleSelect} selectedOption={selectedOption} />
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
