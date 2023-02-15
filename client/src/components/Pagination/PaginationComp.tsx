import React from 'react'
import ReactPaginate from 'react-paginate';
import { useCustomDispatch, useCustomSelector } from '../../hooks/store';
import { selectCurrentData } from '../../redux/selectors';
import { fetchPaginationPizzas } from '../../redux/slices/pizzaSlice';
import { PizzaState } from "../../redux/slices/pizzaSlice";
import s from './PaginationComp.module.scss';

export const Pagination: React.FC = () => {
  const [page, setPage] = React.useState<number | null>(null)
  const pizzaState = useCustomSelector<PizzaState>(selectCurrentData);
  const dispatch = useCustomDispatch()

  React.useEffect(() => {
    if(page !== null) {
      dispatch(fetchPaginationPizzas(page))
    }
  }, [dispatch, page])
    
  type PageType = {
    selected: number
  }

  return (
    <>
    <ReactPaginate
      className={s.root}
      nextLabel=">"
      onPageChange={(e: PageType) => 
        setPage(e.selected)
      }
      pageCount={pizzaState.pages ? pizzaState.pages : 0  }
      previousLabel="<"
      renderOnZeroPageCount={null || undefined}
    />
  </>
  )
}
