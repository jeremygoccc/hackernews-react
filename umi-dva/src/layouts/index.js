import NavLink from 'umi/navlink'
import styles from './index.less'

const Layout = (props) => {
  return (
    <div className={styles.normal}>
      <div className={styles.header}>
        <div className={styles.inner}>
          <NavLink to="/">
            <img className={styles.logo} src="https://zos.alipayobjects.com/rmsportal/AsASAiphPWWUJWG.png" alt="" />
          </NavLink>
          <NavLink activeClassName={styles.active} to="/top">Top</NavLink>
          <NavLink activeClassName={styles.active} to="/new">New</NavLink>
          <NavLink activeClassName={styles.active} to="/show">Show</NavLink>
          <NavLink activeClassName={styles.active} to="/ask">Ask</NavLink>
          <NavLink activeClassName={styles.active} to="/job">Jobs</NavLink>
        </div>
      </div>
      <div className={styles.view}>
        { props.children }
      </div>
    </div>
  )
}

export default Layout
