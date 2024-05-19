<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getPeriodBudgets, periodBudgets, periodBudgetLabels } from '../controllers/periodBudgetController';
	import type { PeriodBudget } from '../types/periodBudget';
	import { error } from '@sveltejs/kit';

    //let budgetsPromise: Promise<PeriodBudget[]> = getPeriodBudgets();

	onMount(async () => {
		const headers: Headers = new Headers();

		headers.set('Content-Type', 'application/json');
		headers.set('Accept', 'application/json');

		const request: RequestInfo = new Request('http://localhost:8080/budgets', {
			//method: 'GET',
			//mode: 'cors',
			headers: headers
		});

		try {
			const response = await fetch(request);
			
			// Check if the response is okay
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log({ data });
			periodBudgets.set(data);
		} catch (error) {
			console.error('Fetch error:', error);
			return [];
		}

		// return fetch(request)
		// .then(response => response.json())
		// .then(data => {
		// 	console.log({data});
		// }).catch(error => {
		// 	console.log({error});
		// 	return [];
		// });
	});
</script>

<div class="counter">
        {#each $periodBudgetLabels as name }
            <nav>
                <ul>
                    <li aria-current={$page.url.pathname === '/{name}' ? 'page' : undefined}>
                        <a href="/">{name}</a>
                    </li>
                </ul>
            </nav>       
        {/each}
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #444;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
