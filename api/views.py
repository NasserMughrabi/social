import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import *
from django.views.decorators.csrf import csrf_exempt



# Create your views here.

# ---------------------------------------------------------------
def index(request):
    return JsonResponse('request', safe=False)

# ---------------------------------------------------------------
def allposts(request):

    if request.method == "POST":
        return JsonResponse("request can not be POST")

    posts = Post.objects.all()
    posts = posts.order_by("-date_posted").all()

    return JsonResponse([post.serialize() for post in posts], safe=False)

# ---------------------------------------------------------------
@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("password", "")
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse('success', safe=False)
        else:
            return JsonResponse('fail', safe=False)

    else:
        return JsonResponse('incorrect', safe=False)
    

# ---------------------------------------------------------------
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# ---------------------------------------------------------------
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password, followers_num=0, following_num=0)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")
