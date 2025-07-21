import type { Ref } from "vue";
import type { Check } from "./types";

function formatMoney(number: string) {
    const numberFloat: number = parseFloat(number);
    return numberFloat.toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// LocalStorage related
export const saveToHistory = (check: Check) => {
    const checkList: Check[] = JSON.parse(localStorage.getItem("checkHistory") || "[]");
    checkList.push(check);
    localStorage.setItem("checkHistory", JSON.stringify(checkList));
};

export const loadHistory = (history: Ref<Check[]>) => {
    try {
        history.value = JSON.parse(localStorage.getItem("checkHistory") ?? "[]");
    } catch {
        history.value = [];
    }
};

export const deleteHistoryItem = (history: Check[], index: number) => {
    history.splice(index, 1);
    localStorage.setItem("checkHistory", JSON.stringify(history));
};

export { formatMoney };
