class ApplicationController < ActionController::API

  # user情報をJSONで渡す際に、フォローしたユーザーのidとフォローされたユーザーのidを返せるようにする。
  def user_and_userFollowingsAndFollowers(user)
    {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      image: user.image,
      admin: user.admin,
      password_digest: user.password_digest,
      following_ids: user.followings.ids,
      followers_ids: user.followers.ids,
    }
  end
end
