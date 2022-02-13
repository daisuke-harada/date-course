require "test_helper"

class Api::V1::TestControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_test_index_url
    assert_response :success
  end
end
