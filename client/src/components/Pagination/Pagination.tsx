import React, { FC, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useCustomSelector } from '../../hooks/store';
import { selectCurrentData } from '../../redux/selectors';
import { fetchPaginationPizzas } from '../../redux/slices/pizzaSlice';
import s from './Pagination.module.scss';

export const Pagination: FC = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(0)
  const pizzaState = useCustomSelector(selectCurrentData);


  React.useEffect(() => {
    dispatch(fetchPaginationPizzas(page))
  }, [dispatch, page])
    

  return (
    <>
    <ReactPaginate
      className={s.root}
      breakLabel="<"
      nextLabel=">"
      onPageChange={e => setPage(e.selected)}
      pageRangeDisplayed={4}
      pageCount={pizzaState.pizza.items.pages}
      previousLabel="<"
      renderOnZeroPageCount={null || undefined}
    />
  </>
  )
}
