const searchClient = algoliasearch('OUNZRK7Z4I', 'ed999674ca2bd9a1164601d25e63331e');

const search = instantsearch({
    indexName: 'LCA_Disclosure_Data_FY2024_Q4P1',
    searchClient,
    routing: true
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: '#searchbox',
        placeholder: 'Search here',
        showReset: true,
        showSubmit: false,
        showLoadingIndicator: false
    }),

    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item(hit) {
                return `
                    <article>
                        <h2 class="hit-title">${instantsearch.highlight({ hit, attribute: 'JOB_TITLE' })} (${hit.WORK_LOCATION_CITY}, ${hit.WORK_LOCATION_STATE})</h2>
                        <p class="hit-company">${hit.EMPLOYER_NAME} | Hired: ${hit.CASE_SUBMITTED || 'N/A'} | Contact is ${hit.EMPLOYER_POC_CONTACT_NAME} at ${hit.EMPLOYER_POC_EMAIL}</p>
                        <p class="hit-salary">$${Number(hit.WAGE_RATE_OF_PAY_FROM).toLocaleString()} per year | Visa: ${hit.VISA_CLASS}</p>
                    </article>
                `;
            }
        }
    }),

    instantsearch.widgets.refinementList({
        container: '#visa-type-list',
        attribute: 'VISA_CLASS',
        searchable: true,
        searchablePlaceholder: 'Search visa types...',
        showMore: true,
        limit: 5,
        showMoreLimit: 20
    }),

    instantsearch.widgets.refinementList({
        container: '#state-list',
        attribute: 'WORK_LOCATION_STATE',
        searchable: true,
        searchablePlaceholder: 'Search states...',
        showMore: true,
        limit: 8,
        showMoreLimit: 50
    }),

    instantsearch.widgets.stats({
        container: '#stats',
        templates: {
            text: `
                {{#hasNoResults}}No results{{/hasNoResults}}
                {{#hasOneResult}}1 result{{/hasOneResult}}
                {{#hasManyResults}}{{#helpers.formatNumber}}{{nbHits}}{{/helpers.formatNumber}} results{{/hasManyResults}}
            `
        }
    }),

    instantsearch.widgets.sortBy({
        container: '#sort-by',
        items: [
            { label: 'Most recent', value: 'LCA_Disclosure_Data_FY2024_Q4P1' },
            { label: 'Salary (high to low)', value: 'LCA_Disclosure_Data_FY2024_Q4P1_wage_high_to_low' },
            { label: 'Salary (low to high)', value: 'LCA_Disclosure_Data_FY2024_Q4P1_wage_low_to_high' }
        ]
    }),

    instantsearch.widgets.pagination({
        container: '#pagination',
        padding: 2,
        showFirst: false,
        showLast: false
    })
]);

search.start();
