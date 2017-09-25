var dropDown = require ('./dropDown')

registerPlugin(proto(Gem, function(){
	this.name = 'LikeButton'

	this.initialize = function(options){
		return{
			likesField: 'likes'
		}
	}

	this.build = function(ticket, optionsObservee, api){
		var that = this
		this.api = api
		var likeButton = Image(require('url-loader!./star.png'))
		var numOfLikes = Text()
		this.whoLiked = Text('')
		var like = Block(likeButton, drop = dropDown(numOfLikes, this.whoLiked))
		this.add(like)

		var likesField = optionsObservee.subject.likesField

		if(ticket.get(likesField).subject === undefined){
			console.log('1 - likesField was undefined')
			numOfLikes.text = 0
			ticket.set(likesField, [])
			this.likers = ticket.get(likesField).subject
		} else{
			this.likers = ticket.get(likesField).subject
			console.log('1.3 - likesField already defined')
			numOfLikes.text = this.likers.length

			// get current user and see if already in likers
			api.User.current().then(function(user){
				that.currentUser = user.subject._id
			}).done()
			for(var i=0; i<this.likers.length; i++){
				if(that.currentUser === this.likers[i]){
					console.log('1.9 - currentUser already liked')
					likeButton.src = require('url-loader!./star1.png')
				}
			}

			// get list of names
			if(ticket.get(likesField).subject.length > 0){
				this.getLikersName()
			}
		}

		likeButton.on('click', function(){
			console.log('2 - clicked')
			api.User.current().then(function(curUser){
				var curUserIndex = ticket.get(likesField).subject.indexOf(curUser.subject._id)
				if(curUserIndex === -1){
					 // user isn't in list so add
					 that.likers.push(curUser.subject._id)
					 ticket.set(likesField, that.likers)
					 likeButton.src = require('url-loader!./star1.png')
					 console.log('2.2 - add user to list')
				} else{
					// user is in list so remove
					that.likers.splice(curUserIndex, 1)
					ticket.set(likesField, that.likers)
					likeButton.src = require('url-loader!./star.png')
					console.log('2.4 - remove user from list')
					numOfLikes.text = that.likers.length
					// not sure if needed if more than 1 liker
					that.getLikersName()
				}
			}).done()
		})

		ticket.get(likesField).on('change', function(){
			console.log('3 - on change')
			that.getLikersName()
			numOfLikes.text = ticket.get(likesField).subject.length
		})

		// view likers
		numOfLikes.on('mouseover', function(){
			drop.open()
		})
		numOfLikes.on('mouseout', function(){
			drop.close()
		})
	}

	this.getLikersName = function(){
		var that = this
		this.api.User.load(this.likers).then(function(users){
			console.log('1.7 or 3.5 - users = ')
			if(users.length === 0 || users === undefined){
				drop.close()
				that.whoLiked.text = ''
			} else if(users.length === 1){
				that.whoLiked.text = users[0].displayName()
			} else{
				for(var i=0; i<users.length; i++){
					that.whoLiked.text += users[i].displayName() + ', '
				}
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