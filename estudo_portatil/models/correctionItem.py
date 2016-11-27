from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from . import Correction
from django.utils import timezone

class CorrectionItem(models.Model):
    correction = models.ForeignKey(Correction, db_column='citCorId', blank=False, null=True)
    number = models.IntegerField(db_column='citId', blank=False, null=True)
    item_text = models.TextField(db_column='citText', blank=False, null=False)

    def __str__(self):
        return "(%s, %s)" % (self.number, self.item_text)

    class Meta:
        managed = True
        db_table = 'CorrectionItem'

admin.site.register(CorrectionItem)
