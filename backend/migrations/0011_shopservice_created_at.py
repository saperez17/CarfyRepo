# Generated by Django 3.1.6 on 2021-04-23 15:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_shopservice_long_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='shopservice',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
