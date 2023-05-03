import { configureStore } from "@reduxjs/toolkit";
// импортируем корневую константу
// import { goodsApi } from "./goodsAPI";
import { goodsApi } from "./goodsApi";

export const store = configureStore({
    reducer: {
        // имя динамическое, описывали в goodsApi. goodsApi.reducer создается автоматически при использовании
        // createApi и уже содержит необходимый набор параметров
        [goodsApi.reducerPath]: goodsApi.reducer
    },
    //middleware функция, которая принимает middleware по умолчанию, вызов ее даст массив и в этот массив
    //добавляем те middleware которые создал сам RTK Query в goodsApi
    middleware: (getDefaultMiddlaware) => getDefaultMiddlaware().concat(goodsApi.middleware)
})
