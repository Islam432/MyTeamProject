import { useEffect } from 'react'
import jwt from 'jsonwebtoken';
// import styles from './styles.module.scss'
import  Cookies  from 'js-cookie';

const AccountComponents = () => {
  useEffect(() => {

    
    const secretKey = 'your_secret_key';

    const token = Cookies.get('token');

    // if (token) {
    //   try {
    //     const decodedToken = jwt.verify(token, secretKey);
    //     console.log(decodedToken);
    //   } catch (error) {
    //     console.error('Ошибка разархивации токена:',);
    //   }
    // } else {
    //   console.error('Токен не найден.');
    // }
    
  }, [])

  return <div>AccountComponents</div>
}

export default AccountComponents
