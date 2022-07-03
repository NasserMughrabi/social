from sys import prefix
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    followers_num = models.IntegerField(default=0, blank=True)
    following_num = models.IntegerField(default=0, blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "followers_num": self.followers_num,
            "following_num": self.following_num
        }

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "liked", null=False)
    liked_post_id = models.IntegerField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'liked_post_id')

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "liked_post_id": self.liked_post_id
        }


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "post", null=False)
    content = models.TextField()
    date_posted = models.DateTimeField(auto_now_add=True)
    likes_num = models.IntegerField(default=0, blank=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "content": self.content,
            "date_posted": self.date_posted.strftime("%b %d %Y, %I:%M %p"),
            "likes_num": self.likes_num,
        }

class Following(models.Model):
    follower_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "follows", null=False)
    following_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "followed", null=False)

    class Meta:
        unique_together = ('follower_user', 'following_user')
    
    def serialize(self):
        return {
            "id": self.id,
            "follower_user": self.follower_user.username,
            "following_username": self.following_user.username
        }
