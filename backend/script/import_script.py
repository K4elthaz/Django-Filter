import csv
import os
from django.core.files import File
from django.contrib.auth.models import User
from article.models import Article, Category

def import_csv(csv_file_path, image_base_path):
    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Handling the user
            user = User.objects.get(id=row["user_id"])

            # Handling the thumbnail image
            thumbnail_path = os.path.join(image_base_path, row['thumbnail'])
            thumbnail = None
            if os.path.exists(thumbnail_path):
                thumbnail = File(open(thumbnail_path, 'rb'))

            # Creating the article instance
            article = Article(
                title=row['title'],
                date=row['date'],
                views=row['views'],
                user=user,
                description=row['description'],
                link=row['link'],
                thumbnail=thumbnail
            )
            article.save()

            # Handling categories (create if not exists)
            for category_name in row['categories'].split(','):
                category, _ = Category.objects.get_or_create(name=category_name.strip())
                article.categories.add(category)

# Path to your CSV file and images directory
csv_file_path = './django.csv'
image_base_path = './article_thumbnails'

import_csv(csv_file_path, image_base_path)
