# Generated by Django 3.1.6 on 2021-04-18 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0007_auto_20210417_2034'),
    ]

    operations = [
        migrations.AddField(
            model_name='serviceprovider',
            name='address',
            field=models.CharField(default='', max_length=150),
        ),
    ]
