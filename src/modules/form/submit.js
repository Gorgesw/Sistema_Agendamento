import dayjs from "dayjs"
import { hoursLoad } from "./hours-load"
import { scheduleDay } from "../schedules/load.js"
import { scheduleNew } from "../../services/schedule-new.js"


const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

//Date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

//Carega a data atual e define a data mínima, como sendo a data atual.
selectedDate.value = inputToday


form.onsubmit = async (event) => {
    //Previne o comportamento padrão de carregar a página.
    event.preventDefault()

    try {
        //Recuperando o nome do cliente
        const name = clientName.value.trim()

        if (!name) {
            return alert("Informe o nome do cliente")
        }

        //Recupera o horário Selecionado.
        const hourSelected = document.querySelector(".hour-selected")

        //Recupera o horário Selecionado.
        if (!hourSelected) {
            return alert("Seleciona a hora")
        }

        //Recupera somente a hora.
        const [hour] = hourSelected.innerText.split(":")

        //Insere a data na hora.
        const when = dayjs(selectedDate.value).add(hour, "hour")

        //Gera um ID
        const id = String(new Date().getTime())

        //Faz o agendamento.
        await scheduleNew({
            id,
            name,
            when,
        })

        //Recarrega os agendamentos. 
        await scheduleDay()

        //Limpa o input que recebe o nome do cliente.
        clientName.value = ""

    } catch (error) {
        alert("Não foi possível realizar o agendamento")
        console.log(error)
    }
}