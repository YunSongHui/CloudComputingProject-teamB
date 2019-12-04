from robobrowser import RoboBrowser

browser = RoboBrowser(parser='html.parser')

browser.open('https://www.google.co.kr/')

form = browser.get_form(action='/search')
form['q'] = '취준생 시사상식 2019'
browser.submit_form(form, list(form.submit_fields.values())[0])

for a in browser.select('#rso div.r > a'):
    print(a.text)
    print(a.get('href'))
    print()
