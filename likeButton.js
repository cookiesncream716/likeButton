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
		var text = Text(ticket.subject.title)
		var likeButton = Image(require('url-loader!./star.png'))
		var numOfLikes = Text()
		var whoLiked = Text('')
		var like = Block(text, likeButton, drop = dropDown(numOfLikes, whoLiked))
		this.add(like)

		var likesField = optionsObservee.subject.likesField
		var likers = []

		// getLikersName()
		var getLikersName = function(){
			api.User.load(likers).then(function(users){
				if(likers.length === 0){
					drop.close()
					whoLiked.text = ''
				} else{
					for(var i=0; i<users.length; i++){
						whoLiked.text += users[i].displayName() + ', '
					}
				}
			}).done()
		}

		if(ticket.get(likesField).subject === undefined){
			numOfLikes.text = 0
			ticket.set('likes', likers)
		} else{
			// needs tested - how do I put ids in to test and get names
			numOfLikes.text = ticket.get(likesField).subject.length
			for(var i=0; i< ticket.get(likesField).subject.length; i++){
				likers.push(ticket.get(likesField).subject[i])
			}
			getLikersName()
		}

		// get current user and see if he is already in likers
		api.User.current().then(function(user){
			that.currentUser = user.subject._id
		}).done()
		for(var i=0; i<likers.length; i++){
			if(that.currentUser === likers[i]){
				likeButton.src = require('url-loader!./star1.png')
			}
		}

		likeButton.on('click', function(){
			api.User.current().then(function(curUser){ 
				var curUserIndex = ticket.get(likesField).subject.indexOf(curUser.subject._id)
				if(curUserIndex === -1){
					 // user isn't in list so add
					 likers.push(curUser.subject._id)
					 ticket.set('likes', likers)
					 likeButton.src = require('url-loader!./star1.png')
				} else{
					// user is in list so remove
					likers.splice(curUserIndex, 1)
					ticket.set('likes', likers)
					likeButton.src = require('url-loader!./star.png')
				}
			}).done()
		})

		ticket.get(likesField).on('change', function(){
			getLikersName()
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