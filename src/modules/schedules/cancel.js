import { scheduleDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel"

const periods = document.querySelectorAll(".period")


//Gera evento de click para cada lista (Manhã, Tarde e Noite)
periods.forEach((period) => {
    //Captura o evento de clique na lista;
    period.addEventListener("click", async (event) => {
        if (event.target.classList.contains("cancel-icon")) {

            //Obtém a li pai do elemento clicado.
            const item = event.target.closest("li")

            //Pega o id do agendamento para remover
            const { id } = item.dataset

            //Confirma que o id foi selecionado.
            if (id) {
                const isConfirm = confirm("Tem certeza que deseja cancelar esse agendamento?")

                //Confirma se o usuário quer cancelar.
                if (isConfirm) {
                    //Faz a requisição na API para cancelar.
                    await scheduleCancel({ id })
                    
                    scheduleDay()
                }
            }
        }

    })
})