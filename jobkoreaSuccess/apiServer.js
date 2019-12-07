
var express = require('express');
var app = express();
const { getJobkoreaSuccess } = require('../DatabaseConnector')

app.get('/success', async function (req, res) {
    var mySpec = req.query
    console.log(mySpec)
    let company_list = await getJobkoreaSuccess()
    for (const company of company_list) {
        let total_score = 0
        for (const spec in company) {
            if (spec == 'company') continue
            const score = company[spec]
            if (!mySpec[spec]) {
                company[spec + '_score'] = 0
                continue
            }
            company[spec + '_score'] = mySpec[spec] / score * 10
            total_score += company[spec + '_score']
        }
        company['total_score'] = total_score
    }
    // console.log(company_list.sort((a, b) =>a.total_score < b.total_score))
    res.send(company_list.sort(function(a, b) { return b.total_score - a.total_score}));
});

app.listen(1102, function () {
    console.log('jobkorea Success API Server listening on port 1102!');
});
