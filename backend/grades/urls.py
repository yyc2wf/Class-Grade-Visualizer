from django.urls import path
from .views import FileUploadView
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('admin/', admin.site.urls),
    path('api/grades/', include('grades.urls')),
]
