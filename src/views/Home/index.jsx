import { useState, useRef, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import useEventsData from "../../hooks/useEventsData";
import styles from './Home.module.css'

const Home = () => {
  const { events, isLoading, error, fetchEvents, page } = useEventsData();
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef();
  
  useEffect(() => {
    fetchEvents();
  })
  const handleNavbarSearch = (term) =>{
    setSearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  }

  if(error){
    return ;
    
}
if(isLoading){
    return 
}

const handlePageClick = ({ selected }) => {
  fetchEvents(`&keyword=${searchTerm}&page=${selected}`)
}

const renderEvents = () => {
  if(isLoading){
    return <div>Cargando Resultados...</div>;
  }
  if(error){
    return <div> Ha ocurrido un error</div>;
  }

  return (
    <div>
    <Events searchTerm={searchTerm} events={events}/>
    <ReactPaginate
      className={styles.pagination}
      nextClassName={styles.next}
      previousClassName={styles.previous}
      pageClassName={styles.page}
      activeClassName={styles.activePage}
      disabledClassName={styles.disablePage}
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={page.totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
    </div>
    )
}
  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>
      {renderEvents()}
    </>
  )
}

export default Home;
