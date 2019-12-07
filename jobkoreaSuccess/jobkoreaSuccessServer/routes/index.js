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
    var company_pass = ''
    if (spec_score < 60) {
      company_pass = '상향'
      pass_color = 'danger'
    }
    else if (spec_score < 80) {
      company_pass = '도전'
      pass_color = 'warning'
    }
    else if (spec_score < 100) {
      company_pass = '소신'
      pass_color = 'info'
    }
    else if (spec_score < 120) {
      company_pass = '안정'
      pass_color = 'success'
    }
    else {
      company_pass = '하향'
      pass_color = 'secondary'
    }
    company['company_pass'] = company_pass
    company['pass_color'] = pass_color
  }
  // console.log(company_list.sort((a, b) =>a.total_score < b.total_score))
  company_list = company_list.sort(function (a, b) { return b.spec_score - a.spec_score })
  let result = company_list.map((data) => { return { company: data.company, spec_score: data.spec_score, link: data.titlelink, company_pass: data.company_pass, pass_color: data.pass_color } })
  res.render('result', { result });
});

module.exports = router;
