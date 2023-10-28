from django.db import models

# Create your models here.

class Document(models.Model):
    document = models.FileField(upload_to='documents/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return 'Document: ' + str(self.document)
