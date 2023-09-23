from .views import CustomUserViewSet, ProfileViewSet, RecurrenceRuleViewSet, EventViewSet, ToDoViewSet, ContactViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('users', CustomUserViewSet, basename='user')
router.register('profiles', ProfileViewSet, basename='profile')
router.register('recurrence-rules', RecurrenceRuleViewSet, basename='recurrencerule')
router.register('events', EventViewSet, basename='event')
router.register('todos', ToDoViewSet, basename='todo')
router.register('contacts', ContactViewSet, basename='contact')

urlpatterns = [
    path('PersonalDashApp/', include(router.urls)),
]