# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-11-27 01:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudo_portatil', '0004_auto_20161127_0113'),
    ]

    operations = [
        migrations.AddField(
            model_name='wording',
            name='suport_text',
            field=models.URLField(db_column='worSuportText', default=''),
        ),
        migrations.AddField(
            model_name='wording',
            name='title',
            field=models.TextField(db_column='worTitle', default=''),
        ),
    ]
