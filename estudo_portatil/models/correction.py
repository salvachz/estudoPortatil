from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from . import Wording, UserProfile
from django.utils import timezone

class Correction(models.Model):
    id = models.AutoField(db_column='corId', primary_key=True)
    wording = models.ForeignKey(Wording, db_column='corWorId', blank=False, null=True)
    corrected_by= models.ForeignKey(UserProfile, db_column='corCorrectedBy', blank=False, null=True)
    corrected_at = models.DateTimeField(db_column='corCorrectedAt', default=timezone.now, blank=True)
    score = models.IntegerField(db_column='worScore', blank=False, null=True)

    def __str__(self):
        return "%s - (%s, %s)" % (self.id, self.wording.id, self.corrected_by.id)

    class Meta:
        managed = True
        db_table = 'Correction'

admin.site.register(Correction)
