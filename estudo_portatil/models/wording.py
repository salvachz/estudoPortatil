from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from . import Category, UserProfile
from django.utils import timezone

class Wording(models.Model):
    id = models.AutoField(db_column='worId', primary_key=True)
    category = models.ForeignKey(Category, db_column='worCatId', blank=False, null=True)
    written_by = models.ForeignKey(UserProfile, db_column='worAskedBy', blank=False, null=True)
    title = models.CharField(db_column='worTitle', max_length=255,blank=False, null=False, default="")
    suport_text = models.URLField(db_column='worSuportText', blank=True, null=True)
    text = models.TextField(db_column='worText', blank=False, null=False)
    written_at = models.DateTimeField(db_column='worAskedDate', default=timezone.now, blank=True)

    def __str__(self):
        return "%s - (%s, %s)" % (self.id, self.category.id, self.written_by.id)

    class Meta:
        managed = True
        db_table = 'Wording'

admin.site.register(Wording)
