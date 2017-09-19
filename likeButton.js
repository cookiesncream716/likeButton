var dropDown = require ('./dropDown')

registerPlugin(proto(Gem, function(){
	this.name = 'LikeButton'

	this.build = function(ticket, optionsObservee, api){
		var text = Text(ticket.subject.title)
		var likeButton = Image('star.png')
		var numOfLikes = Text()
		var whoLiked = Text('')
		var like = Block(text, likeButton, drop = dropDown(numOfLikes, whoLiked))
		this.add(like)

		var likesField = optionsObservee.subject.likesField
		var likers = []
	
		if(ticket.get(likesField).subject === undefined){
			numOfLikes.text = 0
			ticket.set(likesField, likers)
		} else{
			// needs tested - how do I put ids in to test and get names
			numOfLikes.text = ticket.get(likesField).subject.length
			for(var i=0; i< ticket.get(likesField).subject.length; i++){
				likers.push(ticket.get(likesField).subject[i])
			}
			getLikersName()
		}

		likeButton.on('click', function(){
			api.User.current().then(function(curUser){ 
				var curUserIndex = ticket.get(likesField).subject.indexOf(curUser.subject._id)
				// console.log('index ' + curUserIndex)
				if(curUserIndex === -1){
					// console.log('adding to list')
					 // user isn't in list
					 likers.push(curUser.subject._id)
					 ticket.set(likesField, likers)
					 // console.log(ticket.get(likesField).subject)
					 // likers.push(curUser.subject._id)
					 likeButton.src = 'star1.png'
				} else{
					// console.log('taking off list')
					// user is in list 
					likers.splice(curUserIndex, 1)
					ticket.set(likesField, likers)

					console.log('splice')
					console.log(likers)
					likeButton.src = 'star.png'
				}
			}).done()
		})

		ticket.get(likesField).on('change', function(){
			// console.log('change')
			getLikersName()
			numOfLikes.text = ticket.get(likesField).subject.length
			// console.log(numOfLikes.text)
			// console.log(whoLiked.text)
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

		var getLikersName = function(){
			api.User.load(likers).then(function(users){
				// console.log('users =')
				// console.log(users)
				if(likers.length === 0){
					// console.log('no likes')
					drop.close()
					whoLiked.text = ''
				} else if(users.length === 1){
					// console.log('1 like')
					whoLiked.text= users[0].displayName()
				} else{
					// console.log('more than 1 like')
					for(var i=0; i<users.length; i++){
						whoLiked.text += users[i].displayName() + ', '
					}
				}
			}).done()
		}

		// getLikersName()
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