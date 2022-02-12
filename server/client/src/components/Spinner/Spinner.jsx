import style from './Spinner.module.css';
import { Oval } from 'react-loader-spinner';

const Spinner = () => {
    return (
        <section className={style.spinner}>
            <Oval color="#b40606" height={70} width={70} />
        </section >
    )
}

export default Spinner;