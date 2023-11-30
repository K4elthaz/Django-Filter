
## Run Locally

Clone the project

```bash
  git clone https://github.com/K4elthaz/Django-Filter.git
```

Go to the project directory (backend)

```bash
  cd Django-Filter\backend
```

Install dependencies and .env

```bash
  python -m venv venv
```
```bash
  venv/Scripts/Activate.ps1
```
```bash
  pip install -r requirements.txt
  pip install pillow
```
```bash
  python manage.py makemigrations
```
```bash
  python manage.py migrate
```
Create Super user
```bash
  python manage.py createsuperuser
```

Start the server (get the url localhost:(get from the terminal)/admin/)

```bash
  python manage.py runserver
```
###  
## Front End Setup
Go to the project directory (backend)

```bash
  cd Django-Filter\frontend
```
Install dependencies and .env

```bash
  npm install
```
Start the FE (get the url localhost:(get from the terminal)/admin/)

```bash
  npm run dev
```

### For Running the script of import
```bash
python manage.py shell
```
```bash
from script.import_script import import_csv
```
### Path to your CSV file and images directory
```bash
csv_file_path = './django.csv'
image_base_path = './article_thumbnails'

import_csv(csv_file_path, image_base_path)
```



