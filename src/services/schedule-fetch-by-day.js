import dayjs from "dayjs"
import { apiConfig } from "./api-config"



export async function scheduleFetchByDay({ date }) {
    try {
        //Faz a requisição
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        //Converte para JSON
        const data = await response.json()

        //Filtra os agendamentos pelo dia selecionado.
        const dailySchedules = data.filter((schedule) =>
            dayjs(schedule.when).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")
        )

        return dailySchedules
        
    } catch (error) {
        console.log(error)
        alert("Não foi possível buscar os agendamentos do dia selecionado")
    }

}