import { useEffect, useState } from 'react';
import styles from './UserInfoHoverSection.module.scss'
import type { User } from '../../../model/Types';
import { fetchUserInfo } from '../../../functions/FetchFuncitons';
const UserInfo = () => {
    const [userInfo, setUser] = useState<User>({ name: 'user', email: 'example@gmail.com' })

    const getUserInfo = () => {
        try {
            fetchUserInfo().then(info => {
                if (info && typeof info === 'object' && !Array.isArray(info)) {
                    setUser(info);
                }
            });

        } catch (error) {
            console.error('erron in getUserInfo', error);

        }
    }
    useEffect(() => {
getUserInfo()
    }, []);
    return (
        <div className={styles.userInfoWrapper}>
            <p>Hello, {userInfo.name}</p>
        </div>
    )
}

export default UserInfo
