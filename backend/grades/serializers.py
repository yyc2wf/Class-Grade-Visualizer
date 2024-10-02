from rest_framework import serializers
from .models import GradeFile

class GradeFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradeFile
        fields = ('file', 'uploaded_at')
