import React from 'react'
import Header from './Header'
import styles from './Layout.module.css'

function Layout({children}) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.contents}>
          {children}
      </div>
    </div>
  )
}

export default Layout