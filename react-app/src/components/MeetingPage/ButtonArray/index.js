import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../button';
import styles from './ButtonArray.module.css';

export default function ButtonArray({meeting}) {
  const { id } = useParams();
  const history = useHistory();

  const onEdit = () => {
    history.push(`/meetings/${id}/update`)
  }

  const onCloseRoom = () => {
    history.push(`/meetings/${id}/end`)
  }

  return (
    <div className={styles.arrayContainer}>
      <Button
        text={"Edit"}
        action={onEdit}
        // paddingY={}
        // paddingX={}
        width={100}
        // height={}
        borderRadius={10}
        btnColor={"gold"}
        fontColor={"black"}
        fontSize={16}
      />
      <Button
        text={"Lock Queue"}
        action={onEdit}
        // paddingY={}
        // paddingX={}
        width={100}
        // height={}
        borderRadius={10}
        btnColor={"blue"}
        fontColor={"white"}
        fontSize={16}
      />
      <Button
        text={"Close Room"}
        action={onCloseRoom}
        // paddingY={}
        // paddingX={}
        width={100}
        // height={}
        borderRadius={10}
        btnColor={"crimson"}
        fontColor={"white"}
        fontSize={16}
      />
    </div>
  )
}
