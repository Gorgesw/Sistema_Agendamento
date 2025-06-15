import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { HoursClick } from "./hours-click.js"
import { scheduleDay } from "../schedules/load.js"

const hours = document.getElementById("hours")

export function hoursLoad({ date, dailySchedules }) {
    //Limpa a Lista de horários.
    hours.innerHTML = ""

    //Obtem a lista de horários ocupados
    const unavailableHours = dailySchedules.map((schedule) =>
        dayjs(schedule.when).format("HH:mm")
    )

    const opening = openingHours.map((hour) => {
        //Recupera a hora
        const [ScheduleHour] = hour.split(":")

        //Adiciona a hora na date e verifica se esta no passado.
        const isHourPast = dayjs(date).add(ScheduleHour, "hour").isBefore(dayjs())


        const available = !unavailableHours.includes(hour)  && !isHourPast

        return {
            hour,
            available
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