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
    console.log(page)
    if(page) {
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
        // console.log(e.selected)
      }
      pageRangeDisplayed={2}
      pageCount={pizzaState.isLoading === "loaded" ? pizzaState.pages : 0}
      previousLabel="<"
      renderOnZeroPageCount={null || undefined}
    />
  </>
  )
}
