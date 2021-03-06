Feature: Post management
  @user1 @web
  Scenario: Creates post with published state
    Given I am a signed user in "<GHOST_URL>" with "<USER>" and "<PASSWORD>"
    When I navigate to "Posts" page
    When I click on new "Post" button
    When I fill editor title with "$name_1"
    When I publish "now"
    Then I should see "$$name_1" post in "<GHOST_URL>"
