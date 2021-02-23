import datetime

from django.db.models import Model, CharField, IntegerField, BooleanField
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator 


class Good(Model):
    good_type = CharField(max_length=50)
    img_url = CharField(max_length=100)
    name = CharField(max_length=100)
    description = CharField(max_length=80)
    price = IntegerField()
    is_hot_offer = BooleanField()
    hot_offer_discount = IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=0) 

    def __str__(self):
        return self.name
