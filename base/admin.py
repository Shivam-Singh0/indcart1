from django.contrib import admin
from .models import *
from import_export import resources
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class ProductResource(resources.ModelResource):
   class Meta:
      model = Product
class ProductAdmin(ImportExportModelAdmin):
   resource_class = ProductResource

admin.site.register(Product, ProductAdmin)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)

