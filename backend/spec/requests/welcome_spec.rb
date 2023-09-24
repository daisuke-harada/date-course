require "rails_helper"

RSpec.describe "Welcomes", type: :request do
  describe "GET /index" do
    it "welcomeメッセージを表示する" do
      get "/"
      expect(JSON.parse(response.body)["message"]).to eq("hello")
    end
  end
end
