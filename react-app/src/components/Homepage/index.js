import React from 'react';
import Tile from './Tile';
import styles from './Homepage.module.css';

export default function Homepage() {

  return (
    <div className={styles.pageContainer}>
      <div className={styles.banner}>Potato Exchange</div>
      <div className={styles.tileContainer}>
        <Tile label={"Host"} destination={"/host"} text={"Host a queue for your own room"} />
        <Tile label={"Join"} destination={"/join"} text={"Looking for someone to meet? Explore queues here!"} rotation={"20"}/>
      </div>
    </div>
  )
}
