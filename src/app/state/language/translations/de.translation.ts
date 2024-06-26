export const de = {
    site: {
        title: 'Mit Wikipedia Lernen',
        tried_words: 'Erraten',
        input: {
            article: 'Artikle...',
            guess: 'Deine Vermutung'
        },
        reader: {
            reset: 'reset',
            footer: {
                words: 'Words',
                guesses: 'Guesses'
            },
            rightDrawer: {
                guesses: 'Guesses'
            },
            leftDrawer: {
                inputLabel: 'Article...' 
            }
        },
        tooltips: {
            right_sidebar_tooltip: 'Toggle Right Sidebar',
            left_sidebar_tooltip: 'Toggle Left Sidebar',
        }
    },
    tutorial: [
        {
            title: 'Welcome to Wiki Learning by BWN',
            intro: 'Allow me to introduce you to Wiki Learning from Bleau Web Network. A language learning tool for practicing vocabulary and discovering words! The aim of the game is to guess all the words needed to unmask the entire article.'
        },
        {
            element: '[data-intro-id="language-selector"]',
            title: 'Choose your language',
            intro: 'We support multiple languages. You are welcome to switch between and use as many of them as you wish. Your progress is saved as you go.'
        },
        {
            element: '[data-intro-id="left-drawer"]',
            title: 'Add and select different articles',
            intro: 'The text box at the top allows you to add articles to your select language\'s list. Progress on articles is saved locally, so feel free to switch between them freely.'
        },
        {
            element: '[data-intro-id="guess-input"]',
            title: 'Input your guesses',
            intro: 'Type your guesses into this box. Upon pressing enter your guess will be checked with all the words in the article and added to your guess list.'
        },
        {
            element: '[data-intro-id="right-drawer"]',
            title: 'Past guesses',
            intro: 'You can track what you have entered into the text box here.'
        },
        {
            element: '[data-intro-id="lesson-card"]',
            title: 'Your current article',
            intro: 'Here is your active article. For each word you guess correctly they will appear before your eyes here. If you guesses are close enough the colors will change to provide hints to what is underneath.'
        },
        {
            element: '[data-intro-id="buy-me-a-coffee"]',
            title: 'Please consider donating',
            intro: 'Sometime in the future, if you are able to and have gotten some good use out of this app, please consider donating. This will help me bring more educational resources to people for free. <br /><br /><a href="https://www.buymeacoffee.com/bmbleau">Buy me a Radler</a>'
        }
    ],
}