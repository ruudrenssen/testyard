const table = {
    caption: 'Number notation by country',
    values: [
        {
            title: 'Large monetary value with decimals',
            type: 'number',
            value: 1264194174.758942
        },
        {
            title: 'Date',
            type: 'Date',
            value: Date.now()
        }
    ],
    cultures: [
        'nl-NL','nl-BE','de-DE','fr-FR','zh-Hans-CN'
    ]
};

module.exports = { table };
