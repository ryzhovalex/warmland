from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.utils import timezone
from django.urls import reverse
from django.views import generic

from .models import Good


def home(request):
    return render(request, 'warmland/home.html')


def market(request):
    latest_good_list = Good.objects.all()[:20]
    context = { 
    'latest_good_list': latest_good_list,
    } 
    return render(request, 'warmland/market.html', context)


def blog(request):
    return render(request, 'warmland/blog.html')


def about(request):
    return render(request, 'warmland/about.html')

