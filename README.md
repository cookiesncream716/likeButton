# Tixit: likeButton

This is a plugin for [Tixit](https://tixit.me/) that allows users to 'like' a ticket. This could allow team members to vote that a ticket should have a higher priority or that the ticket's contents are particularly well designed, or maybe just simple appreciation. The plugin also can show which users have liked the ticket. This plugin stores a list of user ids that have marked the ticket as 'liked'.

![Example of LikeButton](https://github.com/cookiesncream716/likeButton/blob/master/LikeButton.jpg?raw=true)

To use the likeButton plugin on Tixit, go into the Ticket Settings and choose `Edit Layouts`. Create a layout with likeButton added to it. Next, the plugin schema will need to be configured correctly. LikeButton has a default configuration field `likesField` that is named `likes`. Go back to the Ticket Settings and choose `Edit Shemas`. Click `Add new schema` and then `Add Field`. Give it the following properties:
```
Name - likes
Type - choice
List - true
Editable - true
Choices - Users
```
Now go back to the Ticket Settings and create a new Ticket Type. Use the schema and layout just created with the likeButton.

For more information about Tixit plugins go here: [http://docs.tixit.me/d/Plugin_API](http://docs.tixit.me/d/Plugin_API).

### How to Contribute
How to submit a pull request
1. Fork the repository
2. Clone your forked repo on your machine and run `npm install` at its root
3. Edit
4. Commit and push your changes
5. Submit a pull request: [http://help.github.com/articles/creating-a-pull-request](http://help.github.com/articles/creating-a-pull-request)

### License
Released under the MIT license: [https://opensource.org/license/MIT](https://opensource.org/licenses/MIT)
