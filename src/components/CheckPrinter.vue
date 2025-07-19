<template>
    <div id="wrapper" class="wrapper" style="position: relative">
        <div id="check-box" class="check-box">
            <div class="info-block" style="position: absolute; top: 40px; left: 60px">
                <div class="account-holder-info">
                    <div class="account-holder-name">{{ check.accountHolderName }}</div>
                    <div class="account-holder-address">
                        {{ check.accountHolderAddress }}<br />
                        {{ check.accountHolderCity }}, {{ check.accountHolderState }} {{ check.accountHolderZip }}<br />
                        {{ check.accountHolderPhoneNumber ?? "" }}
                    </div>
                </div>
            </div>

            <div class="date-block" style="position: absolute; top: 90px; left: 700px">
                <span class="date-label">Date: </span>
                <span class="date-data">{{ check.date }}</span>
            </div>

            <div class="payment-block" style="position: absolute; top: 170px; left: 60px">
                <div class="pay-to">Pay</div>
                <div class="amount-line">
                    <span class="amount-text">*** {{ toWords(check.amount) }} ***</span>
                    <span class="dollar-line"></span>
                </div>

                <div class="the-order-of">To the<br />order of</div>
                <span class="payto-line">
                    <div class="pay-to-data">{{ check.payTo }}</div>
                </span>

                <div class="amount-box-container">
                    <div class="amount-box" />
                    <div class="amount-data">{{ formatMoney(check.amount) }}</div>
                </div>
            </div>

            <div class="check-number-human" style="position: absolute; top: 40px; left: 1060px">
                {{ check.checkNumber }}
            </div>
            <div class="bank-name" style="position: absolute; top: 300px; left: 60px">
                {{ check.bankName }}
            </div>
            <div class="memo-data" style="position: absolute; top: 340px; left: 60px">
                <span v-if="check.memo" style="font-weight: bolder">Memo: </span>{{ check.memo }}
            </div>
            <div class="signature-block" style="position: absolute; top: 366px; left: 850px">
                <div class="signature-data">{{ check.signature }}</div>
                <div class="signature">_________________________________________________</div>
            </div>
            <div class="banking" style="position: absolute; top: 420px; left: 80px">
                <div class="routing">a{{ check.routingNumber }}a</div>
                <div class="bank-account">{{ check.bankAccountNumber }}c</div>
                <div class="check-number">{{ check.checkNumber }}</div>
            </div>
        </div>
        <div class="check-data" style="position: absolute; top: 450px">
            <div class="alert alert-primary" role="alert">
                <strong>Background does not print.</strong>
            </div>
            <button type="button" style="float: right" class="btn btn-primary" @click="printCheck">
                Print (Ctrl + P)
            </button>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="acctHolderName" class="form-label">Account Holder Name</label>
                    <input id="acctHolderName" v-model="check.accountHolderName" type="text" class="form-control" />
                </div>
                <div class="col-md-4">
                    <label for="acctHolderPhone" class="form-label">Phone Number</label>
                    <input
                        id="acctHolderPhone"
                        v-model="check.accountHolderPhoneNumber"
                        type="text"
                        class="form-control"
                    />
                </div>
                <div class="col-md-4">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input id="inputAddress" v-model="check.accountHolderAddress" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputCity" class="form-label">City</label>
                    <input v-model="check.accountHolderCity" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputState" class="form-label">State</label>
                    <input v-model="check.accountHolderState" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputZip" class="form-label">Zip</label>
                    <input v-model="check.accountHolderZip" type="text" class="form-control" />
                </div>
            </form>
            <form class="row g-3" style="margin-top: 30px; border-top: 1px solid #e7e7e7">
                <div class="col-md-2">
                    <label for="inputCheckNum" class="form-label">Check Number</label>
                    <input id="inputCheckNum" v-model="check.checkNumber" type="text" class="form-control" />
                </div>
                <div class="col-md-4">
                    <label for="inputBankName" class="form-label">Bank Name</label>
                    <input id="inputBankName" v-model="check.bankName" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputRouting" class="form-label">Routing #</label>
                    <input id="inputRouting" v-model="check.routingNumber" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputAcctNo" class="form-label">Account #</label>
                    <input id="inputAcctNo" v-model="check.bankAccountNumber" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="inputMemo" class="form-label">Memo</label>
                    <textarea id="inputMemo" v-model="check.memo" spellcheck="true" class="form-control" />
                </div>
            </form>
            <form class="row g-3" style="margin-top: 30px; border-top: 1px solid #e7e7e7">
                <div class="col-md-2">
                    <label for="inputCheckAmount" class="form-label">Amount</label>
                    <input id="inputCheckAmount" v-model="check.amount" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="inputPayto" class="form-label">Pay To</label>
                    <input id="inputPayto" v-model="check.payTo" type="text" class="form-control" />
                </div>
                <div class="col-md-2">
                    <label for="inputDate" class="form-label">Date</label>
                    <input id="inputDate" v-model="check.date" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="inputSignature" class="form-label">Signature</label>
                    <input id="inputSignature" v-model="check.signature" type="text" class="form-control" />
                </div>
            </form>
            <div class="col-12" style="margin-top: 30px">
                <button type="button" class="btn btn-primary" @click="saveToHistory">Save to History</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ToWords } from "to-words";
import { reactive, onMounted, onUnmounted } from "vue";
import { formatMoney } from "@/utilities.ts";
import { useAppStore } from "../stores/app.ts";
import { type Check } from "@/types.ts";

const state = useAppStore();

const toWordsTool = new ToWords({
    localeCode: "en-US",
    converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: true,
    },
});

const toWords: (denom: number | string) => string = (denom) => {
    try {
        return toWordsTool.convert(Number(denom));
    } catch (e) {
        return `${e}`;
    }
};

