import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={styles.footer}>
        <div className={styles.footer__container}>
            <div className={styles.footer__container__logo}>
                <img className={styles.logo} src='..\src\assets\img\Frame 37.png' alt='logo' />
            </div>
            <div className={styles.footer__container__links}>
                <ul className={styles.footer__container__links__list}>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Help & Support</li>
                    <li>T&C</li>
                </ul>
                <h3>Contact: +91 123456789</h3>
            </div>
            <div className={styles.footer__container__icons}>
                <img className={styles.facebook} src='..\src\assets\img\facebook icon.png' alt='facebook' />
                <img className={styles.instagram} src='..\src\assets\img\Vector (1).png' alt='instagram' />
                <img className={styles.twitter} src='..\src\assets\img\twitter icon.png' alt='twitter' />
            </div>
        </div>
    </div>
  )
}

export default Footer