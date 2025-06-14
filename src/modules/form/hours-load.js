import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { HoursClick } from "./hours-click.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date }) {
    //Limpa a Lista de horários.
    hours.innerHTML = ""

    const opening = openingHours.map((hour) => {
        //Recupera a hora
        const [ScheduleHour] = hour.split(":")

        //Adiciona a hora na date e verifica se esta no passado.
        const isHourPast = dayjs(date).add(ScheduleHour, "hour").isBefore(dayjs())

        return {
            hour,
            available: !isHourPast,
        }
    })

    //Renderiza os horários.
    opening.forEach(({ hour, available }) => {
        const li = document.createElement("li")

        li.classList.add("hour")
        li.classList.add(available ? "hour-available" : "hour-unavailable")

        li.textContent = hour

        if (hour === "9:00") {
            HourHeaderAdd("Manhã")
        } else if (hour === "13:00") {
            HourHeaderAdd("Tarde")
        } else if (hour === "18:00") {
            HourHeaderAdd("Noite")
        }

        hours.append(li)

    })

    //Adiciona o evneto de click nos horários disponíveis
    HoursClick()
}

function HourHeaderAdd(tittle) {
    const header = document.createElement("li")
    header.classList.add("hour-period")
    header.textContent = tittle

    hours.append(header)
}