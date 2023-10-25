from rest_framework import serializers
from .models import Profile, RecurrenceRule, Event, ToDo, Contact
from django.contrib.auth import get_user_model


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Profile
        fields = ['id', 'bio', 'profile_image', 'user']

class RecurrenceRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurrenceRule
        fields = ['id', 'freq', 'count', 'until', 'byweekday']

class EventSerializer(serializers.ModelSerializer):
    invited_users = serializers.StringRelatedField(many=True) #make this writable
    attending_users = serializers.StringRelatedField(many=True)
    recurrence_rule = RecurrenceRuleSerializer(allow_null=True)

    class Meta:
        model = Event
        fields = ['id', 'owner', 'title', 'description', 'start_time', 'end_time', 'location', 'event_type', 'is_recurring',
                  'recurrence_rule', 'is_invite_only', 'invited_users', 'attending_users', 'date']

class ToDoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ToDo
        fields = ['id', 'owner', 'title', 'notes', 'complete', 'date']

class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = ['id', 'owner', 'email', 'first_name', 'last_name', 'phone']


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()    # use this and not just CustomUser to 
                                    #decouple from the user model, avoid circular imports, and get the auth_user_model setting user
        fields = ('id', 'email', 'first_name', 'last_name', 'date_joined', 'password')
    
    # Delegate creation to the CustomUserManager
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model().objects.create_user(password=password, **validated_data)
        return user