from __future__ import unicode_literals
from django.db import models
from django.contrib import admin
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.utils import timezone
from django.db.models.signals import post_save


class UserProfileManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=UserProfileManager.normalize_email(email),
            name=name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        u = self.create_user(email,
                        name=name,
                        password=password,
                    )
        u.is_admin = True
        u.save(using=self._db)
        return u


class UserProfile(AbstractBaseUser):
    email = models.EmailField(
                        db_column='uprEmail',
                        verbose_name='email address',
                        max_length=255,
                        unique=True,
                        blank=False,
                        default='',
                    )
    name = models.CharField(db_column='uprName',max_length=90, blank=False, default='')
    date_joined = models.DateTimeField(db_column='uprDataJoined', default=timezone.now,blank=True)
    is_active = models.BooleanField(db_column='uprIsActive', default=True)
    is_admin = models.BooleanField(db_column='uprIsAdmin', default=False)

    login_with = models.CharField(db_column='useLoginWith', max_length=11, blank=True, null=True)
    image = models.ImageField(upload_to='user-img', db_column='uprImgSrc', blank=True, null=True)
    

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        # The user is identified by their email address
        return self.name

    def get_short_name(self):
        # The user is identified by their email address
        return self.name.split()[0]

    def __unicode__(self):
        return self.email

    class Meta:
        managed = True
        db_table = 'UserProfile'

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

admin.site.register(UserProfile)
