<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getPeriodBudgets, periodBudgets, periodBudgetLabels, addPeriodBudget } from '../controllers/periodBudgetController';
	import { PeriodBudget } from '../types/periodBudget';
	import { error } from '@sveltejs/kit';

	async function setBudgetLabels() {
		try {
			const response = await getPeriodBudgets();
			periodBudgets.set(response);
		} catch (error) {
			console.error('Fetch error:', error);
			return [];
		}
	}	

	onMount(async() => {
		await setBudgetLabels();
	})

	let showAddBudgetDialog = false;

	let newPeriodBudget: PeriodBudget = new PeriodBudget();

	async function addNewBudget() {
		console.log(await addPeriodBudget(newPeriodBudget));

		showAddBudgetDialog = false;

		await setBudgetLabels();
	}
</script>

<div class="counter">
	<div>
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
	<button on:click={() => {showAddBudgetDialog = true;}}>Add New Budget</button>
	{#if showAddBudgetDialog}
		<input bind:value={newPeriodBudget.Name}  placeholder="Budget Name"/>
		<input bind:value={newPeriodBudget.StartDate} type="date"/>
		<input bind:value={newPeriodBudget.EndDate} type="date"/>
		<button on:click={addNewBudget}>Submit</button>
	{/if}
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
