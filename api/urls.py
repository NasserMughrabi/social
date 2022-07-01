from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # other fetches
    path("allposts", views.allposts, name="allposts"),
    path("followingsposts", views.followingsposts, name="followingsposts"),
    path("profile", views.profile, name="profile"),
    path("profileposts", views.profileposts, name="profileposts"),
    path("new_post", views.new_post, name="new_post"),
    path("follow", views.follow, name="follow"),
    path("add_following", views.add_following, name="add_following"),
    path("remove_following", views.remove_following, name="remove_following"),
    path("like", views.like, name="like"),
    path("add_like", views.add_like, name="add_like"),
    path("remove_like", views.remove_like, name="remove_like"),

]