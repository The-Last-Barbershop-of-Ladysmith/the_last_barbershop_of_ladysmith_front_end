import { fetchJson } from "../../utils/api";

/** 
 * Use fetchJon API util to send POST request to API and create a new appointment
 * 
 */
export const createAppointment = async ( appointment ) => (
    await fetchJson('appointments','POST', appointment)
)