# Generated by Django 4.1.1 on 2022-09-10 06:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='createdAt',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
