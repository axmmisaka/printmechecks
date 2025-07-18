import { ref } from "vue";
import { defineStore } from "pinia";
import { type Check } from "@/types";

export const useAppStore = defineStore("useAppStore", () => {
    const check = ref<Check | null>(null);

    return { check };
});
