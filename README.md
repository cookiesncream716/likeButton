# Tixit: likeButton
This is a plugin for [Tixit](https://tixit.me/) that allows users to like tickets. This information could be used to give certian tickets a higher priority to complete. In addition to being able to like a ticket, the user can see how many and which users have liked a ticket. The plugin has a configuration option used to store a list of user id's who have liked the ticket.

To use the likeButton plugin on Tixit, go into the Ticket Settings and choose `Edit Layouts`. Create a layout with likeButton added. Next, the plugin will need to be configured correctly. Go back to the Ticket Settings and choose `Edit Shemas`. Click `Add new schema` and then `Add Field`. Give it the following properties: Name - likes, Type - choice, List - true, Editable - true, and Choices - Users. Now go back to the Ticket Settings and create a new Ticket Type. Use the schema and layout just created with the likeButton.

For more information about Tixit plugins go here: [http://docs.tixit.me/d/Plugin_API](http://docs.tixit.me/d/Plugin_API).

### How to Contribute
How to submit a pull request
1. Fork the repository
2. Clone your forked repo on your machine and run `npm install` at its root
3. Edit
4. Commit and push your changes
5. Submit a pull request: [http://help.github.com/articles/creating-a-pull-request](http://help.github.com/articles/creating-a-pull-request)

### License
Released under the MIT license: [http://opensource.org/license/MIT](http://opensource.org/license/MIT)