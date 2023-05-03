import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// фактически создали редьюсер с доп.возможностями
export const goodsApi = createApi({
    // то как отображается в сторе
    reducerPath: 'goodsApi',
    // сущности, с которыми мы работаем в рамках данного API - для автообновления
    tagTypes: ['Products'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    endpoints: (build) => ({
        getGoods: build.query({
            // добавляем к базовому адресу. limit - функционал json server 
            query: (limit = '') => `goods?${limit && `_limit=${limit}`}`,
            // ф-я проверяет есть ли результат, если есть, то мы возвращаем массив, где элементы массива - 
            // все элементы результата и для каждого элемента вешаем tagType и id
            providesTags: (result) =>
            result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }]
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: 'goods',
                method: 'POST',
                body
            }),
            // уточняем с какими тегами работаем:
            invalidatesTags: [{type: 'Products', id: 'LIST'}]
        })
    })
})
// к названию автоматически добавляется use т.к. это хук и Query так как это квери запрос
export const { useGetGoodsQuery, useAddProductMutation } = goodsApi