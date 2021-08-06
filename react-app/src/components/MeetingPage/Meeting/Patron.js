import React from 'react';
import styles from './Patron.module.css'


export default function Patron({patron}) {
  return (
    <span>
      {patron.user.username}
    </span>
  )
}
