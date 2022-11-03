import axiosInstance from "../utils/axios"

interface Expense {
  name: string;
  price: number;
  category_id: number;
}


const ExpenseService = {

   getAll: async () => {
      let response = await axiosInstance.get('/expenses')

      return response.data
   },
   getById: async (id: number) => {
      if (!id) return

      let response = await axiosInstance.get(`/expenses/${id}`)
      return response.data
   },
   create: async (expense: Expense) => {
      if (!expense) return

      let response = await axiosInstance.post(`/expenses`, { expense: expense })
      return response
   },
   destroy: async (id: number) => {
      if (!id) return

      let response = await axiosInstance.delete(`/expenses/${id}`)
      return response

   },
   update: async (id: number, expenses: Expense) => {
      if (!id) return

      let response = await axiosInstance.put(`/expenses/${id}`, { expense: expenses })
      return response.data

   }
}

export default ExpenseService