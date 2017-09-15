var dropDown = require ('./dropDown.js')
console.log(dropDown)

registerPlugin(proto(Gem, function(){
	this.name = 'LikeButton'

	this.build = function(ticket, optionsObservee, api){
		var text = Text(ticket.subject.title)
		var likeButton = Image('star.png')
		var numOfLikes = Text()
		var whoLiked = Text()
		var like = Block(text, likeButton, drop = dropDown.dropDown(numOfLikes, whoLiked))
		// var like = Block(text, likeButton, drop = dropdown.drop(numOfLikes, whoLiked))
		this.add(like)

		ticket.set('likes', [])

		var likers = ticket.get('likes')
		numOfLikes.text = likers.subject.length

		likeButton.on('click', function(){
			api.User.current().then(function(currentUser){
				var curUserIndex = likers.subject.indexOf(currentUser.subject._id)
				if(curUserIndex === -1){
					 // user isn't in list
					 likers.push(currentUser.subject._id)
					 likeButton.src = 'star1.png'
				} else{
					// user is in list
					likers.splice(curUserIndex, 1)
					likeButton.src = 'star.png'
				}
			}).done()
		})

		likers.on('change', function(change){
			getLikersName()
			numOfLikes.text = likers.subject.length
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
			api.User.load(likers.subject).then(function(users){
				whoLiked.text = ''
				for(var i=0; i<likers.subject.lenth; i++){
					if(likers.subject.lenth == 1){
						whoLiked.text = users[0].displayName()
					} else if(likers.subject.length == 1){
						drop.close()
					} else{
						whoLiked.text += users[i].displayName() + ', '
					}
				}
			}).done()
		}

		getLikersName()
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