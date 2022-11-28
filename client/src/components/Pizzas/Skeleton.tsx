import React from "react"
import ContentLoader from "react-content-loader"
import s from "./PizzasComp.module.scss";

const Skeleton = (props: any) => (
  <ContentLoader 
    className={s.pizza_block}
    speed={0}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="128" cy="120" r="120" /> 
    <rect x="48" y="270" rx="10" ry="10" width="180" height="20" /> 
    <rect x="-2" y="310" rx="10" ry="10" width="280" height="80" /> 
    <rect x="0" y="419" rx="25" ry="25" width="93" height="36" /> 
    <rect x="125" y="412" rx="30" ry="30" width="155" height="50" />
  </ContentLoader>
)

export default Skeleton