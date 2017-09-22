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
		var text = Text(ticket.subject.title)
		var likeButton = Image(require('url-loader!./star.png'))
		var numOfLikes = Text()
		this.whoLiked = Text('')
		var like = Block(text, likeButton, drop = dropDown(numOfLikes, this.whoLiked))
		this.add(like)

		var likesField = optionsObservee.subject.likesField
		this.likers = []

		if(ticket.get(likesField).subject === undefined){
			console.log('1 - likesField was undefined')
			numOfLikes.text = 0
			ticket.set(likesField, this.likers)
			console.log('1.1 - likesField = ' + ticket.get(likesField).subject)
		} else{
			console.log('1.3 - likesField already defined = ')
			console.log(ticket.get(likesField))
			// needs tested - how do I put ids in to test and get names
			numOfLikes.text = ticket.get(likesField).subject.length
			console.log('1.3.1  - numOfLikes=')
			// BUG
			// why is this an object and not text????? 
			console.log(numOfLikes)
			for(var i=0; i< ticket.get(likesField).subject.length; i++){
				this.likers.push(ticket.get(likesField).subject[i])
			}
			console.log('1.5 - this.likers = ')
			console.log(this.likers)
			if(numOfLikes.text > 0){
				this.getLikersName()
			}
			// get current user and see if already in likers
			api.User.current().then(function(user){
				that.currentUser = user.subject._id
				console.log('1.8 - get currentUser = ' + that.currentUser)
			}).done()
			for(var i=0; i<this.likers.length; i++){
				if(that.currentUser === this.likers[i]){
					console.log('1.9 - currentUser had already liked')
					likeButton.src = require('url-loader!./star1.png')
				}
			}
		}

		likeButton.on('click', function(){
			console.log('2 - clicked')
			api.User.current().then(function(curUser){ 
				var curUserIndex = ticket.get(likesField).subject.indexOf(curUser.subject._id)
				if(curUserIndex === -1){
					 // user isn't in list so add
					 that.likers.push(curUser.subject._id)
					 ticket.set(likesField, this.likers)
					 likeButton.src = require('url-loader!./star1.png')
					 console.log('2.2 - add user to list')
					 console.log(ticket.get(likesField))
				} else{
					// user is in list so remove
					that.likers.splice(curUserIndex, 1)
					ticket.set(likesField, this.likers)
					likeButton.src = require('url-loader!./star.png')
					console.log('2.4 - remove user from list')
					console.log(ticket.get(likesField))
				}
			}).done()
		})

		ticket.get(likesField).on('change', function(){
			console.log('3 - on change')
			// BUG
			// why is ticket.get(likesField).subject undefined???????
			console.log(ticket.get(likesField).subject)
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
		// drop.style = Style({
		// 	$menu: {
		// 		border: '1px solid blue'
		// 	}
		// })
	}

	this.getLikersName = function(){
		var that = this
		this.api.User.load(this.likers).then(function(users){
			console.log('1.7 or 3.5 - users = ')
			console.log(users)
			console.log(users.length)
			if(users.length === 0 || users === undefined){
				drop.close()
				that.whoLiked.text = ''
			} else{
				for(var i=0; i<users.length; i++){
					console.log(users[i].displayName())
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