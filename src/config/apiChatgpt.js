const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(configuration);

module.exports = openai;

