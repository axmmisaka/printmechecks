<template>
    <div class="about">
        <h1>History</h1>
        <div v-if="history.length === 0">
            <p>No history yet</p>
        </div>
        <div v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Check #</th>
                        <th>Date</th>
                        <th>Bank</th>
                        <th>Routing #</th>
                        <th>Account #</th>
                        <th>Payer & Address</th>
                        <th>Payee & Info</th>
                        <th>Amount</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in history" :key="index">
                        <td>{{ item.checkNumber }}</td>
                        <td>{{ item.date }}</td>
                        <td>{{ item.bankName }}</td>
                        <td>{{ item.routingNumber }}</td>
                        <td>{{ item.bankAccountNumber }}</td>
                        <td>
                            {{ item.accountHolderName }}, {{ item.accountHolderAddress }} {{ item.accountHolderCity }}
                            {{ item.accountHolderState }} {{ item.accountHolderZip }}
                        </td>
                        <td>{{ item.payTo }} {{ item.additionalPayToInfo }}</td>
                        <td>${{ formatMoney(item.amount) }}</td>
                        <td>
                            <button
                                class="btn btn-outline-danger"
                                style="margin-right: 10px"
                                @click="deleteHistoryItem(history, index)"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Check } from "@/types.ts";
import { deleteHistoryItem, formatMoney, loadHistory } from "../utilities.ts";
import { ref, onMounted, type Ref } from "vue";

const history: Ref<Check[]> = ref([]);

onMounted(() => {
    loadHistory(history);
});
</script>

<style></style>