const printCheck = () => {
    window.print();
};

const saveToHistory = () => {
    let checkList = JSON.parse(localStorage.getItem("checkList") || "[]");
    checkList.push(check);
    localStorage.setItem("checkList", JSON.stringify(checkList));
};

const genNewCheck = () => {
    const checkList = JSON.parse(localStorage.getItem("checkList") ?? "[]");
    const recentCheck = checkList[checkList.length - 1];
    const newCheck: Check = {
        accountHolderName: recentCheck?.accountHolderName ?? "John Smith",
        accountHolderAddress: recentCheck?.accountHolderAddress ?? "123 Cherry Tree Lane",
        accountHolderCity: recentCheck?.accountHolderCity ?? "New York",
        accountHolderState: recentCheck?.accountHolderState ?? "NY",
        accountHolderZip: recentCheck?.accountHolderZip ?? "10001",
        accountHolderPhoneNumber: recentCheck?.accountHolderPhoneNumber ?? "",
        bankName: recentCheck?.bankName ?? "Bank Name, INC",
        routingNumber: recentCheck?.routingNumber ?? "022303659",
        bankAccountNumber: recentCheck?.bankAccountNumber ?? "000000000000",
        signature: recentCheck?.signature ?? "John Smith",
        checkNumber: recentCheck?.checkNumber ? `${parseInt(recentCheck?.checkNumber) + 1}` : "100",
        date: new Date().toLocaleDateString(),
        amount: "0.00",
        payTo: "",
        memo: "",
    };

    return newCheck;
};

const check: Check = reactive(genNewCheck());

const handlePrintShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "p") {
        event.preventDefault();
        printCheck();
    }
};

onMounted(() => {
    if (state.check) {
        check.accountHolderName = state.check.accountHolderName;
        check.accountHolderAddress = state.check.accountHolderAddress;
        check.accountHolderCity = state.check.accountHolderCity;
        check.accountHolderState = state.check.accountHolderState;
        check.accountHolderZip = state.check.accountHolderZip;
        check.accountHolderPhoneNumber = state.check.accountHolderPhoneNumber;
        check.checkNumber = state.check.checkNumber;
        check.date = state.check.date;
        check.bankName = state.check.bankName;
        check.amount = state.check.amount;
        check.payTo = state.check.payTo;
        check.memo = state.check.memo;
        check.signature = state.check.signature;
        check.routingNumber = state.check.routingNumber;
        check.bankAccountNumber = state.check.bankAccountNumber;
    }
    state.check = null;

    window.addEventListener("keydown", handlePrintShortcut);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handlePrintShortcut);
});
</script>

<style>
label {
    font-weight: bold;
}
.memo-data {
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 750px;
}
.signature-data {
    font-weight: bold;
}
.bank-name,
.account-holder-name,
.check-number-human,
.date-data,
.pay-to-data,
.amount-data {
    font-size: 20px;
    font-weight: bold;
}
.check-data {
    margin-top: 50px;
    padding: 50px 120px;
    border-top: 1px solid #e6e6e6;
}

.check-box {
    width: 1200px;
    height: 494px;
    margin: 0 auto;
    background-color: #e5e5f7;
    background:
        linear-gradient(135deg, #e9eaff55 25%, transparent 25%) -10px 0/ 20px 20px,
        linear-gradient(225deg, #e9eaff 25%, transparent 25%) -10px 0/ 20px 20px,
        linear-gradient(315deg, #e9eaff55 25%, transparent 25%) 0px 0/ 20px 20px,
        linear-gradient(45deg, #e9eaff 25%, #fdfdff 25%) 0px 0/ 20px 20px;
}

@font-face {
    font-family: "banking";
    src: url("../assets/micrenc.ttf");
}

.banking {
    font-family: "banking";
    font-size: 37px;
}
.dollar-line {
    width: 840px;
    display: block;
    border-bottom: 1px solid black;
}
.payto-line {
    width: auto;
    border-bottom: 1px solid black;
}

.info-block {
    display: flex;
    flex-direction: column;
    gap: 60px;
}
.account-holder-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.date-block {
    position: relative;
    min-width: 10em;
}

.payment-block {
    display: grid;
    width: 1100px;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    row-gap: 20px;
    align-items: start;
    grid-template-areas:
        "pay-label amount-text amount-box"
        "order-label payto-line .";
}

.pay-to {
    grid-column: 1;
    grid-row: 1;
    position: relative;
    margin-top: auto;
}
.the-order-of {
    grid-column: 1;
    grid-row: 2;
    position: relative;
    min-width: 5em;
}
.payto-line {
    grid-column: 2;
    grid-row: 2;
    position: relative;
    margin-top: auto;
}

.amount-box-container {
    grid-column: 3;
    grid-row: 1;
    position: relative;
    width: 225px;
    height: 100%;
    max-height: 40px;
    align-self: flex-end;
}
.amount-box {
    width: 225px;
    height: auto;
    background-color: white;
    width: 100%;
    height: 100%;
    border: 1px solid #c7c7c7;
}
.amount-box::before {
    content: "$";
    position: absolute;
    left: 0.25em;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    font-weight: bold;
    line-height: 1;
}
.amount-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
}
.amount-text {
    position: relative;
    overflow: hidden;
}
.amount-line {
    max-width: 840px;
    max-height: 45px;
    min-height: 45px;
    grid-column: 2;
    grid-row: 1;
    align-content: flex-end;
}

.signature-block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.signature-data {
    margin-bottom: -15px;
    z-index: 1;
}
.banking {
    display: flex;
    gap: 20px;
    font-family: "banking";
    font-size: 37px;
}
</style>
