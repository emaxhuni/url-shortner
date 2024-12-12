import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

import classes from './Url.module.css';

const Url = ({ url, onDelete, onRedirect }) => {
  return (
    <div className={classes.urlContainer}>
      <div className={classes.url}>
        <a className={classes.shortenUrl} href={url.url} onClick={onRedirect} target="_blank" rel="noopener noreferrer">
          {url.shortUrl}
        </a>
        <button className={classes.deleteUrl} onClick={onDelete}>
          <RiDeleteBin6Line fill="#676767" size={17} className={classes.deleteIcon} />
        </button>
      </div>
      <p className={classes.clicks}>This link has been clicked {url.clicks} times.</p>
    </div>
  );
};

export default Url;
