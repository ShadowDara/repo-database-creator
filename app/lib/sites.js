// app/lib/sites.js

// Every Site on this website is listed here!

export const sites = [
    {
        name: 'Home',
        url: '/',
        description: 'Home page of the website.',
    },

    // SVG
    {
        name: 'Age Medal',
        url: '/api/svg/age_medal',
        description: 'a Page to show the SVG of the medal.',
    },
    {
        name: 'Gist Count',
        url: '/api/svg/gist_count',
        description: ''
    },
    {
        name: 'Repository Count',
        url: '/api/svg/repo_count',
        description: ''
    },

    // RAW
    {
        name: 'Contribution List',
        url: '/api/raw/contribution_list',
        description: ''
    },
    {
        name: 'Repository Count',
        url: '/api/raw/repo_count',
        description: ''
    },
    {
        name: 'Repository Data List',
        url: '/api/raw/',
        description: ''
    },


    // HTML
    {
        name: 'HTML',
        url: '/api/html',
        description: 'a Page to show the Repository List of a User as HTML.',
    },


    // DEBUG PAGES
    {
        name: 'Show Themes',
        url: '/api/lib/show_themes',
        description: 'a Page to show all the available themes as JSON.',
    },
    {
        name: 'Test Themes',
        url: '/api/svg/test_themes',
        description: 'page to test new themes with a SVG without using the an API'
    }
]
