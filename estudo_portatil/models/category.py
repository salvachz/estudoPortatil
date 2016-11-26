from __future__ import unicode_literals
from django.db import models
from django.contrib import admin

class Category(models.Model):
    id = models.AutoField(db_column='catId', primary_key=True)
    name = models.CharField(db_column='catName', max_length=255)
    parent = models.ForeignKey('self', db_column='catParentId',blank=True, null=True)

    def __str__(self):
        return "%s - %s" % (self.id, self.name)

    class Meta:
        managed = True
        db_table = 'Category'

admin.site.register(Category)

