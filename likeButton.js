var dropDown = require ('./dropDown')

registerPlugin(proto(Gem, function(){
	this.name = 'LikeButton'

	this.initialize = function(options){
		return{
			likesField: 'likes'
		}
	}

	this.requireFields = function(options){
		var result = {}
		result[options.likesField] = {
			type: 'choice',
			list: true,
			choices: 'Users'
		}
		return result
	}

	this.build = function(ticket, optionsObservee, api){
		var that = this
		this.api = api
		this.ticket = ticket
		this.likesField = optionsObservee.subject.likesField
		console.log('likesField ', ticket.get(this.likesField))
		var likeButton = Image(require('url-loader!./star.png'))
		var numOfLikes = Text(ticket.get(this.likesField).subject.length)
		this.whoLiked = Text('')
		var like = Block(likeButton, drop = dropDown(numOfLikes, this.whoLiked))
		this.add(like)

		if(ticket.get(this.likesField).subject.length > 0){
			// Get current user and see if already in likesField
			api.User.current().then(function(user){
				console.log('user ', user)
				var list = 	ticket.get(that.likesField).subject
				list.forEach(function(name){
					if(user.subject._id === name){
						likeButton.src = require('url-loader!./star1.png')
					}
				})
			}).then(function(){
				// Get list of names
				return that.displayAllLikers()
			}).done()
		}

		likeButton.on('click', function(){
			api.User.current().then(function(curUser){
				var curUserIndex = ticket.get(that.likesField).subject.indexOf(curUser.subject._id)
				if(curUserIndex === -1){
					 // user isn't in list so add
					 ticket.get(that.likesField).push(curUser.subject._id)
					 likeButton.src = require('url-loader!./star1.png')
				} else{
					// user is in list so remove
					ticket.get(that.likesField).splice(curUserIndex, 1)
					likeButton.src = require('url-loader!./star.png')
					numOfLikes.text = ticket.get(that.likesField).subject.length
					// not sure if needed if more than 1 liker
					that.displayAllLikers()
				}
			}).done()
		})

		ticket.get(this.likesField).on('change', function(){
			that.displayAllLikers()
			numOfLikes.text = ticket.get(that.likesField).subject.length
		})

		// view likers
		numOfLikes.on('mouseover', function(){
			drop.open()
		})
		numOfLikes.on('mouseout', function(){
			drop.close()
		})
	}

	this.displayAllLikers = function(){
		var that = this
		this.api.User.load(this.ticket.get(this.likesField).subject).then(function(users){
			if(users.length === 0 || users === undefined){
				drop.close()
				that.whoLiked.text = ''
			// } else if(users.length === 1){
			// 	that.whoLiked.text = users[0].displayName()
			// } else{
			// 	for(var i=0; i<users.length; i++){
			// 		that.whoLiked.text += users[i].displayName() + ', '
			// 	}
			} else{
				users.forEach(function(user, index){
					if(index === 0){
						that.whoLiked.text = user.displayName()
					} else{
						that.whoLiked.text = ', ' + user.displayName()
					}
				})
			}

		}).done()
	}

	this.getStyle = function(){
		return Style({
			Image: {
				cursor: 'pointer'
			},
			Block: {
				border: '1px solid #ccc',
				Text: {
					display: 'block',
					marginBottom: 3
				}
			}
		})
	}
}))