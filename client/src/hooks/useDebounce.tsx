import React from 'react'
import debounce from "lodash.debounce";

function useDebounce(str: string, ms: number) {
    const [input, setInput] = React.useState<string>(``)
    const debounceInput = React.useMemo(() =>
        debounce((str) => {
            setInput(str)
            }, ms)
        ,[ms]
    )
    debounceInput(str)
    return input; 
}
export default useDebounce;