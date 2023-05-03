import { useState } from "react";
import { useGetGoodsQuery, useAddProductMutation } from "./redux";

function App() {

    // работа с кэшем
    const [count, setCount] = useState('')

    // если в поле уже что то набрано,мы вызываем асинхронную функцию handleAddProduct
    const [newProduct, setNewProduct] = useState('')

    // процедура вызова хука приведет к запросу на сервер за данными. count спускаем в хук useGetGoodsQuery в limit
    const {data = [], isLoading} = useGetGoodsQuery(count)
    // мутация отправляет запрос по необходимости и поэтому в массиве мы получаем функцию для вызова мутации 
    // (называем как хотим) и объект похожие на тот что дает query
    const [addProduct, {isError}] = useAddProductMutation()


    
    // для работы с функцией мутации addProduct создадим функцию обработчик
    const handleAddProduct = async () => {
        if(newProduct) {
            // unwrap - для корректной работы обработчиков isLoading, isError и тд
            await addProduct({name: newProduct}).unwrap()
            setNewProduct('')
        }
    }
if (isLoading) {return <h1>Loading...</h1>}

  return (
    <div className="App">

        <div>
            <input
            type="text"
            value={newProduct} 
            onChange={e => setNewProduct(e.target.value)}
            />
            <button onClick={handleAddProduct}>add product</button>
        </div>

        <select value={count} onChange={e => setCount(e.target.value)}>
            <option value="''">all</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>

        <ul>
            {data.map(item =>
                <li key={item.id}>
                    {item.name}
                </li>
            )}
        </ul>

    </div>
  );
}

export default App;
