import { parseISO, format } from "date-fns";

export function formatDate(input, outputFormat = "dd/MM/yyyy") {
    const date = input instanceof Date ? input : parseISO(input);
    return format(date, outputFormat);
}