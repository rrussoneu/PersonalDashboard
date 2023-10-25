from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import (CustomUserSerializer, RecurrenceRuleSerializer, ProfileSerializer, EventSerializer,
ToDoSerializer, ContactSerializer)
from .models import (RecurrenceRule, Profile, Event, ToDo, Contact)

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class RecurrenceRuleViewSet(viewsets.ModelViewSet):
    queryset = RecurrenceRule.objects.all()
    serializer_class = RecurrenceRuleSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        queryset = super().get_queryset()
        date = self.request.query_params.get('date')
        owner = self.request.query_params.get('owner')
        dates = self.request.query_params.getlist('dates[]')

        if dates:
            #parsed_dates = [datetime.strptime(date, '%Y-%m%d').date() for date in dates]
            queryset = queryset.filter(date__in=dates)      
        elif date:
            queryset = queryset.filter(date=date)
        if owner:
            queryset = queryset.filter(owner=owner)

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ToDoViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        queryset = super().get_queryset()
        date = self.request.query_params.get('date')
        owner = self.request.query_params.get('owner')

        if date == "":
                    queryset = queryset.filter(date__isnull=True)
        elif date:
            queryset = queryset.filter(date=date)  
        
        if owner:
            queryset = queryset.filter(owner=owner)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self):
        queryset = super().get_queryset()
        owner = self.request.query_params.get('owner')
        
        if owner:
            queryset = queryset.filter(owner=owner)

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)