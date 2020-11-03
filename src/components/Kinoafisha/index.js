//Core
import React, {useState, useEffect} from 'react';

//Theme
import '../../theme/init.css';

//Helpers
import {getStyles} from '../../helpers'

//Api
import {api} from '../../API'

export const Kinoafisha = () => {
  const [selectedFilter, setSelectedFilter] = useState('upcoming'); // Возвращает: 1. selectedFilter -> value(значение), 2. setSelectedFilter -> фун-я

  const [movies, setMovies] = useState([]); // Сохраняем наши фильмы

  const [sortCriteria, setSortData] = useState(null)

  const _updateMoviesByFilter = (e) => {

    const nextFilter = e.currentTarget.dataset.name;
    setSelectedFilter(nextFilter);
  }

  const _getMoviesByFilter = async (nextFilter) => {
    const newMovies = await api.getMovies(nextFilter);

    setMovies(newMovies);
  }

  useEffect(() => {
    _getMoviesByFilter(selectedFilter);
  }, [selectedFilter]);

  const styles = getStyles({
    selectedFilter,
    sortCriteria
  })

  const onToggleSort = () => {
    setSortData((value) => value === null ? 'desc' : null);
  }

  const sortMovies = (a, b) => {
    console.log('a', a.release)
    if (sortCriteria === null) {
      return a.release - b.release; // Сортировка по возрастанию - дефолт
    }

    return b.release - a.release // Сортировка по убыванию
  }

  console.log(movies, setSortData)

  const moviesJSX = movies.sort(sortMovies).map((movie, index) => {
    return (
      <div key={index} className="movie">
        <div className="poster">
          <span className="gengre">{movie.gengre}</span>
          <img src={movie.poster} alt={movie.title}/>
          <span className="rating">{movie.rating}</span>
        </div>
        <span className="title">{movie.title}</span>
      </div>
    )
  });

  return (
    <section className='welcome'>
      <header className="header">
        <div className="logo"></div>
        <div className="filters">
          <div className={styles.latestFilter} data-name='latest' onClick={_updateMoviesByFilter}>
            <span>Новинки {new Date().getFullYear()}</span>
          </div>
          <div className={styles.upcomingFilter} data-name='upcoming' onClick={_updateMoviesByFilter}>
            <span>Скоро в кинотеатрах {new Date().getFullYear()}</span>
          </div>
          <div className={styles.popularFilter} data-name='popular' onClick={_updateMoviesByFilter}>
            <span>В топ-чартах {new Date().getFullYear()}</span>
          </div>
        </div>
      </header>
      <div className="sorting">
        <button type="button" className={styles.sortButton} onClick={onToggleSort}>По новизне</button>
      </div>
      <main className="content">{moviesJSX}</main>
      <footer className="footer">
        <a href="#" className="any-link">lectrum.homework@gmail.com</a>
        <span>2020 © Все права защищены. Разработано с любовью в <a href="#" className="any-link">Лектруме</a></span>
        <div className="social">
          <a href="#" className="facebook"></a>
          <a href="" className="telegram"></a>
        </div>
      </footer>
    </section>
  );
};
