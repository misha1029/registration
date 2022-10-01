import React, { FC } from 'react'
import styles from './Header.module.scss'
import { LoginForm } from './LoginForm/LoginForm'


export const Header: FC = () => {
  return (
    <header className={styles.header}>
        <LoginForm/>
    </header>
  )
}
