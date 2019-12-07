var express = require('express');
var router = express.Router();

const { getJobkoreaSuccess } = require('../../../DatabaseConnector')

router.get('/spec', function (req, res) {
  res.render('spec')

})

router.get('/success', async function (req, res) {
  var mySpec = req.query
  console.log(mySpec)
  let company_list = await getJobkoreaSuccess()
  for (const company of company_list) {
    let spec_score = 0
    for (const spec in company) {
      if (spec == 'company') continue
      const score = company[spec]
      if (!score) {
        company[spec + '_score'] = 10
      }
      else if (!mySpec[spec]) {
        company[spec + '_score'] = 0
        continue
      }
      else company[spec + '_score'] = mySpec[spec] / score * 10
      spec_score += company[spec + '_score']
    }
    company['spec_score'] = spec_score
  }
  // console.log(company_list.sort((a, b) =>a.total_score < b.total_score))
  company_list = company_list.sort(function (a, b) { return b.spec_score - a.spec_score })
  let result = company_list.map((data) => { return { company: data.company, spec_score: data.spec_score, link: data.titlelink } })
  res.render('result', {result});
});



module.exports = router;
