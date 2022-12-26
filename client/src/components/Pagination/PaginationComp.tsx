import React from 'react'
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { useCustomSelector } from '../../hooks/store';
import { selectCurrentData } from '../../redux/selectors';
import { fetchPaginationPizzas } from '../../redux/slices/pizzaSlice';
import { PizzaState } from "../../redux/slices/pizzaSlice";
import s from './PaginationComp.module.scss';

export const Pagination: React.FC = () => {
  const [page, setPage] = React.useState<number>(0)
  const pizzaState = useCustomSelector<PizzaState>(selectCurrentData);
  const dispatch = useDispatch()


  React.useEffect(() => {
    dispatch(fetchPaginationPizzas(page))
  }, [dispatch, page])
    

  type PageType = {
    selected: number
  }

  return (
    <>
    <ReactPaginate
      className={s.root}
      breakLabel="<"
      nextLabel=">"
      onPageChange={(e: PageType) => setPage(e.selected)}
      pageRangeDisplayed={4}
      pageCount={pizzaState.pizza.items.pages}
      previousLabel="<"
      renderOnZeroPageCount={null || undefined}
    />
  </>
  )
}
