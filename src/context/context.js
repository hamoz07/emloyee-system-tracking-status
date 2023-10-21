import { createContext } from 'react'

const CatContext = createContext({
    categories:null,
    setCategories:() => {}
})

export default CatContext