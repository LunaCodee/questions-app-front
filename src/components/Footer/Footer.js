import styles from './styles.module.css';
import { useState } from "react";


const Footer =()=>{
    const [isMenuOpen, setMenuOpen] = useState(false);

    return(
        <>
 <div className={styles.footer}>@copyright 2023</div>
        </>
    )
}
export default Footer;