import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import styles from './Favorites.module.scss'
import type { RootState } from '../../../redux/store'
import DreamsList from '../../components/dreamsList/DreamsList'
import { useEffect, useState } from 'react'
import type { Dream } from '../../../model/Types'
import { fetchFavoriteDreams } from '../../../functions/FetchFuncitons'
const Favorites = () => {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const [favoriteDreams, setFavoriteDreams] = useState<Dream[]>([]);
  useEffect(() => {
    fetchFavoriteDreams().then((dreams) => {
      if (dreams) setFavoriteDreams(dreams)
    })
  }, [])
  // useEffect(() => {
  //   fetchFavoriteDreams()
  // }, [toggleRavorite()])

  return (
    <div className={styles.favoritePgeWrapper} data-theme={theme === 'dark' ? 'dark' : 'light'}>
      <Header />
      <div className='home'>
        <div className="dreamsList"><DreamsList dreams={favoriteDreams} setDreams={setFavoriteDreams} /></div>
      </div >
    </div>
  )
}

export default Favorites
