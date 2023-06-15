import styles from "./style.module.css";
import Logo from "../../img/logo.png";
import Todo from "../../components/Todo";

export default function Home() {
    return (
        <div className={styles.home}>
            <header className={styles.headerApp}>
                <img src={Logo} alt='logo' />
            </header>
            <div className={styles.ctnBody}>
                <div className={styles.ctnMain}>
                    <div className={styles.ctnContent}>
                        <div className={styles.todo}>
                            <Todo/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}