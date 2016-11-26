from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from . import Category, UserProfile
from django.utils import timezone

class Ask(models.Model):
    id = models.AutoField(db_column='askId', primary_key=True)
    category = models.ForeignKey(Category, db_column='askCatId', blank=False, null=True)
    asked_by = models.ForeignKey(UserProfile, db_column='askAskedBy', blank=False, null=True)
    text = models. TextField(db_column='askText', blank=False, null=False)
    asked_at = models.DateTimeField(db_column='askAskedDate', default=timezone.now, blank=True)

    def __str__(self):
        return "%s - (%s, %s)" % (self.id, self.category.id, self.asked_by.id)

    class Meta:
        managed = True
        db_table = 'Ask'

admin.site.register(Ask)
