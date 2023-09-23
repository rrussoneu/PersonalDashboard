from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from datetime import date
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if (not email) or (not password):
            raise ValueError('The Email and Password field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

# A class for a user's profile
class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio  = models.TextField()

    def __str__(self):
        return self.user.email

# A model for types of events
class EventType(models.TextChoices):
    PERSONAL = 'personal', 'Personal'
    LESSON_MEETING = 'lesson_meeting', 'Lesson Meeting'
    OTHER_MEETING = 'other_meeting', 'Other Meeting'
    EXAM = 'exam', 'Exam'
    ASSIGNMENT_DUE = 'assignment_due', 'Assignment Due'
    STUDY_GROUP = 'study_group', 'Study Group Meeting'
    OFFICE_HOURS = 'office_hours', 'Office Hours'

# A model for event recurrences
class RecurrenceRule(models.Model):
    FREQ_CHOICES = [
        ('DAILY', 'Daily'),
        ('WEEKLY', 'Weekly'),
        ('MONTHLY', 'Monthly'),
        ('WEEKDAYS', 'Weekdays'),
        ('WEEKENDS', 'Weekends')
    ]
    freq = models.CharField(choices=FREQ_CHOICES, max_length=20)
    count = models.IntegerField(blank=True, null=True)
    until = models.DateField(blank=True, null=True)
    byweekday = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.freq


# A model for an Event
class Event(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='events')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.DateField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True)
    event_type = models.CharField(max_length=20, choices=EventType.choices)
    is_recurring = models.BooleanField(default=False)
    recurrence_rule = models.ForeignKey(RecurrenceRule, null=True, blank=True, on_delete=models.CASCADE)
    is_invite_only = models.BooleanField(default=False)
    invited_users = models.ManyToManyField(CustomUser, blank=True, related_name='invited_events')
    attending_users = models.ManyToManyField(CustomUser, blank=True, related_name='attending_events')

    def __str__(self):
        return self.title

# A model for items of a to do list
class ToDo(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=255)
    notes = models.TextField(blank=True)
    complete = models.BooleanField(default=True)
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.title

# A model for a user's contacts
class Contact(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='contacts')
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    
    def __str__(self):
            return self.email