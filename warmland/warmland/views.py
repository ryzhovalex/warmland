from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.utils import timezone
from django.urls import reverse
from django.views import generic


def index(request):
    return render(request, 'warmland/index.html')


def market(request):
    return render(request, 'warmland/market.html')


def blog(request):
    return render(request, 'warmland/blog.html')


def about(request):
    return render(request, 'warmland/about.html')

