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
def followingsposts(request):
    if request.method == "POST":
        return JsonResponse("request can not be POST")

    followings = Following.objects.filter(follower_user=request.user)
    posts = []
    for following in followings :
        # get posts by the user followed by the logged-in user(request.user)
        print(following.following_user)
        user_posts = Post.objects.filter(user=following.following_user)

        if user_posts.count() > 0:
            posts.extend(user_posts)
    return JsonResponse([post.serialize() for post in posts], safe=False)

@csrf_exempt
def follow(request):
    data = json.loads(request.body)
    username = data.get("username", "")
    user = User.objects.get(username=username)
    following = Following.objects.get(follower_user=request.user, following_user=user)
    if(following):
        result = True
    else :
        result = False
    return JsonResponse(result, safe=False)

@csrf_exempt
def like(request):
    all_liked = Like.objects.all()
    return JsonResponse([like.serialize() for like in all_liked], safe=False)

@csrf_exempt
def add_like(request):
    data = json.loads(request.body)
    post_id = data.get("post_id", "")
    liked = Like(user=request.user, liked_post_id=post_id)
    liked.save()

    post = Post.objects.get(id=post_id)
    post.likes_num = post.likes_num + 1
    post.save()
    
    return JsonResponse('success', safe=False)

@csrf_exempt
def remove_like(request):
    data = json.loads(request.body)
    post_id = data.get("post_id", "")
    liked = Like.objects.get(user=request.user, liked_post_id=post_id)
    liked.delete()

    post = Post.objects.get(id=post_id)
    post.likes_num = post.likes_num - 1
    post.save()
    
    return JsonResponse('success', safe=False)

@csrf_exempt
def add_following(request):
    data = json.loads(request.body)
    username = data.get("username", "")

    user = User.objects.get(username=username)
    requestUser = User.objects.get(username=request.user.username)
    user.followers_num = user.followers_num + 1
    requestUser.following_num = request.user.following_num + 1
    user.save()
    requestUser.save()
    
    follow = Following(follower_user=request.user, following_user=user)
    follow.save()
    
    return JsonResponse('success', safe=False)

@csrf_exempt
def remove_following(request):
    data = json.loads(request.body)
    username = data.get("username", "")
    
    user = User.objects.get(username=username)
    requestUser = User.objects.get(username=request.user.username)
    user.followers_num = user.followers_num - 1
    requestUser.following_num = request.user.following_num - 1
    user.save()
    requestUser.save()

    following = Following.objects.get(follower_user=request.user, following_user=user)
    following.delete()

    return JsonResponse('success', safe=False)


# ---------------------------------------------------------------
@csrf_exempt
def new_post(request):
    if request.method != "POST":
        return JsonResponse("error: POST request required.", safe=False)

    # get JSON data sent with the request
    data = json.loads(request.body)
    content = data.get("content", "")


    if not content:
        return JsonResponse("error: Post content can not be empty.",  safe=False)

    post = Post(user=request.user, content=content, likes_num=0)
    print(post)
    post.save()

    return JsonResponse("success",  safe=False)

# ---------------------------------------------------------------
@csrf_exempt
def profile(request) :
    data = json.loads(request.body)
    username = data.get("username", "")
    profile = User.objects.get(username=username)
    return JsonResponse(profile.serialize(), safe=False)

# ---------------------------------------------------------------
@csrf_exempt
def profileposts(request) :
    data = json.loads(request.body)
    username = data.get("username", "")
    profile = User.objects.get(username=username)
    profile_posts = Post.objects.filter(user=profile)
    return JsonResponse([post.serialize() for post in profile_posts], safe=False)

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
@csrf_exempt
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# ---------------------------------------------------------------
@csrf_exempt
def register(request):
    if request.method == "POST":
        # Attempt to sign user in
        data = json.loads(request.body)
        username = data.get("username", "")
        password = data.get("password", "")
        email = data.get("email", "")

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password, followers_num=0, following_num=0)
            user.save()
        except IntegrityError:
            return JsonResponse("fail", safe=False)
        login(request, user)
        return JsonResponse("success", safe=False)
    else:
        return JsonResponse('incorrect', safe=False)
