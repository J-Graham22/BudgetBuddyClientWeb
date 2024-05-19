import { derived, writable } from "svelte/store";
import type { PeriodBudget } from "../types/periodBudget";
import { building } from "$app/environment";

export const periodBudgets = writable([]); 

export const periodBudgetLabels = derived(periodBudgets, ($periodBudgets) => {
    if($periodBudgets.budgets) {
        return $periodBudgets.budgets.map(budget => budget.name);
    }
    return [];
})

export async function getPeriodBudgets(): Promise<PeriodBudget[]> {
    const headers: Headers = new Headers();

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const request: RequestInfo = new Request('http://localhost:8080/budgets', {
        method: 'GET',
        headers: headers
    });

    return fetch(request)
        .then(res => res.json())
        .then(res => {
            return res as PeriodBudget[]
        });
}