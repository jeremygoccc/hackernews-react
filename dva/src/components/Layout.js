import React from 'react'
import { Link } from 'dva/router'
import styles from './Layout.less'

const Layout = (props) => {
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <Link to="/">
            <img className={styles.logo} src="https://zos.alipayobjects.com/rmsportal/AsASAiphPWWUJWG.png" alt="" />
          </Link>
          <Link activeClassName={styles.active} to="/top">Top</Link>
          <Link activeClassName={styles.active} to="/new">New</Link>
          <Link activeClassName={styles.active} to="/show">Show</Link>
          <Link activeClassName={styles.active} to="/ask">Ask</Link>
          <Link activeClassName={styles.active} to="/job">Jobs</Link>
        </div>
      </div>
      <div className={styles.view}>
        { props.children }
      </div>
    </div>
  )
}

export default Layout
