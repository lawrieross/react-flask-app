import datetime
# import timeago
import requests
import os
from flask import Flask

app = Flask(__name__, static_folder='../build', static_url_path='/')

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.route('/jobs')
def get_latest_jobs():
	response = requests.get(f'https://api.adzuna.com/v1/api/jobs/au/search/1?app_id={os.environ["APP_ID"]}&app_key={os.environ["APP_KEY"]}&results_per_page=20&sort_by=date')
	return get_job_data(response.json())

def get_job_data(resp):
	results = resp['results']
	return job_data(results)

def job_data(results):
	job_ads = []
	for result in results:
		created = datetime.datetime.strptime(result['created'], '%Y-%m-%dT%H:%M:%SZ')
		job_ads.append({
			'company': get_company_name(result['company']),
			'contract_time': get_contract_time(result.get('contract_time')),
			'created': created.strftime('%a %d %b %Y'),
			'icon': get_icon(result['category']['tag']),
			'id': result['id'],
			'is_new': is_new(created),
			'label': get_job_label(result['category']),
			'location': result['location']['area'][-1],
			'redirect_url': result['redirect_url'],
			'title': result['title']
		})
	return {'results': job_ads}

def get_company_name(company):
	try:
		return company['display_name']
	except:
		return 'Unknown'

def get_job_label(category):
	if (category['label']):
		return category['label']
	else:
		return category['tag']

def is_new(date):
	if (get_days_in_between(date) < 1):
		return True
	else:
		return False

def get_days_in_between(date):
	delta = datetime.datetime.now() - date
	return delta.days

def get_contract_time(contract):
	try:
		contract = contract.replace('_', ' ').title()
		return contract
	except:
		return ''

def get_icon(tag):
	try:
		return tag
	except:
		return 'logo'
